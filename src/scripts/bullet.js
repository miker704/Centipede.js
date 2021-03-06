import MovingObject from "./movingObject.js";
import Util from "./utils.js";
import Spider from "./spider.js";
import Mushrooms from "./mushrooms.js";
import Centipede from "./centipede.js";
import Flea from "./flea.js";
import Scorpion from "./scorpion.js";


class Bullet extends MovingObject {
    constructor(options) {


        super({

            pos: options.pos,
            vel: options.vel,
            game: options.game,
            radius: Bullet.RADIUS,
            color: '#FFFFFF'

        });



    }

    //check if the bullet collides with some destroyable entity
    collisonDetection(entity) {

        if (entity instanceof Mushrooms ||
            entity instanceof Spider ||
            entity instanceof Centipede ||
            entity instanceof Scorpion ||
            entity instanceof Flea) {
       
            entity.hitByZapper(); // call to remove entity
            this.game.removeEntity(this); // remove the bullet from the game 
        }

    }

}


Bullet.SPEED = 15;
Bullet.RADIUS = 5;


export default Bullet;