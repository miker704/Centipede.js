
import MovingObject from "./movingObject";
import Util from "./utils.js";



class Scorpion extends MovingObject {
    constructor(options) {
        super(
            {
                // pos: Util.randomScorpionPos(),
                pos: [90, 60],
                radius: 42,
                vel: [0, 0],
                color: Util.randomColors(),
                game: options.game
            }
        );


    }


    poisonMushrooms(){

    }


    scorpionMovement(){

    }

    drawScorpion(){

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
        ctx.closePath();
        ctx.stroke();
        ctx.fill();



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
        // ctx.closePath();


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


export default Scorpion;