
class Chicken {
    constructor(ctx, x, y, direction) {
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.direction = direction;
        this.isFree = false;

        const img = new Image();
        img.src = "assets/gallina.png";

        const imgFlip = new Image();
        imgFlip.src = "assets/gallina-flip.png";

        this.img = img;
        this.imgFlip = imgFlip;

        //check boundaries
        setInterval(() => {
        }, 10);
    }

    draw() {
        let x = this.x;
        let y = this.y;
        let direction = this.direction;
        let img = this.img;
        let imgFlip = this.imgFlip;
        let ctx = this.ctx;

        if (direction === 1) {
            ctx.drawImage(img, x, y, 50, 50);
        } else {
            ctx.drawImage(imgFlip, x, y, 50, 50);
        }

        if (this.isFree) return;
        if (this.x > 430) {
            this.x = 430;
        } else if (this.x < 0) {
            this.x = 0;
        }
    }

    move(val) {
        this.x += val;
        if (val > 0) {
            this.direction = 1;
        } else {
            this.direction = -1;
        }
    }

    setFree() {
        this.isFree = true;
    }
}

export default Chicken;