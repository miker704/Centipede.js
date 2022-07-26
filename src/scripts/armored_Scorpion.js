import MovingObject from "./movingObject";
import Util from "./utils";




class ArmoredScorpion extends MovingObject {
    constructor(options){
        super(
            {
                pos: options.pos,
                radius: 36,
                vel: [0,0],
                color: Util.randomColors(),
                game: options.game
            }
        )
    }
}





export default ArmoredScorpion;