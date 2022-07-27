import MovingObject from "./movingObject.js";
import Util from "./utils";



class Wasp extends MovingObject {
    constructor(options) {
        super(
            {
                pos: options.pos,
                radius: 12,
                vel: options.vel,
                color: Util.randomColors(),
                game: options.game

            }
        )

        this.health = 4;
        this.direction = Math.random() * 2 * Math.PI;
        this.gravitation = true;
        this.rotation = 0.05;
        this.acceleration = options.acceleration;
    }

   
    move() {
        let newPos = [this.pos[0] + this.vel[0], this.pos[1] + this.vel[1]];
        let splitSize;

        // this.bounciness();
        this.waspBounciness();
        this.direction += this.rotation;

        if (this.hitBottomOfCanvas(newPos)) {

            this.moveUp();
            splitSize = true;

        }
        else if (this.hitTopOfCanvas(newPos)) {


            let swap = this.vel[0];
            this.vel[0] = (this.vel[1]) * -1;
            this.vel[1] = swap;
            splitSize = true;

            this.moveDown();
        }
        else if (this.hitSideWall(newPos)) {
            if (this.pos[1] === Util.centipedeLowestCorner()) {

                this.moveUp();
            }
            else {

                this.moveDown();
            }
            splitSize = true;
        }
        else if (this.reachedNextRow(newPos)) {
            this.newRow = null;
            this.vel[0] = -this.previousDirection;
            this.vel[1] = 0;
            let newRowPos = [this.pos[0] + this.vel[0], this.pos[1] + this.vel[1]];

            if (this.hitSideWall(newRowPos)) {
                this.vel[0] *= -1;
            }
            splitSize = true;
        }
        this.pos[0] += this.vel[0];
        this.pos[1] += this.vel[1];
        if (splitSize) {
            this.moveToNextRow();

        }

    }

    hitByZapper() {
        //wasp speed doubles if it is shot
       
        if (this.health === 0) {
            this.game.removeEntity(this);
            this.game.incrementScore(500);
        }
        else if (this.health === 3) {


            this.acceleration = this.acceleration * 10;

        }
        else if (this.health === 2) {
           
            this.acceleration = this.acceleration * 15;
            this.vel[0] *= 5;
            this.vel[1] *= 5;
        }
        else if (this.health === 1) {
            this.acceleration = this.acceleration * 25;
        }

        this.health--;


    }



    moveUp() {

        this.vel[1] = -Math.abs(this.vel[0]);
        this.vel[0] = 0;

    }

    moveDown() {

        let nearestPos = Util.centipedeNearestPos(this.pos);
        this.nextRow = nearestPos[1] + (this.radius * 2);


        this.previousDirection = this.vel[0];
        this.vel[0] = this.vel[1];
        this.vel[1] = Math.abs(this.previousDirection);
    }


    hitSideWall(newPos) {

        return (newPos[0] < 12 && newPos[1] !== 48) || newPos[0] > Util.centipedeRightMostPos();

    }


    hitBottomOfCanvas(newPos) {


        return this.hitSideWall(newPos) && this.pos[1] === Util.centipedeLowestCorner();
    }

    hitTopOfCanvas(newPos) {


        return newPos[1] < 36 && this.vel[1] < 0;


    }

    reachedNextRow(newPos) {


        return this.nextRow && newPos[1] > this.nextRow;
    }

    moveToNextRow() {


        this.pos = Util.centipedeNearestPos(this.pos);
    }

    draw(ctx) {
        this.drawEllipseByCenter(ctx, this.pos[0], this.pos[1], 16, 13);
    }




    drawEllipseByCenter(ctx, cx, cy, w, h) {
        this.drawEllipse(ctx, cx - w / 2.0, cy - h / 2.0, w + 2, h);
        this.drawEllipse(ctx, cx - 4 - w / 2.0, cy - 3 - h / 2.0, w + 3, h - 4);
        this.drawEllipse(ctx, cx - 3 - w / 2.0, cy - h / 2.0, w - 1, h - 6);
        this.drawEllipse(ctx, cx - w / 2.0, cy + 3 - h / 2.0, w + 1, h - 6);


        this.drawEllipse(ctx, cx - 12 - w / 2.0, cy + 5 - h / 2.0, w, h);
        ctx.beginPath();
        ctx.strokeStyle = "black";
        ctx.moveTo(cx - 19, cy + 8);
        ctx.lineTo(cx - 30, cy + 10);
        ctx.lineTo(cx - 35, cy + 15);

        ctx.closePath();
        ctx.stroke();


        //front legs -1
        ctx.beginPath();
        ctx.moveTo(cx + 8, cy + 5);
        ctx.lineTo(cx + 15, cy + 13);
        ctx.lineTo(cx + 11, cy + 13);
        ctx.stroke()

        ctx.closePath();

        //front legs - 2
        ctx.beginPath();

        ctx.moveTo(cx + 10, cy + 4);
        ctx.lineTo(cx + 20, cy + 10);
        ctx.lineTo(cx + 15, cy + 10);
        ctx.stroke()

        ctx.closePath();



        //middle leg 1
        ctx.beginPath();
        ctx.moveTo(cx + 7, cy + 5);
        ctx.lineTo(cx + 1, cy + 13);
        ctx.lineTo(cx - 2, cy + 13);
        ctx.stroke()
        ctx.closePath();

        //middle leg 2
        ctx.beginPath();
        ctx.moveTo(cx + 4, cy + 5);
        ctx.lineTo(cx - 5, cy + 13);
        ctx.lineTo(cx - 7, cy + 13);
        ctx.stroke()

        ctx.closePath();


        //back legs - 1
        ctx.beginPath();

        ctx.moveTo(cx - 4, cy + 5);
        ctx.lineTo(cx - 11, cy + 16);
        ctx.lineTo(cx - 14, cy + 16);
        ctx.stroke()

        ctx.closePath();

        // back legs - 2
        ctx.beginPath();

        ctx.moveTo(cx - 8, cy + 4);
        ctx.lineTo(cx - 16, cy + 14);
        ctx.lineTo(cx - 20, cy + 14);
        ctx.stroke()

        ctx.closePath();

        this.drawEllipse(ctx, cx + 17 - w / 2.0, cy + 2 - h / 2.0, w - 8, 6);
        ctx.stroke()
        ctx.beginPath();
        ctx.moveTo(cx + 16, cy + 1);
        ctx.lineTo(cx + 20, cy + 4);
        ctx.lineTo(cx + 16, cy + 4);
        ctx.stroke();
        ctx.closePath();

        ctx.beginPath();
        ctx.moveTo(cx + 14, cy + 2);
        ctx.lineTo(cx + 18, cy + 5);
        ctx.lineTo(cx + 12, cy + 5);

        ctx.stroke();
        ctx.closePath();


        //antentee
        ctx.beginPath();
        ctx.moveTo(cx + 12, cy - 1);
        ctx.lineTo(cx + 24, cy - 10);
        ctx.lineTo(cx + 12, cy - 10);

        ctx.stroke();
        ctx.closePath();
        ctx.beginPath();
        ctx.moveTo(cx + 10, cy - 1);
        ctx.lineTo(cx + 20, cy - 11);
        ctx.lineTo(cx + 12, cy - 11);

        ctx.stroke();

        //eyes
        ctx.fillStyle = "red";
        ctx.beginPath();
        ctx.arc(this.pos[0] + 21 - w / 2.0, this.pos[1] + 3 - h / 2.0, 2, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.fill();
        ctx.beginPath();
        ctx.closePath();

        // ctx.moveTo(cx - 20, cy + 10);
        // ctx.lineTo(cx + 10, cy-10 );
        // ctx.lineTo(cx - 10, cy-10);
        // ctx.lineTo(cx + 30, cy-10 );
        // ctx.closePath();
        ctx.fill();
        ctx.stroke();

    }



    drawEllipse(ctx, x, y, w, h) {

        ctx.fillStyle = Util.randomColors();

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
        ctx.fill();
        ctx.stroke();
    }






}

export default Wasp;
