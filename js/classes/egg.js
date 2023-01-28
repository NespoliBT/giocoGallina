
class Chicken {
    constructor(ctx, x, y) {
        this.ctx = ctx;
        this.x = x;
        this.y = y;

        const img = new Image();
        img.src = "assets/uovo.png";

        this.img = img;
    }

    draw() {
        let x = this.x;
        let y = this.y;
        let img = this.img;
        let ctx = this.ctx;

        ctx.drawImage(img, x, y, 25, 25);
    }
}

export default Chicken;