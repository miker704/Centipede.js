import MovingObject from "./movingObject";
import Util from "./utils";




class ArmoredScorpion extends MovingObject {
    constructor(options){
        super(
            {
                pos: options.pos,
                radius: 36,
                vel: [0,0],
                color: Util.randomColors(),
                game: options.game
            }
        );

         //special properties for spawn of scorpion they are
        //2 versions the classic version that moves horizontally 
        // and another exclusive to this game that tracks the player 
        // and has armor

        this.armor = 10;
        this.health = 10;

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
            console.log(this.mushroomTobePoisoned);
            this.poisonMushrooms(this.mushroomTobePoisoned);
        }
    }



    
    hitByZapper() {
        if (this.health === 0 && this.armor === 0) {
            this.game.removeEntity(this);
            //scorpion rewards most points

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














}





export default ArmoredScorpion;