import MovingObject from "./movingObject.js";
import Util from "./utils";


class Spider extends MovingObject {
    constructor(options) {

        super({
            pos: options.pos,
            radius: 21,
            vel: [0, 0],
            color: Util.randomColors(),
            game: options.game
        });
        // console.log(this.radius)

        this.direction = options.direction;
        this.maxVelocity = options.maxVelocity;



    }


    // drawing these things is taking so mush time
    draw(ctx) {
        // Draw the background
        // Draw the spider
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.pos[0], this.pos[1] - 8, 8, 0, 2 * Math.PI);
        ctx.arc(this.pos[0], this.pos[1] + 8, 8, 0, 2 * Math.PI);
        ctx.fill();
        ctx.beginPath();
        // Left Legs
        ctx.fillStyle = this.color;
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

    move() {
        this.pos[0] += this.vel[0];
        this.pos[1] += this.vel[1];
        this.rotation();
        this.increaseVelocity();
    }

    hitByZapper() {
        // console.log("removed spider");
        this.game.removeEntity(this);
        this.game.incrementScore(600);

    }

    findPlayer() {
        let x = this.pos[0] - this.game.zapper.pos[0];
        let y = this.pos[1] - this.game.zapper.pos[1];
        if (x === 0 || Math.abs(y / x) > 10) {
            this.direction = y < 0 ? Math.PI / 2 : -Math.PI / 2;
            return this.direction;
        }
        let angleofTrajectory = Math.atan(y / x);
        if (x > 0) { angleofTrajectory -= Math.PI; }
        return angleofTrajectory;
    }


    increaseVelocity(){
        let velocityofX = this.maxVelocity * Math.cos(this.direction);
        let velocityofY = this.maxVelocity *   Math.sin(this.direction);
        this.vel = [velocityofX,velocityofY];
    }

    rotation(){
        let rotationAmount = Math.min(Math.abs(this.findPlayer()-this.direction),Math.PI/8);
        this.direction+= this.findPlayer()> this.direction ? rotationAmount : (rotationAmount*-1);
    }


}

Spider.RADIUS = (24 * 0.875);


export default Spider;