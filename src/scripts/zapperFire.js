import Bullet from "./bullet";

class ZapperFire {

    constructor (options) {
        this.fireRate = options.fireRate;
        this.speed = options.speed;
        this.number = options.number;
        this.bugZapper = options.bugZapper;;
        this.game = options.game;

    }

    fireZapper(){
        let zapPositon = [this.bugZapper.pos[0],this.bugZapper.pos[1]-this.bugZapper.radius/8];
        let zapAngle = (Math.PI - 0.1 *(this.number-1))/2;

        for(let i=0; i<this.number;i++){
            let zapX = this.speed * Math.cos(zapAngle);
            let zapY = (-this.speed) * Math.sin(zapAngle);
            zapAngle+=0.1;
            this.game.allBullets.push(new Bullet({
                game: this.game,
                pos: zapPositon.slice(),
                vel : [zapX,zapY],
                splayable: (Math.random() > 0.99 ? true : false)

            }));
        }

        this.game.sfx.fire();

    }

    startFiringZapper(){
        if(!this.zapDelay){
            this.fireZapper();
            this.zapDelay = setInterval(this.fireZapper.bind(this),this.fireRate);
            
        }
    }

    stopFiringZapper(){
        clearInterval(this.zapDelay);
        this.zapDelay = null;
    }

}


export default ZapperFire;