
import BugZapper from "./bugZapper.js";
import Bullet from "./bullet.js";
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

        // this.health = this.game.mushroomHealth();
        // this.startingHealth = this.health;
        // this.damage = [];
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
        // ctx.stroke();

        // check if the mushroom is at full health
        // if (this.health === this.startingHealth) {
        //     return;
        // }
    
        //     ctx.fillStyle = '#000000';
        //     let wound = (4-(this.startingHealth / 2));
        //     for (let i = 0; i < this.startingHealth - this.health; i++) {

        //         while (this.damage.length < i + 1) {
        //             this.damage.push(Math.random() * this.radius * 1.5 + this.pos[0] - this.radius * (3 / 4));
        //         }
                
        //                     ctx.beginPath();
        //                     ctx.arc(this.damage[i],this.pos[1]-this.radius*(wound/10) ,wound,0,2*Math.PI,false);
        //                     ctx.fill();
        //     }



    }
    
    hitByZapper () {
        this.health--;
        // console.log("hitting mushroom:"+ this.health );

        this.game.incrementScore(10);
        if (this.health === 0) {
            this.game.removeEntity(this);

            // console.log("destroyed mushroom");
            this.game.incrementScore(50);
            // this.game.removeEntity(this);
            return; 

        } 

    }




    collisonDetection(entity) {
        if (entity instanceof BugZapper) {
            entity.pos[0] -= entity.vel[0];
            entity.pos[1] -= entity.vel[1];
            console.log("currently collat with mushrooms");

        }
        // if(entity instanceof Bullet){
        //     this.hitByZapper();
        // }
    }

}


export default Mushrooms;

