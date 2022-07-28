import MovingObject from "./movingObject.js";
import Util from "./utils.js";
import Spider from "./spider.js";
import Mushrooms from "./mushrooms.js";
import Centipede from "./centipede.js";
import Flea from "./flea.js";
import Scorpion from "./scorpion.js";
import ArmoredScorpion from "./armored_Scorpion.js";
import JumpingSpider from "./jumping_Spider.js";
import Wasp from "./wasp.js";
import LightningWasp from "./lightning_Wasp.js";
import SplayArray from "./splayArray.js";

class Bullet extends MovingObject {
    constructor(options) {


        super({

            pos: options.pos,
            vel: options.vel,
            game: options.game,
            radius: options.radius || Bullet.RADIUS,
            color: '#FFFFFF'


        });
        this.splayable = options.splayable;
        this.otherColor = options.otherColor;
        this.childOfSplay = false;
        this.stuckWithSplay = false;

        if (this.otherColor) {

            // this.color = Util.randomColors();
            this.color = this.otherColor;
        }

        // console.log("splayable ? : ", this.splayable);
        this.splayShotDelete = true;
        this.detonate = false;
        this.splaySpawned = false;
        this.callToSplay = false;
        this.splayChoice = Math.floor(Math.random() * (2 - 1 + 1)) + 1;
    }


    callFrag(entity) {


        this.pos[0] = this.pos[0]
        this.pos[1] = this.pos[1];

        for (let i = 1; i <= 8; i++) {
            let zapPositon = [entity.pos[0], entity.pos[1] - entity.radius / 8];
            let zapAngle = (Math.PI - 0.1 * (360 / i));
            let zapX = 10 * Math.cos(zapAngle);
            let zapY = (-10) * Math.sin(zapAngle);

            this.game.allBullets.push(
                new Bullet({
                    game: this.game,
                    pos: zapPositon.slice(),
                    vel: [zapX, zapY],
                    otherColor: '#FF0000',
                    radius: 5,
                    splayable: false,
                    childOfSplay: true,

                })
            )

            // setTimeout(() => {
            // clearInterval(this.game.SplayBullets);
            // }, 2)
        }

        this.splaySpawned = true;
        this.detonate = true;
        // entity.hitByZapper(); // call to remove entity
        // this.game.removeEntity(this);
        this.splayShotDelete = true;
        this.stuckWithSplay = false;

        // this.splayable = false;
        // if (this.game.outOfBounds(this)) {
        // this.game.removeEntity(this);
        // }
    }




    //check if the bullet collides with some destroyable entity
    collisonDetection(entity) {

        if (this.game.zapper.hasSplayShot === true &&
            this.splayable === true &&
            this.childOfSplay === false

        ) {

            this.splayShotDelete = false;

            this.color = '#50C878';
            this.radius = 8;

            if (entity instanceof Mushrooms ||
                entity instanceof Spider ||
                entity instanceof Centipede ||
                entity instanceof Scorpion ||
                entity instanceof Flea ||
                entity instanceof ArmoredScorpion ||
                entity instanceof Wasp ||
                entity instanceof JumpingSpider ||
                entity instanceof LightningWasp
            ) {
                this.stuckWithSplay = true;
                this.callToSplay = true;
                if (this.splayable === true && this.stuckWithSplay === true) {

                    //splay shot can have 2 random effects 
                    // pass through splaying where shot pass through and 
                    // causes each pass to splay everything it passes through
                    //or it will stick to an enemy explode splaying then
                    // that same round will travel forward attaching another
                    // object splaying again till it leaves the map


                    
                    if (this.splayChoice === 2) {
                        // console.log("splaychoice: ", this.splayChoice);
                        setTimeout(() => {
                            // this.pos[0] = entity.pos[0]
                            // this.pos[1] = entity.pos[1]
                            this.callFrag(entity);
                        }, 1000)
                        

                    }

                    else {

                        // console.log("splaychoice: ", this.splayChoice);

                        setTimeout(() => {
                            this.pos[0] = entity.pos[0]
                            this.pos[1] = entity.pos[1]
                            this.callFrag(entity);
                        }, 1000)

                        this.pos[0] = entity.pos[0]
                        this.pos[1] = entity.pos[1]

                    }




                    // this.pos[0] = entity.pos[0]
                    // this.pos[1] = entity.pos[1]

                    // if(this.detonate === true){
                    //     console.log("removing splay round");
                    //     this.game.removeEntity(this);
                    // }

                }
                this.stuckWithSplay = false;
               

                // entity.hitByZapper(); // call to remove entity
                // this.game.removeEntity(this);
            }

        }



        else if (this.splayShotDelete === true || this.childOfSplay === true) {
            if (entity instanceof Mushrooms ||
                entity instanceof Spider ||
                entity instanceof Centipede ||
                entity instanceof Scorpion ||
                entity instanceof Flea ||
                entity instanceof ArmoredScorpion ||
                entity instanceof Wasp ||
                entity instanceof JumpingSpider ||
                entity instanceof LightningWasp
            ) {
        

                entity.hitByZapper(); // call to remove entity
                this.game.removeEntity(this); // remove the bullet from the game 
            }
        }
    }




}


Bullet.SPEED = 15;
Bullet.RADIUS = 6;


export default Bullet;