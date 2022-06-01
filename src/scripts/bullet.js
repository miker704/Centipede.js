import MovingObject from "./movingObject.js";
import Util from "./utils.js";




class Bullet extends MovingObject {
    constructor (options) {

        // this.pos = options.pos;
        // this.vel = options.vel;
        // this.radius = Bullet.RADIUS;
        // // this.color = Util.randomColors();
        // this.color = '#FFFFFF';
        // this.game = options.game;
        // MovingObject.call(this, options);

        // MovingObject.call(this, {
        //     pos: options.pos,
        //     vel: options.vel,
        //     game: options.game,
        //     radius: Bullet.RADIUS,
        //     color: '#FFFFFF'
        // });

        super({

            pos: options.pos,
            vel: options.vel,
            game: options.game,
            radius: Bullet.RADIUS,
            color: '#FFFFFF'

        });



    }

    //check if the bullet collides with some destroyable entity
    // bulletCollidedWith (entity) {

    //     if (entity instanceof Spider ||
    //         entity instanceof Mushroom ||
    //         entity instanceof Centipede ||
    //         entity instanceof Scorpion ||
    //         entity instanceof Flea) {
    //         entity.hitByZapper(); // call to remove entity
    //         this.game.removeEntity(this); // remove the bullet from the game 
    //     }

    // }

}


// function Bullet (options) {
//     MovingObject.call(this, {
//         pos: options.pos,
//         vel: options.vel,
//         game: options.game,
//         radius: Bullet.RADIUS,
//         color: '#FFFFFF'
//     });
// }


Bullet.SPEED = 15;
Bullet.RADIUS = 2;
// Util.inherits(Bullet, MovingObject);


export default Bullet;