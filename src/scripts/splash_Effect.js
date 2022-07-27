import MovingObject from "./movingObject.js";
import Util from "./utils.js";


//add splash effect when shooting at things


class SplashEffect extends MovingObject {

    constructor(options) {
        super(
            {
                pos: options.pos,
                game: options.game,
                vel: options.vel,
                radius: 3,
                color: Util.randomColors()

            }
        )
        this.gravitation = true;

    }




}

export default SplashEffect;