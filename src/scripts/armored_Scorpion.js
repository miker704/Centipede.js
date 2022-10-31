import MovingObject from "./movingObject";
import Scorpion from "./scorpion";
import Util from "./utils.js";

class ArmoredScorpion extends MovingObject {
    constructor(options) {
        super(
            {
                pos: options.pos,
                // pos: [90,60],
                radius: 36,
                vel: [0, 0],
                color: Util.randomColors(),
                game: options.game
            }
        );

        //special properties for spawn of scorpion they are
        //2 versions the classic version that moves horizontally 
        // and another exclusive to this game that tracks the player 
        // and has armor

        this.armor = 4;
        this.health = 4;

        this.direction = options.direction;
        this.maxVelocity = options.maxVelocity;
        this.mushroomTobePoisoned = null;

    }

    //collison detections
    collatWithMushroom() {
        let collided = this.game.AllMushrooms.some(
            (mushroom) => {
                this.mushroomTobePoisoned = mushroom;               
                return this.hasCollisonOccured(mushroom);

            }, this);
        if (collided) {
            this.poisonMushrooms(this.mushroomTobePoisoned);
        }
    }


    hitByZapper() {

        this.game.addSparks(
            {
                pos: this.pos.slice(),
                amount: 36,
                color: this.color
            }
        );


        if (this.health === 0 && this.armor === 0) {
            this.game.removeEntity(this);
            //scorpion rewards most points
            this.game.sfx.armoredScorpion();
            this.game.sfx.killSpider();
            this.game.incrementScore(2000);
        }

        else if (this.armor !== 0) {
            this.armor--;

        }
        else if (this.armor === 0) {
            this.health--;
        }

    }



    poisonMushrooms(mushroom) {

        if (Math.random() > 0.75) {
            mushroom.poisonMushroom();

        }


    }

    //scorpion is made to run horizontally in the orginal
    //game however we will give it the ability to randomly
    // have a chance to do more than that
    // therefore default movement means there is no y-axis movement
    // on velocity
    move() {

        this.pos[0] += this.vel[0];
        this.pos[1] += this.vel[1];
        this.collatWithMushroom();
        this.rotation();
        this.increaseVelocity();

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


    increaseVelocity() {
        let velocityofX = this.maxVelocity * Math.cos(this.direction);
        let velocityofY = this.maxVelocity * Math.sin(this.direction);
        this.vel = [velocityofX, velocityofY];
    }

    rotation() {
        let rotationAmount = Math.min(Math.abs(this.findPlayer() - this.direction), Math.PI / 8);
        this.direction += this.findPlayer() > this.direction ? rotationAmount : (rotationAmount * -1);

    }


    draw(ctx) {

        this.drawEllipseByCenter(ctx, this.pos[0], this.pos[1], 16, 13);

    }


    drawEllipseByCenter(ctx, cx, cy, w, h) {

        ctx.fillStyle = Util.randomColors();
        //tail
        this.drawEllipse(ctx, cx + 2 - w / 2.0, cy + 4 - h / 2.0, w, h - 4);
        this.drawEllipse(ctx, cx - w / 2.0, cy + 12 - h / 2.0, 8, h - 2);
        this.drawEllipse(ctx, cx - w / 2.0, cy + 24 - h / 2.0, w - 8, h - 2);
        this.drawEllipse(ctx, cx - w / 2.0, cy + 36 - h / 2.0, w - 8, h + -2);

        //tail connect to body
        this.drawEllipse(ctx, cx - 1 - w / 3.0, cy + 46 - h / 2.0, w, h - 4);
        //body
        // this.drawEllipse(ctx, 98, 92, 65, 30);
        this.drawEllipse(ctx, cx + 8, cy + 32, 65, 30);



        //tail end
        this.drawEllipse(ctx, cx + 17 - w / 2.0, cy + 2 - h / 2.0, w - 8, 6);
        //stinger
        ctx.fillStyle = "purple";
        ctx.beginPath();
        ctx.moveTo(cx + 30, cy + 7);
        ctx.lineTo(cx + 20, cy - 2);
        ctx.lineTo(cx + 15, cy - 2);
        ctx.fill();
        ctx.closePath();
        ctx.stroke();




        // //eyes
        ctx.fillStyle = "red";
        ctx.beginPath();
        ctx.arc(this.pos[0] + 64, this.pos[1] + 41, 4, 0, 2 * Math.PI);
        ctx.arc(this.pos[0] + 64, this.pos[1] + 51, 4, 0, 2 * Math.PI);
        ctx.fill();
        ctx.stroke();
        ctx.closePath();


        ctx.fillStyle = Util.randomColors();
        //legs - top side
        ctx.beginPath();

        ctx.moveTo(this.pos[0] + 30, this.pos[1] + 35);
        ctx.lineTo(this.pos[0] + 5, this.pos[1] + 20);
        ctx.lineTo(this.pos[0] + 20, this.pos[1] + 5);


        ctx.stroke();


        ctx.moveTo(this.pos[0] + 40, this.pos[1] + 35);
        ctx.lineTo(this.pos[0] + 15, this.pos[1] + 20);
        ctx.lineTo(this.pos[0] + 30, this.pos[1] + 10);


        ctx.moveTo(this.pos[0] + 50, this.pos[1] + 35);
        ctx.lineTo(this.pos[0] + 25, this.pos[1] + 20);
        ctx.lineTo(this.pos[0] + 45, this.pos[1] + 10);


        ctx.moveTo(this.pos[0] + 60, this.pos[1] + 35);
        ctx.lineTo(this.pos[0] + 35, this.pos[1] + 20);
        ctx.lineTo(this.pos[0] + 55, this.pos[1] + 10);



        ctx.stroke();


        //legs - bottom side
        ctx.beginPath();

        ctx.moveTo(this.pos[0] + 30, this.pos[1] + 60);
        ctx.lineTo(this.pos[0] - 6, this.pos[1] + 65);
        ctx.lineTo(this.pos[0] + 20, this.pos[1] + 90);


        ctx.moveTo(this.pos[0] + 40, this.pos[1] + 60);
        ctx.lineTo(this.pos[0] + 16, this.pos[1] + 65);
        ctx.lineTo(this.pos[0] + 30, this.pos[1] + 90);


        ctx.moveTo(this.pos[0] + 50, this.pos[1] + 60);
        ctx.lineTo(this.pos[0] + 26, this.pos[1] + 65);
        ctx.lineTo(this.pos[0] + 40, this.pos[1] + 100);

        ctx.moveTo(this.pos[0] + 60, this.pos[1] + 59);
        ctx.lineTo(this.pos[0] + 36, this.pos[1] + 65);
        ctx.lineTo(this.pos[0] + 50, this.pos[1] + 100);


        ctx.stroke();
        ctx.closePath();

        //claws- top
        ctx.beginPath();
        ctx.moveTo(this.pos[0] + 60, this.pos[1] + 38);
        ctx.lineTo(this.pos[0] + 45, this.pos[1] + 6);
        ctx.lineTo(this.pos[0] + 75, this.pos[1] - 10);

        ctx.moveTo(this.pos[0] + 60, this.pos[1] + 38);
        ctx.lineTo(this.pos[0] + 50, this.pos[1] + 6);
        ctx.lineTo(this.pos[0] + 78, this.pos[1] - 10);


        ctx.stroke();
        //pincer top
        ctx.beginPath();

        ctx.moveTo(this.pos[0] + 100, this.pos[1] - 10);
        ctx.lineTo(this.pos[0] + 70, this.pos[1] - 10);
        ctx.lineTo(this.pos[0] + 70, this.pos[1] - 5);
        ctx.fill();

        ctx.closePath();
        ctx.stroke();

        ctx.beginPath();

        ctx.moveTo(this.pos[0] + 100, this.pos[1] - 5);
        ctx.lineTo(this.pos[0] + 70, this.pos[1] - 5);
        ctx.lineTo(this.pos[0] + 70, this.pos[1]);
        ctx.fill();

        ctx.closePath();
        ctx.stroke();


        ctx.closePath();
        //claws -bottom
        ctx.beginPath();

        ctx.moveTo(this.pos[0] + 70, this.pos[1] + 50);
        ctx.lineTo(this.pos[0] + 46, this.pos[1] + 75);
        ctx.lineTo(this.pos[0] + 75, this.pos[1] + 100);

        ctx.moveTo(this.pos[0] + 70, this.pos[1] + 50);
        ctx.lineTo(this.pos[0] + 52, this.pos[1] + 75);
        ctx.lineTo(this.pos[0] + 80, this.pos[1] + 100);

        ctx.stroke();

        //pincer
        ctx.beginPath();

        ctx.moveTo(this.pos[0] + 100, this.pos[1] + 100);
        ctx.lineTo(this.pos[0] + 75, this.pos[1] + 95);
        ctx.lineTo(this.pos[0] + 75, this.pos[1] + 100);
        ctx.fill();
        ctx.closePath();
        ctx.stroke();

        ctx.beginPath();

        ctx.moveTo(this.pos[0] + 100, this.pos[1] + 90);
        ctx.lineTo(this.pos[0] + 75, this.pos[1] + 95);
        ctx.lineTo(this.pos[0] + 75, this.pos[1] + 100);
        ctx.fill();
        ctx.closePath();
        ctx.stroke();

        ctx.fill();
        ctx.stroke();


    }



    drawEllipse(ctx, x, y, w, h) {
        let euler = .5522848,
            ox = (w / 2) * euler, // control point offset horizontal
            oy = (h / 2) * euler, // control point offset vertical
            xe = x + w,           // x-end
            ye = y + h,           // y-end
            xm = x + w / 2,       // x-middle
            ym = y + h / 2;       // y-middle

        ctx.beginPath();
        ctx.moveTo(x, ym);
        ctx.bezierCurveTo(x, ym - oy, xm - ox, y, xm, y);
        ctx.bezierCurveTo(xm + ox, y, xe, ym - oy, xe, ym);
        ctx.bezierCurveTo(xe, ym + oy, xm + ox, ye, xm, ye);
        ctx.bezierCurveTo(xm - ox, ye, x, ym + oy, x, ym);

        ctx.fillStyle = Util.randomColors();
        ctx.fill();
        ctx.stroke();
    }

}






export default ArmoredScorpion;