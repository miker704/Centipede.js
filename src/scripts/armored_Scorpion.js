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




















}





export default ArmoredScorpion;