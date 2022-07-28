
import MovingObject from "./movingObject";
import Util from "./utils.js";


class Flea extends MovingObject {
    constructor(options) {
        super({

            // pos: [90, 60],
            pos: options.pos,
            radius: 12,
            vel: options.vel,
            color: Util.randomColors(),
            game: options.game

        })

        this.health = 2;
        this.direction = Math.random() * 2 * Math.PI;
        this.gravitation = true;
        this.rotation = 0.05;
        this.acceleration = options.acceleration;
      


    }

    //fleas basically drop down from the top as they travel
    //down they spawn mushrooms they spawn when around 1/5 of mushrooms
    // are gone from the current level
    // they take 2 hits to defeat

    move() {

        this.bounciness();
        // this.pos[0]+=this.vel[0];
        // this.pos[1]+=this.vel[1];
        // this.gravitation && this.gravity();
        // if(this.game.outOfBounds(this.pos)){
        // this.game.removeEntity(this);
        // }
        super.move(); //use super move instead its the same

        this.direction += this.rotation;
        this.fleaSpawnMushroom();

    }

    hitByZapper() {
        //flea speed doubles if it is shot

        this.game.addSparks(
            {
                pos: this.pos.slice(),
                amount: 12,
                color: this.color
            }
        );
        if (this.health === 0) {
            this.game.removeEntity(this);
            this.game.incrementScore(200);
        }
        else if (this.health === 1) {
            this.acceleration = this.acceleration * 2;
        }
        else {
            this.health--;
        }

    }


    fleaSpawnMushroom() {
        if (Math.random() > 0.9) {
            let mushroomPos = Util.centipedeNearestPos(this.pos)

            if(mushroomPos[1] <=724){ //prevent mushroom blocking the bottom floor as player cant shoot it
                
                
                this.game.addMushroomHere({
                    // pos: Util.centipedeNearestPos(this.pos),
                    pos:mushroomPos,
                    game: this.game
                })
            }
            // else if(mushroomPos[1] >=724){
                // console.log("mushroom y pos ", mushroomPos);
                // console.log("mushroom spawn trying to block player")
            // }




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

export default Flea;