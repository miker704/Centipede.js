
import BugZapper from "./bugZapper.js";
import MovingObject from "./movingObject.js"
import Util from "./utils.js";


const DEFAULT_MUSHROOM = {
    COLOR: '#ff4100',
    RADIUS: 12

};


class Mushrooms extends MovingObject {
    constructor(options) {
   


        super({
            pos: options.pos,
            vel: [0, 0],
            radius: DEFAULT_MUSHROOM.RADIUS,
            game: options.game,
            color: Util.mushroomRandomColors(),
        });


        this.health= 2;
    }


    // if the mushroom is poisoned it should become purple
    isPoisoned() {
        return this.poisoned;
    }

    // when a scorpion collides with a mushhroom it becomes
    //poisoned
    poisonMushroom() {
        this.color = '#800080';
        this.poisoned = true;
    }


    draw(ctx) {


        ctx.fillStyle = this.color;
        //create the the mushroom stem
        let mushroomStem = 8;
        ctx.fillRect(this.pos[0] - mushroomStem / 2, this.pos[1] - this.radius / 2, mushroomStem, this.radius * 1.5);

        //create the mushroom cap
        ctx.beginPath();
        ctx.ellipse(this.pos[0], this.pos[1] - this.radius / 2, this.radius, this.radius / 2, 0, 0, 2 * Math.PI,false);
        ctx.fill();
        ctx.stroke();

        



    }
    
    hitByZapper() {
        this.health--;
        // console.log("hitting mushroom");

        this.game.incrementScore(10);
        if (this.health === 0) {

            // console.log("destroyed mushroom");
            this.game.incrementScore(50);
            this.game.removeEntity(this);
            return; 

        } 

    }




    collisonDetection(entity) {
        if (entity instanceof BugZapper) {
            entity.pos[0] -= entity.vel[0];
            entity.pos[1] -= entity.vel[1];
            console.log("currently collat with mushrooms");

        }
    }

}


export default Mushrooms;

