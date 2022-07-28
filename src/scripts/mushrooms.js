
import BugZapper from "./bugZapper.js";
import Bullet from "./bullet.js";
import MovingObject from "./movingObject.js"
import PowerUps from "./powerUps.js";
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
        this.damage = [];
        this.health = 4;
        this.poisoned = false;
    }


    // if the mushroom is poisoned it should become purple
    isPoisoned() {
        return this.poisoned;
    }

    // when a scorpion collides with a mushhroom it becomes
    //poisoned
    poisonMushroom() {
        // this.color = '#800080';
        this.poisoned = true;
    }


    draw(ctx) {
        //poison colors
        var mgrd = ctx.createRadialGradient(this.pos[0] + 1, this.pos[1] + 1, this.radius / 2, this.pos[0], this.pos[1], this.radius);
        mgrd.addColorStop(0, "#9D00FF");
        //#9063CD   #C724B1    #9D00FF
        mgrd.addColorStop(0.6, "#2E1A47");



        ctx.fillStyle = this.isPoisoned() ? mgrd : this.color;
        //create the the mushroom stem
        let mushroomStem = 8;
        ctx.fillRect(this.pos[0] - mushroomStem / 2, this.pos[1] - this.radius / 2, mushroomStem, this.radius * 1.5);

        //create the mushroom cap
        ctx.beginPath();
        ctx.ellipse(this.pos[0], this.pos[1] - this.radius / 2, this.radius, this.radius / 2, 0, 0, 2 * Math.PI, false);
        ctx.fill();
        // ctx.stroke();

        // check if the mushroom is at full health
        if (this.health === 4) {
            return;
        }

        ctx.fillStyle = '#000000';
        let wound = (6 - (4 / 2));
        for (let i = 0; i < 4 - this.health; i++) {

            while (this.damage.length < i + 1) {
                this.damage.push(Math.random() * this.radius * 1.5 + this.pos[0] - this.radius * (3 / 4));
            }

            ctx.beginPath();
            ctx.arc(this.damage[i], this.pos[1] - this.radius * (0.90-0.0555555*(wound)), wound, 0, 2 * Math.PI, false);
            ctx.fill();
        }



    }

    hitByZapper() {



        
        this.game.addSparks(
            {
                pos: this.pos.slice(),
                amount: 8,
                color: this.color
            }
        );

        this.game.incrementScore(10);


        if (this.health === 0) {

           if(Math.random() > 0.9){
            this.game.addPowerUp(this.pos.slice());
           }


            this.game.removeEntity(this);

            if (this.poisoned === true) {
                this.game.incrementScore(100);
            }
            else {
                this.game.incrementScore(50);
            }
            

        }
        else {
            this.health--;
        }
        this.color = Util.randomColors();
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

