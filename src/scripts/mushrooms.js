
import BugZapper from "./bugZapper.js";
import Util from "./utils.js";


const DEFAULT_MUSHROOM = {
    COLOR: '#ff4100',
    RADIUS: 10

};


class Mushrooms {
    constructor (pos) {
        this.health = 4;
        this.poisoned = false;
        // this.color=DEFAULT_MUSHROOM.COLOR;
        this.color = Util.mushroomRandomColors();
        console.log(this.color);
        this.radius = DEFAULT_MUSHROOM.RADIUS;
        // this.game=options.game;
        this.vel = 0;
        this.pos = pos;

    }


    // if the mushroom is poisoned it should become purple
    isPoisoned () {
        return this.poisoned;
    }

    // when a scorpion collides with a mushhroom it becomes
    //poisoned
    poisonMushroom () {
        this.color = '#800080';
        this.poisoned = true;
    }


    drawMushrooms (ctx) {
        //asteriods code to to draw a ball
        // ctx.beginPath();
        // ctx.arc(this.pos[0],this.pos[1], this.radius, 0, 2 * Math.PI );
        // ctx.fillStyle = this.color;
        // ctx.fill();
        // ctx.stroke();

        ctx.fillStyle = this.color;
        //create the the mushroom stem
        let mushroomStem = 6;
        ctx.fillRect(this.pos[0] - mushroomStem / 2, this.pos[1] - this.radius / 2, mushroomStem, this.radius * 1.5);

        //create the mushroom cap
        ctx.beginPath();
        ctx.ellipse(this.pos[0], this.pos[1] - this.radius / 2, this.radius, this.radius / 2, 0, 0, 2 * Math.PI);
        ctx.fill();
        ctx.stroke();




    }

    hitByZapper(){
        this.health--;

    }



    collisonDetection (entity) {
        if (entity instanceof BugZapper) {
            entity.pos[0] -= entity.vel[0];
            entity.pos[1] -= entity.vel[1];


        }
    }

}


export default Mushrooms;

