
import Util from "./utils.js";
import MovingObject from "./movingObject.js";
import Bullet from "./bullet.js";
import Game from "./game.js";
import Spider from "./spider.js";
import Centipede from "./centipede.js";
import Flea from "./flea.js";
import ZapperFire from "./zapperFire.js";
import Scorpion from "./scorpion.js";
import ArmoredScorpion from "./armored_Scorpion.js";
import Wasp from "./wasp.js";
import JumpingSpider from "./jumping_Spider.js";
import LightningWasp from "./lightning_Wasp.js";
import PowerUps from "./powerUps.js";

// the player is the bugzapper that can be controlled
//player can move the zapper range of up to 30% of the bottom
//screen 

class BugZapper extends MovingObject {

    constructor(options) {


        super({
            pos: options.pos,
            radius: BugZapper.RADIUS,
            vel: [0, 0],
            color: Util.randomColors(),
            game: options.game
        });
        //add the actual zapper barrel
        this.zapperBarrell = new ZapperFire({
            fireRate: 300,
            speed: 10,
            number: 1,
            game: this.game,
            bugZapper: this
        });
        this.hasSplayShot = false;
        this.hasShield = false;
    }

    fireZap() {

        this.game.addEntities(new Bullet({
            game: this.game,
            vel: this.vel,
            pos: this.pos.slice()
        }));


    }


    draw(ctx) {
        let tempRadius = (this.radius / 3) * 5;
        let x = 20;
        let y = 20;

        ctx.beginPath();
        ctx.moveTo(this.pos[0], this.pos[1] - this.radius / 2);
        ctx.lineTo(this.pos[0] - tempRadius * Math.cos(7 * Math.PI / 6), this.pos[1] - tempRadius * Math.sin(7 * Math.PI / 6));
        ctx.lineTo(this.pos[0], this.pos[1]);
        ctx.lineTo(this.pos[0] - tempRadius * Math.cos(-1 * Math.PI / 6), this.pos[1] - tempRadius * Math.sin(-1 * Math.PI / 6));
        ctx.lineTo(this.pos[0], this.pos[1]);
        ctx.lineTo(this.pos[0] - tempRadius * Math.cos(7 * Math.PI / 6), this.pos[1] - tempRadius * Math.sin(7 * Math.PI / 6));
        ctx.lineTo(this.pos[0] - tempRadius * Math.cos(-1 * Math.PI / 6), this.pos[1] - tempRadius * Math.sin(-1 * Math.PI / 6));

        ctx.closePath();

        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.stroke();

        //player loses life or gets shield power up give them shield to prevent 
        //losing a lives too fast for instant game over
        if (this.hasShield === true) {
            ctx.strokeStyle = Util.randomColors();
            ctx.beginPath();
            ctx.arc(this.pos[0], this.pos[1], tempRadius*2, 0, 2 * Math.PI, false);
            ctx.stroke();
        }


    }


    power(impulse) {
        this.vel[0] += impulse[0];
        this.vel[1] += impulse[1];
        // console.table(this.vel);
        for (let i = 0; i < 2; i++) {
            if (this.vel[i] > BugZapper.MAX_SPEED) {
                this.vel[i] = BugZapper.MAX_SPEED;
            }
            else if (this.vel[i] < (-BugZapper.MAX_SPEED)) {
                this.vel[i] = (-BugZapper.MAX_SPEED);
            }
        }


    }

    slowZapper(distance) {
        distance = distance || 0.02;
        for (let i = 0; i < 2; i++) {
            //check if velocity reached a negative number
            if (Math.abs(this.vel[i]) < distance) {
                this.vel[i] = 0;
            }
            else {
                this.vel[i] *= 1 - distance;
            }
        }
    }



    // according to the orginal games code in assembly in seems that 
    // the movement per key press if using keys it moves the length
    //of the with of a mushroom
    move() {
        this.pos[0] += this.vel[0];
        this.pos[1] += this.vel[1];
        //figured out that in moveobject class this function is overided
        // for most classes was calling move from movingobject before
        // now this move from zapper will be called instead
        //boundary functions prevent the ship from moving out of the game
        //canvas also limits the moveable area of the 
        //bug zapper to be around 30-40 % of the bottom of the
        // game canvas
        // x axis prevent from moving outside the width of canvas
        let twoThirdOfScreen = ((Game.DIM_Y - 36) * 2 / 3) + 36;
        let playPos = twoThirdOfScreen - (twoThirdOfScreen % 24);
        let topLimit = playPos + (24 / 2); // -> thhis will be use as the playerarea
        let testRange = 36;

        // console.log("in bugzappper move");
        // console.log(Game.DIM_X);

        if (this.pos[0] + this.radius > Game.DIM_X) {
            this.pos[0] = Game.DIM_X - this.radius;
            // reset it back to zero if it is negative speed
            this.vel[0] = this.vel[0] < 0 ? this.vel[0] : 0;


        }
        // if the pos and ships hit box is outside the canvas
        // this is to prevent that 
        else if (this.pos[0] - this.radius < 0) {
            this.pos[0] = this.radius + 0;
            this.vel[0] = this.vel[0] > 0 ? this.vel[0] : 0;
        }
        //prevent from moving out of the game height of canvas
        // if we are to render a border for the score table we would sub
        // dimy from the height of the score table
        if (this.pos[1] + this.radius > Game.DIM_Y) {
            this.pos[1] = Game.DIM_Y - this.radius;
            this.vel[1] = this.vel[1] < 0 ? this.vel[1] : 0;
        }
        else if (this.pos[1] - this.radius < testRange) {
            this.pos[1] = testRange + this.radius;
            this.vel[1] = this.vel[1] > 0 ? this.vel[1] : 0;
        }


    }

    // if the players bug zapper collides with any
    // object of enemy type the player loses a life
    // if they collide with a mushroom they cannot move throw
    //it
    collisonDetection(entity) {

        if ((entity instanceof Spider || entity instanceof Centipede ||
            entity instanceof Flea || entity instanceof Scorpion ||
            entity instanceof ArmoredScorpion ||
            entity instanceof Wasp ||
            entity instanceof JumpingSpider ||
            entity instanceof LightningWasp
        ) && !this.hasShield) {

            //player loses life activate shield and clear poison mushrooms

            this.game.giveShield();
            this.game.lives--;
            this.game.clearPoisonMushrooms();


            if (this.game.lives > 0) {
                // set timer for shield
                setTimeout(function(){
                    this.hasShield = false;

                }.bind(this),8000);
            }



            //  this.game.AllMushrooms.forEach(
            //     (mushroom) => {
            //         mushroom.poisoned = false;
            //     }, this);

        }

        if ((entity instanceof PowerUps)) {

            entity.collisonDetection(this);
            this.game.removeEntity(entity);

        }


    }

}
BugZapper.RADIUS = 12;
BugZapper.MAX_SPEED = 10;


export default BugZapper;
