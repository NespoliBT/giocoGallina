
const sentences = [
    "Ricordati di idratare la tua gallina.",
    "La vita ci rende come noci, duri fuori e strani dentro.",
    "La statistica spesso afferma.",
    "La vita è un pendolo che oscilla tra noia e dolore.",
    "20 centesimi non erano abbastanza?",
    "A volte la vita è come un uovo.",
    "La vita è come un uovo.",
    "La vita è troppo breve per essere piccoli.",
    "Nella gallina piccola c'è l'uovo d'oro.",
    "Olindo e Rosa innocenti: liberi subito.",
    "Non tutti sanno che la gallina è venuta prima dell'uovo.",
    "Rispetta la galline.",
    "Ricorda, se guardi la gallina perdi.",
    "La gallina cova con amore, noi dovremmo fare lo stesso.",
    "La vita è bella, cit.",
    "Molti giovani sono come fiumi in perenne piena, sono sempre fuoricorso.",
    "Tutte le galline sono uguali, alcune piu uguali delle altre.",
    "A volte mi perdo pensando tra un uovo e l'altro.",
    "Uovo d'oro, pomodoro, sono solo, yoko ono.",
    "Non dire gallina finchè non ce l'hai nel sacco.",
    "Si sta come a gennaio in sessione gli studenti e le galline.",
    "Si sta come di giorno in pollaio le galline.",
    "Coccodè!",
    "L'ambientalismo senza lotta di classe è solo giardinaggio.",
    "Era meglio la monarchia che bastava ammazzarne uno.",
    "Tanto va la gallina al lardo che ci lascia lo zio pino.",
    "Belin che bell'uovo.",
    "Abbassa quella voce da gallina.",
    "Ti chiudo nel pollaio.",
    "Il gioco.",
    "Meglio una gallina oggi che pisano alla porta tra un ora.",
    "Perché i vecchi usano i puntini di sospensione...?",
    "Meglio un the al limone che un limone con te.",
    "Meglio un the al limone che un the con te.",
    "Un maiale cade dal balcone: - Speck",
    "Io vado a fumarmi una canna, comunque.",
    "Luca Motto figlio del risotto.",
    "Le bombe nelle bombe le mettono le bombe, le pagano le bombe, bombe.",
    "Anche i pulcini con gli accendini vanno a bruciare Cantù.",
    "(x^2 + (9/4)*(y^2) + z^2 -1)^3 - (x^2)*(z^3) -(9/200)*(y^2)*(z^3)",
    "Se telefonando io potessi dirti coccodè.",
    "Baby ritorna da me e metti via quel motorola.",
    "Baby ritorna da me e metti via la tagliola.",
    "La via è un biscotto, ma se piove si scioglie.",
    "Se questo è un uovo",
    "La sera coccodè, la mattina chicchirichi.",
    "La vita è una scatola di cioccolatini, se piove si scioglie.",
    "Mi sento alla playa.",
    "Ma è bodyshaming se è l'ultimo tarallo?",
    "Cosa desidera il tuo cuore?",
    "sudo dd if=/dev/urandom of=/dev/sda",
    "Che vantaggio può trarre una gallina dalla guerra dei britannici.",
    "La gallina è l'immagine dei suoi pensieri.",
    "Non c'è amore senza sesso prematrimoniale.",
    "Lotta anale contro il capitale.",
    "Metti a prova la tua gallina prima di averne bisogno.",
    "Se la matematica non è un'opinione, 8.",
    "Noi, galline.",
    "Ho visto cose che voi galline non potete nemmeno immaginare.",
    "Galline di tutto il mondo, unitevi.",
    "Leeeeeroy jenkins!",
    "Il partito è un circolo di galline.",
    "Renderò il parlamento un bivacco di galline.",
    "La morte risolve tutti i problemi, niente galline niente problemi.",
    "Una gallina è una tragedia, un pollaio è statistica.",
    "Dove sono i 49 milioni?",
    "Alle volte le persone inciampano nella verità, allora *$?!#",
    "Il mattino ha l'uovo in bocca",
    "La vita è uno stato mentale.",
    "Never gonna give you up, never gonna let you down.",
    "Secondo le leggi della fisica, un'ape non potrebbe volare.",
    "Fuori dal mio pollaio.",
    "Rimandiamo indietro i marò",
    "Un bambino cade, si sbuccia il ginocchio e se lo mangia.",
    "Scemo chi legge.",
    "Silvio.",
    "Chiccirichi di fantasia.",
    "Ieri ho confuso il tofu con il tufo, non ho più i denti.",
    "Piuttosto che niente è meglio piuttosto.",
    "Nono comandamento: Non desiderare la gallina altrui.",
    "Ciapa la galena, coccodè.",
    "Sono tutt'uno con la FIOM, la FIOM è con me.",
    "80 voglia di FIOM",
    "È finita ho l'highground.",
    "Gallina, fai colazione che ceneremo all'inferno.",
    "Manda frasi a @Nespoli su telegram.",
    "la tua famiglia ti sta aspettando, sono 10 anni che sei in coma.",
    "Il coltello fa il taglio, non il sottoscritto.",
    "I do not wish to be horny anymore.",
    "Don't be sorry be better.",
    "Cosa abbiamo da perdere se non le nostre galline.",
    "Dov'eri il 15 aprile 1989?",
    "Tailung meritava di meglio.",
    "Chi sporca la lavagna muore ma chi si ribella vive per sempre.",
    "Femminismo liberale servo del capitale",
    "Belloli grande statista.",
    "Sorelle Belloli.",
    "Meno Salvini più galline.",
];

const fixedSentences = {
    10: [
        "Un uovo per domarli",
        "Un uovo per trovarli",
        "Un uovo per sedurli",
        "Un uovo per ghermirli e nel pollaio incatenarli"
    ]
}

const setCookie = (name, value, days = 7, path = '/') => {
    const expires = new Date(Date.now() + days * 864e5).toUTCString()
    document.cookie = name + '=' + encodeURIComponent(value) + '; expires=' + expires + '; path=' + path
}

const getCookie = (name) => {
    return document.cookie.split('; ').reduce((r, v) => {
        const parts = v.split('=')
        return parts[0] === name ? decodeURIComponent(parts[1]) : r
    }, '')
}

document.addEventListener('DOMContentLoaded', function () {
    const canvas = document.getElementById("myCanvas");
    const ctx = canvas.getContext("2d")
    const rightControl = document.getElementById("right");
    const leftControl = document.getElementById("left");

    let points = getCookie("points") || 0;

    let chickenX = 50;
    let chickenY = 250;
    let chickenDirection = 1;

    let uovoX = 400;
    let uovoY = 275;

    let selectedSentence = sentences[Math.floor(Math.random() * sentences.length)];

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

    function drawBubble() {
        ctx.drawImage(bubble, 0, 320, 480, 214);
    }

    function drawText() {
        ctx.font = "24px NerdFont";
        ctx.fillStyle = "#000000";
        const lines = getLines(ctx, selectedSentence, 400);
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
            setCookie('points', points);
            uovoX = Math.random() * 400;
        }

    }

    let movingInterval = null;

    rightControl.addEventListener('touchstart', function (e) {
        clearInterval(movingInterval);
        movingInterval = setInterval(() => {
            moveChicken(10);
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
            moveChicken(-10);
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
            moveChicken(10);
        } else if (e.key === "ArrowLeft") {
            moveChicken(-10);
        }
    }


    setTimeout(() => {
        setInterval(draw, 10);
    }, 1000);

    setInterval(() => {
        const previousSentence = selectedSentence;
        while (previousSentence === selectedSentence) {
            selectedSentence = sentences[Math.floor(Math.random() * sentences.length)];
        }
    }, 5000);
});
