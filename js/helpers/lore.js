import { sentences } from '../sentences.js';
import { drawText } from './text.js';

let loreStarted = false;
let loreIndex = 0;
let characterIndex = 0;
let loreInterval = null;

const loreDictionary = {
    1: {
        img: "assets/lore/1.jpg",
        texts: [
            ["Ciao.", "Come stai?"],
            ["* uovo *"],
            ["Perché non mi rispondi?"],
            ["* uovo *"],
            ["Sto passando le mie giornate a inseguirti.", "A che scopo?"],
            ["* uovo *"],
            ["Voglio trovare un senso alla mia esistenza.", "Non so cosa fare.", "Non so cosa voglio."],
            ["* uovo *"],
            [
                "Mi sento sola.",
                "Mi sento vuota.",
                "Mi sento come se non avessi un posto nel mondo.",
            ],
            ["* uovo *"],
            [
                "Forse la felicità si trova nel cambiamento.",
                "Eppure non so come cambiare.",
                "Non so come cambiare la mia vita."
            ],
        ]
    },
};

function getSentence(prevSentence) {
    let sentence = sentences[Math.floor(Math.random() * sentences.length)];

    if (sentence === prevSentence) {
        return getSentence(prevSentence);
    }

    return sentences[Math.floor(Math.random() * sentences.length)];
}

function lore(ctx, step) {
    const { img, texts } = loreDictionary[step];

    const controls = document.querySelector(".controls");
    document.body.style.backgroundColor = "white";
    controls.style.display = "none";

    let currentText = texts[characterIndex][loreIndex];

    const background = new Image();
    background.src = img;

    const bubble = new Image();
    bubble.src = "assets/bubble.png";

    const bubbleFlip = new Image();
    bubbleFlip.src = "assets/bubble-flip.png";

    ctx.drawImage(background, 0, 0, 480, 480);
    ctx.fillStyle = "white";
    ctx.fillRect(0, 480, 480, 320);

    ctx.drawImage(
        characterIndex % 2 === 0 ? bubble : bubbleFlip,
        0,
        480,
        480,
        214
    );

    drawText(ctx, currentText, 50, 575, 400, 24);

    if (!loreStarted) {
        loreStarted = true;
        loreInterval = setInterval(() => {
            if (loreIndex < texts[characterIndex].length - 1) {
                loreIndex++;
            }
            else {
                loreIndex = 0;
                characterIndex++;
            }

        }, 2000);
    }

    if (characterIndex === texts.length - 1 && loreIndex === texts[characterIndex].length - 1) {
        loreStarted = false;
        clearInterval(loreInterval);
        loreIndex = 0;
        characterIndex = 0;
        controls.style.display = "flex";
        document.body.style.backgroundColor = "black";
        ctx.reset();
        return false;
    }

    return true;
}

export { getSentence, lore };