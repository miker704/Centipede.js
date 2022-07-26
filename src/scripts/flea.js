
import MovingObject from "./movingObject";
import Util from "./utils.js";


class Flea extends MovingObject {
    constructor(options) {
        super({

            // pos: [90, 60],
            pos: Util.randomFleaPos(),
            radius: 42,
            vel: [0, 0],
            color: Util.randomColors(),
            game: options.game

        })


    }

     //fleas basically drop down from the top as they travel
    //down they spawn mushrooms they spawn when around 1/5 of mushrooms
    // are gone from the current level
    // they take 2 hits to defeat

    move(){
        
    }

    hitByZapper(){
        if (this.health === 0) {
            this.game.removeEntity(this);
            this.game.incrementScore(200);
        }
        else {
            this.health--;
        }
    }


    draw(ctx) {
        this.drawEllipseByCenter(ctx, this.pos[0], this.pos[1], 16, 13);
    }


    drawEllipseByCenter(ctx, cx, cy, w, h) {
        this.drawEllipse(ctx, cx - w / 2.0, cy - h / 2.0, w + 2, h);

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

        //eyes
        ctx.fillStyle = "red";
        ctx.beginPath();
        ctx.arc(this.pos[0] + 21 - w / 2.0, this.pos[1] + 3 - h / 2.0, 2, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.fill();
        ctx.beginPath();
        // this.drawEllipse(ctx, cx + 19 - w / 2.0, cy + 2 - h / 2.0, 3, 4);
        ctx.closePath();

    }

    drawEllipse(ctx, x, y, w, h) {

        ctx.fillStyle = this.color;

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

export default Flea;