import MovingObject from "./movingObject.js";
import Util from "./utils";



class LightningWasp extends MovingObject {
    constructor(options) {
        super(
            {
                // pos: options.pos,
                pos: [90,60],
                radius: 16,
                vel: options.vel,
                color: Util.randomColors(),
                game: options.game

            }
        )
        this.armor = 2;
        this.health = 10;
        this.direction = Math.random() * 2 * Math.PI;
        this.gravitation = true;
        this.rotation = 0.05;
        this.acceleration = options.acceleration;
    }

    move() {


      
        this.waspBounciness();
     
        // this.gravitation && this.gravity();
        // if(this.game.outOfBounds(this.pos)){
        // this.game.removeEntity(this);
        // }
        // super.move(); //use super move instead its the same

        this.direction += this.rotation;
        this.pos[0] += this.vel[0];
        this.pos[1] += this.vel[1];




     

    }

    hitByZapper() {
        //wasp speed doubles if it is shot

        if (this.armor !== 0) {
            this.armor--;
        }
        else {
            this.health--;
        }

        if (this.health !== 10) {
            this.acceleration = this.acceleration * 5;
            this.vel[0] *= this.health > 4 ? 1.5 : 2;
            this.vel[1] *= this.health > 4 ? 1.5 : 2;
            
        }



        if (this.health === 0 && this.armor === 0) {
            this.game.removeEntity(this);
            this.game.incrementScore(1000);
        }
       
    }







    draw(ctx) {
        this.drawEllipseByCenter(ctx, this.pos[0], this.pos[1], 16, 13);
    }




    drawEllipseByCenter(ctx, cx, cy, w, h) {
        this.drawEllipse(ctx, cx - w / 2.0, cy - h / 2.0, w + 2, h);
        this.drawEllipse(ctx, cx - 10 - w / 2.0, cy +1 - 3 - h / 2.0, w + 12, h - 8);
        this.drawEllipse(ctx, cx - 10 - w / 2.0, cy +1 - h / 2.0, w + 12, h - 8);

        // this.drawEllipse(ctx, cx - 3 - w / 2.0, cy - h / 2.0, w - 1, h - 6);
        this.drawEllipse(ctx, cx - w / 2.0, cy + 3 - h / 2.0, w + 1, h - 6);


        this.drawEllipse(ctx, cx - 12 - w / 2.0, cy + 5 - h / 2.0, w, h);
        ctx.beginPath();
        // ctx.strokeStyle = Util.randomColors();
        ctx.strokeStyle = "blue";

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
        ctx.lineTo(cx + 30, cy - 15);
        ctx.lineTo(cx + 12, cy - 15);

        ctx.stroke();
        ctx.closePath();
        ctx.beginPath();
        ctx.moveTo(cx + 10, cy - 1);
        ctx.lineTo(cx + 25, cy - 20);
        ctx.lineTo(cx + 12, cy - 20);

        ctx.stroke();

        //eyes
        ctx.fillStyle = "red";
        ctx.beginPath();
        ctx.arc(this.pos[0] + 21 - w / 2.0, this.pos[1] + 3 - h / 2.0, 2, 0, 2 * Math.PI);
        // this.drawEllipse(ctx, cx + 19 - w / 2.0, cy + 2 - h / 2.0, 3, 4);
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

export default LightningWasp;
