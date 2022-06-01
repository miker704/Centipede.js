



// this class main purpose is to handle the player/ bugzapper
//controls 

class GameView {

    constructor (game, ctx) {
        this.game = game;
        this.ctx = ctx;
       

    }


    start () {
        this.listenToKeyboardNMouseEvents();
        // this.game.moveStuff();
        this.game.draw(this.ctx);

        setInterval( function(){
           this.game.moveStuff();
           this.game.draw(this.ctx); 
        }.bind(this),20);

    }

    bindKeyHandlers () {

    }

    listenToKeyboardNMouseEvents () {

        const that = this;
      document.addEventListener("keydown",this.keyDownHandler.bind(this));
      document.addEventListener("keyup",this.keyUpHandler.bind(this));


    }
    
        
     keyDownHandler (e) {
        // document.keydown(function (event) {
        
            // e.preventDefault();
            console.log("keydownhandler being accessed");
        
            switch (e.which) {
        
                // case 32: // space button fire zapper
                // if(that.game.lives !==0){
                //     that.game.playerBugZapper[0]
                // }
                
                case 32: // space bar  - > fire
           
                //check if the game is over player cannot fire zapper
                if(this.game.gameOver()===true){
                    this.game.zapper.zapperBarrell.stopFiringZapper();
                }
                else{               
                this.game.zapper.zapperBarrell.startFiringZapper(); 
                console.log("fired zapper");
                }
                break;


                case 37: // left
                    if (!this.game.zapper) { return; }
                    console.log(this.game.zapper.pos);
                    this.game.zapper.power([-1, 0]);
                    console.log("move left")
                    break;
        
                case 38: // up
                    if (!this.game.zapper) { return; }
                    console.log(this.game.zapper.pos);
                    this.game.zapper.power([0, -1]);
                    console.log("move up")
                    break;
        
                case 39: // right
                    if (!this.game.zapper) { return; }
                    console.log(this.game.zapper.pos);
                    this.game.zapper.power([1,0]);
                    console.log("move right")
                    break;
        
                case 40: // down
                    if (!this.game.zapper) { return; }
                    console.log(this.game.zapper.pos);
                    this.game.zapper.power([0, 1]);
                    console.log("move down")
                    break;
        
                default:
                    return;
        
        
            }

    }
// 
//  keyDownHandler(e) {
//     if(e.key == "Right" || e.key == "ArrowRight") {
//         rightPressed = true;
//         console.log(this.game.zapper.pos);
//          this.game.zapper.power([1,0]);
//         console.log("move right")
//     }
//     else if(e.key == "Left" || e.key == "ArrowLeft") {
//         // leftPressed = true;
//         // this.game.playerBugZapper[0].power([-1, 0]);
//         console.log(this.game.zapper.pos);
//          this.game.zapper.power([-1,0]);
//         console.log("move left")
//     }


// }

//  keyUpHandler(e) {
//     if(e.key == "Right" || e.key == "ArrowRight") {
//         rightPressed = false;
//     }
//     else if(e.key == "Left" || e.key == "ArrowLeft") {
//         leftPressed = false;
//     }
// }

    keyUpHandler(e){
        console.log("keyUpHandler is being accessed");
        switch(e.which){
            case 32: // space bar is no longer pressed
            if (!this.game.zapper) { return; }
            //import function to firebullets
            this.game.zapper.zapperBarrell.stopFiringZapper();
            break;
            default:
                return;
        }

    }
    
    
}



export default GameView;