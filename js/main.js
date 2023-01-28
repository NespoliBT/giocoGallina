import { getCookie, setCookie } from "./helpers/cookie.js";
import { getLines, drawText } from "./helpers/text.js";
import Chicken from "./classes/chicken.js";
import Egg from "./classes/egg.js";
import { getSentence, lore } from "./helpers/lore.js";
import fixedSentences from "./fixedSentences.js";

document.addEventListener('DOMContentLoaded', function () {
    const canvas = document.getElementById("myCanvas");
    const ctx = canvas.getContext("2d")
    const rightControl = document.getElementById("right");
    const leftControl = document.getElementById("left");

    let points = getCookie("points") || 0;
    let loreActive = false;
    let loreSteps = Object.keys(fixedSentences);

    let graphicLore = false;

    const chicken = new Chicken(ctx, 0, 250, 1);
    const egg = new Egg(ctx, 400, 275);

    let selectedSentence = getSentence();
    let selectedLore = null;
    let loreIndex = 0;

    const background = new Image();
    background.src = "assets/sfondo.jpeg";

    const bubble = new Image();
    bubble.src = "assets/bubble.png";

    function drawBackground() {
        ctx.drawImage(background, 0, 0, 480, 320);
        ctx.fillStyle = "#456a2a";
        ctx.fillRect(0, 480, 480, 700);
    }

    function drawBubble() {
        ctx.drawImage(bubble, 0, 320, 480, 214);
    }

    function draw() {
        if (graphicLore) {
            graphicLore = lore(ctx, 1);
        }
        else {
            drawBackground();
            chicken.draw();
            egg.draw();

            drawBubble();
            drawText(ctx, selectedSentence, 50, 415, 400, 24, loreActive ? "blue" : "black");
            drawText(ctx, `Uova: ${points}`, 16, 38, 700, 32);

            if (chicken.x + 50 > egg.x &&
                chicken.x < egg.x + 25 &&
                chicken.y + 50 > egg.y &&
                chicken.y < egg.y + 25
            ) {
                points++;
                setCookie('points', points);
                egg.x = Math.random() * 400;

                if (loreSteps.includes(points.toString())) {
                    loreActive = true;
                    selectedLore = fixedSentences[points];
                    selectedSentence = selectedLore[0];

                    document.body.style.filter = `hue-rotate(${points * 10}deg)`;
                }

                if (points === 100) {
                    graphicLore = true;
                }
            }
        }
    }

    let movingInterval = null;

    rightControl.addEventListener('touchstart', function (e) {
        clearInterval(movingInterval);
        movingInterval = setInterval(() => {
            chicken.move(10);
        }, 50);
    })

    rightControl.addEventListener('touchend', function (e) {
        clearInterval(movingInterval);
    })

    rightControl.addEventListener('touchmove', function (e) {
        clearInterval(movingInterval);
    })

    leftControl.addEventListener('touchstart', function (e) {
        clearInterval(movingInterval);
        movingInterval = setInterval(() => {
            chicken.move(-10);
        }, 50);
    })

    leftControl.addEventListener('touchend', function (e) {
        clearInterval(movingInterval);
    })

    leftControl.addEventListener('touchmove', function (e) {
        clearInterval(movingInterval);
    })

    document.onkeydown = (e) => {
        if (e.key === "ArrowRight") {
            chicken.move(10);
        } else if (e.key === "ArrowLeft") {
            chicken.move(-10);
        }
    }

    setTimeout(() => {
        setInterval(draw, 10);
    }, 1000);

    setInterval(() => {
        if (!loreActive)
            selectedSentence = getSentence();
        else {
            if (loreIndex < selectedLore.length - 1) {
                loreIndex++;
                selectedSentence = selectedLore[loreIndex];
            } else {
                document.body.style.filter = `hue-rotate(0deg)`;
                loreActive = false;
                loreIndex = 0;
                selectedSentence = getSentence();
            }
        }
    }, 5000);
});
