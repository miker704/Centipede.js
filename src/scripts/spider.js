import MovingObject from "./movingObject.js";
import Util from "./utils";


class Spider extends MovingObject {
    constructor (options) {
    
        super({
            pos: options.pos,
            radius: 24*0.875,
            vel: [0, 0],
            color: Util.randomColors(),
            game: options.game
        });
    }


    // drawing these things is taking so mush time
    drawSpider (ctx) {
        // Draw the background
        // Draw the spider
        ctx.fillStyle =  this.color;
        ctx.beginPath();
        ctx.arc(this.pos[0],this.pos[1] - 8, 8, 0, 2 * Math.PI);
        ctx.arc(this.pos[0],this.pos[1] + 8, 8, 0, 2 * Math.PI);
        ctx.fill();
        ctx.beginPath();
        // Left Legs
        ctx.fillStyle =  this.color;
        ctx.moveTo(this.pos[0], this.pos[1]);
        ctx.lineTo(this.pos[0] - 30, this.pos[1] - 30);
        ctx.lineTo(this.pos[0] - 30, this.pos[1] - 35);
        ctx.moveTo(this.pos[0], this.pos[1]);
        ctx.lineTo(this.pos[0] - 30, this.pos[1] - 10);
        ctx.lineTo(this.pos[0] - 40, this.pos[1] - 10);
        ctx.moveTo(this.pos[0], this.pos[1]);
        ctx.lineTo(this.pos[0] - 30, this.pos[1] + 10);
        ctx.lineTo(this.pos[0] - 40, this.pos[1] + 10);
        ctx.moveTo(this.pos[0], this.pos[1]);
        ctx.lineTo(this.pos[0] - 30, this.pos[1] + 30);
        ctx.lineTo(this.pos[0] - 30, this.pos[1] + 35);
        // Right legs
        ctx.moveTo(this.pos[0], this.pos[1]);
        ctx.lineTo(this.pos[0] + 30, this.pos[1] - 30);
        ctx.lineTo(this.pos[0] + 30, this.pos[1] - 35);
        ctx.moveTo(this.pos[0], this.pos[1]);
        ctx.lineTo(this.pos[0] + 30, this.pos[1] - 10);
        ctx.lineTo(this.pos[0] + 40, this.pos[1] - 10);
        ctx.moveTo(this.pos[0], this.pos[1]);
        ctx.lineTo(this.pos[0] + 30, this.pos[1] + 10);
        ctx.lineTo(this.pos[0] + 40, this.pos[1] + 10);
        ctx.moveTo(this.pos[0], this.pos[1]);
        ctx.lineTo(this.pos[0] + 30, this.pos[1] + 30);
        ctx.lineTo(this.pos[0] + 30, this.pos[1] + 35);
        ctx.fill();
        ctx.stroke();
    }

    spiderMovement () {

    }

}




export default Spider;