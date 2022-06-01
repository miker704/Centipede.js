import Game from "./game";



class MovingObject {
    constructor (options) {
        this.pos = options.pos;
        this.vel = options.vel;
        this.radius = options.radius;
        this.color = options.color;
        this.game = options.game;


    }

    draw (ctx) {
        ctx.beginPath();
        ctx.arc(this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.stroke();
    }

    move () {
        this.pos[0] += this.vel[0];
        this.pos[1] += this.vel[1];
        // console.table(this.pos);
        // this.gravityForce && this.gravity();
        // add outofbounds and remove function
        // if(this.game.outOfBounds(this.pos)===true){
        //     this.game.removeEntity(this);
        // }


    }

    // collisonDetection () { } // classes will define their own
    //function to confirm true or false if a collison of some sort has occuried
    //if the distance of two object meet or are close enough to where their hitboxes
    //aka radius of each object is greater than  the distance between them them 
    // a collat has occured 
    // hasCollisonOccured (entity) {
    //     let xCoord = this.pos[0] - entity.pos[0];
    //     let yCoord = this.pos[1] - entity.pos[1];
    //     let dist = Math.sqrt(Math.pow(xCoord, 2) + Math.pow(yCoord, 2));
    //     return dist < (this.radius + this.entity.radius) ? true : false;
    // }

    // if something is hit by the bug zapper send it to the game remove function
    // hitByZapper () {
    //     this.game.removeEntity(this);
    // }

    // alter the velocity of a entity with some gravity force where they drop down 
    // gravity () {
    //     //this.accel || 0.2;
    //     this.vel[1] += this.accel || 0.1;

    // }

    // if something hits the wall at a certain velocity bounce them back
    // bounciness () {
    //     let newX_coord = this.pos[0] + this.vel[0];
    //     if (newX_coord > Game.DIM_X || newX_coord < 0) {
    //         this.vel[0] *= -1;
    //     }
    // }

}



export default MovingObject;
