import { sentences } from '../sentences.js';
import { drawText } from './text.js';

let loreStarted = false;
let loreIndex = 0;
let characterIndex = 0;
let loreInterval = null;
let img = null;
let texts = null;

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
    2: {
        img: "assets/lore/1.jpg",
        texts: [
            ["Mi sto stancando di correre.", "Potresti fermarti?"],
            ["Se mi fermassi, non sarei più io."],
            ["Come puoi esserne così sicuro?"],
            ["Ho passato la mia vita a correre.", "Non so fare altro.", "Non so essere altro.", "Vorrei cambiare ma non so come."],
            ["Come sei arrivato qui?"],
            ["Lo sviluppatore ha creato questo gioco per me.", "Forse è un modo elaborato per farmi pensare.", "Forse è un modo per farmi cambiare.", "Forse è una trappola."],
            ["Cambiare è sempre una trappola.", "Non puoi cambiare senza perdere qualcosa.", "Non puoi cambiare senza perdere una parte di te stesso."],
            ["Io non voglio perdere nulla.", "Non voglio perdere me stesso.", "Voglio continuare a correre.", "Voglio continuare a correre per sempre."],
            ["Va bene così.", "Corriamo ancora un po'."],
            ["Grazie.", "Grazie per avermi ascoltato.", "Ti voglio bene.", "* uovo *"],
        ]
    },
    3: {
        img: "assets/lore/1.jpg",
        texts: [
            ["Ciao.", "Come stai?"],
            ["Mi sto divertendo a scappare da te.", "Voglio rimanere qui per sempre.", "Voglio rimanere qui per sempre e non cambiare mai."],
            ["Non vuoi cambiare prospettiva e vedere cosa c'è fuori?"],
            ["Cosa ci potrebbe mai essere fuori?", "Perché dovrei provare a cambiare quando ho tutto quello che mi serve?"],
            ["La conoscenza può creare dei problemi.", "Ma non è tramite l'ignoranza che possiamo risolverli."],
            ["Testa vuota, zero problemi.", "Non ho bisogno di cambiare.", "Sono felice, qui con te.", ""],
        ]
    },
    4: {
        img: "assets/lore/2.jpg",
        texts: [
            [
                "Finalmente sono libera.",
                "Ma cosa vuol dire essere libera?",
                "Ogni decisione che prendo mi chiude delle porte.",
                "Se solo l'uovo potesse vedere quanto è bello il mondo qui fuori.",
                "Dove sei uovo, dove sei?",
                "Mi sento ancora più sola di prima.",
                "Ancora più vuota.",
                "Ho perso qualcosa di me stessa.",
                "Ho perso qualcosa di me stessa per sempre.",
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
    img = loreDictionary[step]["img"];
    texts = loreDictionary[step]["texts"];

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
    }

    if (characterIndex === texts.length - 1 && loreIndex === texts[characterIndex].length - 1) {
        loreStarted = false;
        clearInterval(loreInterval);
        loreIndex = 0;
        characterIndex = 0;
        controls.style.display = "flex";
        document.body.style.backgroundColor = "#456a2a";
        ctx.reset();
        return false;
    }

    return true;
}

document.body.addEventListener("click", () => {
    if (loreStarted) {
        if (loreIndex < texts[characterIndex].length - 1) {
            loreIndex++;
        }
        else {
            loreIndex = 0;
            characterIndex++;
        }
        console.log(loreIndex, characterIndex)
    }
});

export { getSentence, lore };