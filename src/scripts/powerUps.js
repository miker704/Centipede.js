
import BugZapper from "./bugZapper.js";
import MovingObject from "./movingObject.js";
import Util from "./utils.js";

// there will be 6 power ups 
// life up, stronger bullets/faster fire/ missle/bomb
// slow down , shield, wipeout, remove posiom mushrooms, more barrels

class PowerUps extends MovingObject {

    constructor(options) {

        super(
            {
                pos: options.pos,
                // pos: [60, 500],
                game: options.game,
                vel: options.vel,
                radius: 8,
                color: options.color
            }
        );
        this.gravitation = true;
        this.powerUpAtrribute = options.powerUpAtrribute;
        this.powerUpEffect = options.powerUpEffect;

        this.typeOfPowerUp = options.typeOfPowerUp;
        this.powerUpName = options.powerUpName;


        this.powerUpProps = {
            Attributes: [],
            Effects: []
        }

        this.powerUpAttributes = {
            'FasterFireRate': ["speed", "fireRate"],
            'Splay': ["speed", "fireRate"],
            'Spread': ["number"],
            'Barrell': ["number"]
        }
        this.powerUpEffects = {
            'FasterFireRate': [10, 100],
            'Splay': [10, 100],
            'Spread': [4],
            'Barrell': [1]
        }



    }

    activatePowerup(typeOfPowerUp, powerUpName) {
        console.log("power up activation called");
        switch (typeOfPowerUp) {

            case "zapperEffect":

                switch (powerUpName) {
                    case 'FasterFireRate':
                        return this.powerUpProps;
                    case 'Spread':
                        return this.powerUpProps;

                    case 'Barrell':
                        return this.powerUpProps;

                    case 'Splay':
                        this.game.unlockSplay();
                        return this.powerUpProps;
                    default:
                        return null;
                }


            case "gameEffect":
                switch (powerUpName) {
                    case 'ExtraLife':
                        return this.game.addLifeViaPowerUp();
                    case 'Shield':
                        return this.game.giveShield();
                    case 'ClearPoisonMushrooms':
                        return this.game.clearPoisonMushrooms();
                    case 'Wipeout':
                        return this.game.wipeOutPowerUp();
                    default:
                        return null;
                }


            default:
                return null;

        }

    }

    applyWeaponPowerUp(powerUpName) {

        // this.powerUpAttributes = {
        //     'FasterFireRate':["speed","fireRate"],
        //     'Splay':["speed","fireRate"], 
        //     'Spread':["number"], 
        //     'Barrell':["number"]
        // }
        // this.powerUpEffects = {
        //     'FasterFireRate':[10, 100],
        //     'Splay':[10, 100], 
        //     'Spread':[4], 
        //     'Barrell':[1]
        // }
        let effects = Object.values(this.powerUpEffects[powerUpName]);
        let attributes = Object.values(this.powerUpAttributes[powerUpName]);
     

        for (let i = 0; i < attributes.length; i++){
            console.log("pairs",attributes[i],effects[i]);

            this.game.zapper.zapperBarrell[attributes[i]]+=effects[i];
            console.log("zapperbarrel props : ", this.game.zapper.zapperBarrell )

            if(attributes[i] === 'number'){
                setTimeout(function(){
                    this.game.zapper.zapperBarrell[attributes[i]]-=effects[i];
                    console.log("removed power")
                }.bind(this),20000)
            }


        }


    }



    move() {
        this.bounciness();
        super.move();
        this.hasCollisonOccured(this.game.zapper);

    }

    collisonDetection(entity) {

        if (entity instanceof BugZapper) {
            console.log("collison with powerup")

            if (this.typeOfPowerUp === 'gameEffect') {
                console.log("hello")
                this.activatePowerup(this.typeOfPowerUp, this.powerUpName);
            }
            else if (this.typeOfPowerUp === 'zapperEffect') {
                // entity.zapperBarrell[]
                // this.activatePowerup(this.typeOfPowerUp, this.powerUpName);
                this.applyWeaponPowerUp(this.powerUpName);
                // let effects = Object.values(this.powerUpProps["Effects"]);
                // let atrributes = Object.values(this.powerUpProps["Attributes"]);
                // console.log("effects: ", effects);
                // console.log("attributes: ", atrributes);
                // if(this.powerUpName === 'Splay'){
                //     this.game.unlockSplay();
                // }


            }


        }



    }



}




export default PowerUps;