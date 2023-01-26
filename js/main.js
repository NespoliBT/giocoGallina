
const frasi = [
    "Ricordati di idratare la tua gallina",
    "La vita ci rende come noci, duri fuori e strani dentro",
    "La statistica spesso afferma",
    "La vita è un pendolo che oscilla tra noia e dolore"
];

document.addEventListener('DOMContentLoaded', function () {
    const canvas = document.getElementById("myCanvas");
    const ctx = canvas.getContext("2d")

    let points = 0;
    let chickenX = 50;
    let chickenY = 250;
    let chickenDirection = 1;

    let uovoX = 400;
    let uovoY = 275;

    let frase = frasi[Math.floor(Math.random() * frasi.length)];

    const gallina = new Image();
    gallina.src = "assets/gallina.png";

    const gallinaFlip = new Image();
    gallinaFlip.src = "assets/gallina-flip.png";

    const sfondo = new Image();
    sfondo.src = "assets/sfondo.jpeg";

    const uovo = new Image();
    uovo.src = "assets/uovo.png";

    const bubble = new Image();
    bubble.src = "assets/bubble.png";

    function getLines(ctx, text, maxWidth) {
        var words = text.split(" ");
        var lines = [];
        var currentLine = words[0];

        for (var i = 1; i < words.length; i++) {
            var word = words[i];
            var width = ctx.measureText(currentLine + " " + word).width;
            if (width < maxWidth) {
                currentLine += " " + word;
            } else {
                lines.push(currentLine);
                currentLine = word;
            }
        }
        lines.push(currentLine);
        return lines;
    }

    function getCursorPosition(canvas, event) {
        const rect = canvas.getBoundingClientRect()
        const x = event.clientX - rect.left
        const y = event.clientY - rect.top
        return { x, y }
    }

    function drawBackground() {
        ctx.drawImage(sfondo, 0, 0, 480, 320);
    }

    function drawGallina() {
        if (chickenDirection === 1) {
            ctx.drawImage(gallina, chickenX, chickenY, 50, 50);
        } else {
            ctx.drawImage(gallinaFlip, chickenX, chickenY, 50, 50);
        }
    }

    function drawUovo() {
        ctx.drawImage(uovo, uovoX, uovoY, 25, 25);
    }

    function drawPunteggio() {
        ctx.font = "32px NerdFont";
        ctx.fillStyle = "#000000";
        ctx.fillText(`Punteggio: ${points}`, 16, 38);
    }

    function drawControls() {
        ctx.font = "48px NerdFont";
        ctx.fillStyle = "#000000";
        ctx.fillText("", 375, 650);
        ctx.fillText("", 75, 650);

        // draw circles around controls
        ctx.beginPath();
        ctx.arc(393, 630, 50, 0, 2 * Math.PI);
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(93, 630, 50, 0, 2 * Math.PI);
        ctx.stroke();

    }

    function drawBubble() {
        ctx.drawImage(bubble, 0, 320, 480, 214);
    }

    function drawText() {
        // draw text inside bubble
        ctx.font = "24px NerdFont";
        ctx.fillStyle = "#000000";
        const lines = getLines(ctx, frase, 400);
        lines.forEach((line, index) => {
            ctx.fillText(line, 50, 415 + (index * 30));
        });
    }

    function moveChicken(val) {

        chickenX += val;
        if (val > 0) {
            chickenDirection = 1;
        } else {
            chickenDirection = -1;
        }
    }

    function draw() {
        drawBackground();
        drawGallina();
        drawUovo();
        drawPunteggio();

        drawControls();
        drawBubble();
        drawText();

        if (chickenX > 450) {
            chickenX = 450;
        }
        if (chickenX < 0) {
            chickenX = 0;
        }

        if (chickenX + 50 > uovoX && chickenX < uovoX + 25 && chickenY + 50 > uovoY && chickenY < uovoY + 25) {
            points++;
            uovoX = Math.random() * 400;
        }
    }

    let movingInterval = null;

    canvas.addEventListener('touchstart', function (e) {
        const { x, y } = getCursorPosition(canvas, e)
        if (x > 375 && x < 475 && y > 500 && y < 700) {
            movingInterval = setInterval(() => {
                moveChicken(10);
            }, 50);
        }
        if (x > 75 && x < 175 && y > 500 && y < 700) {
            movingInterval = setInterval(() => {
                moveChicken(-10);
            }, 50);
        }
    })

    canvas.addEventListener('touchend', function (e) {
        clearInterval(movingInterval);
    })

    setInterval(draw, 10);
    setInterval(() => {
        const previousFrase = frase;
        while (previousFrase === frase) {
            frase = frasi[Math.floor(Math.random() * frasi.length)];
        }
    }, 5000);
});