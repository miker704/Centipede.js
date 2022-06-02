
// this class main purpose is to handle the player/ bugzapper
//controls 



class GameView {

    constructor(game, ctx) {
        this.game = game;
        this.ctx = ctx;


    }


    start() {
        this.listenToKeyboardNMouseEvents();
        this.game.draw(this.ctx);

        setInterval(function () {
            // this.game.moveStuff();
            // this.game.checkCollisons();
            this.game.gamefieldSetUp();
            this.game.draw(this.ctx);
        }.bind(this), 20);

    }

    bindKeyHandlers() {

    }

    listenToKeyboardNMouseEvents() {

        const that = this;
        document.addEventListener("keydown", this.keyDownHandler.bind(this));
        document.addEventListener("keyup", this.keyUpHandler.bind(this));
        // document.addEventListener("mousemove", this.mouseMoveHandler.bind(this));
        // document.addEventListener("mousedown", this.mouseDownHandler.bind(this));
        // document.addEventListener("mouseup", this.mouseUpHandler.bind(this));
        const gameCanvas = document.getElementById("game-canvas");

        gameCanvas.addEventListener("mousemove", this.mouseMoveHandler.bind(this));
        gameCanvas.addEventListener("mousedown", this.mouseDownHandler.bind(this));
        gameCanvas.addEventListener("mouseup", this.mouseUpHandler.bind(this));




    }


    handleClick(){
        if (!this.game.lives) {
            that.game.zapper && this.game.zapper.zapperBarrell.stopFiringZapper();
            that.game.reset();
        }
        else {
            this.game.zapper.zapperBarrell.startFiringZapper();
            // console.log("fired zapper");
        }
    }

    mouseMoveHandler(e) {
        if (!this.game.AllMushrooms) {
            return;
        }

        // let mousePositon = [e.clientX - 510, e.clientY - 60];
     
        let mousePositon = [e.clientX, e.clientY];


        let collison = this.game.AllMushrooms.some(
            (mushroom) => {
                return mushroom.hasCollisonOccured({
                    pos: mousePositon,
                    radius: this.game.zapper.radius
                });
            }
        );

        if (!collison) {
            this.game.zapper.pos = mousePositon;
        }
    }

    mouseDownHandler(e) {
        if (!this.game.lives) {
            this.game.zapper && this.game.zapper.zapperBarrell.stopFiringZapper();
            this.game.reset();
        }
        else {
            this.game.zapper.zapperBarrell.startFiringZapper();
        }
    }

    mouseUpHandler(e) {
        this.game.zapper.zapperBarrell.stopFiringZapper();
    }



    keyDownHandler(e) {

        e.preventDefault();

        switch (e.which) {


            case 33: // enter - > fire

            //check if the game is over player cannot fire zapper
            if (!this.game.lives) {
                that.game.zapper && this.game.zapper.zapperBarrell.stopFiringZapper();
                that.game.reset();
            }
            else {
                this.game.zapper.zapperBarrell.startFiringZapper();
                // console.log("fired zapper");
            }
            break;

            case 32: // space bar  - > fire

                //check if the game is over player cannot fire zapper
                if (!this.game.lives) {
                    that.game.zapper && this.game.zapper.zapperBarrell.stopFiringZapper();
                    that.game.reset();
                }
                else {
                    this.game.zapper.zapperBarrell.startFiringZapper();
                    // console.log("fired zapper");
                }
                break;


            case 37: // left
                if (!this.game.zapper) { return; }
                // console.log(this.game.zapper.pos);
                this.game.zapper.power([-1, 0]);
                // console.log("move left")
                break;

            case 38: // up
                if (!this.game.zapper) { return; }
                // console.log(this.game.zapper.pos);
                this.game.zapper.power([0, -1]);
                // console.log("move up")
                break;

            case 39: // right
                if (!this.game.zapper) { return; }
                // console.log(this.game.zapper.pos);
                this.game.zapper.power([1, 0]);
                // console.log("move right")
                break;

            case 40: // down
                if (!this.game.zapper) { return; }
                // console.log(this.game.zapper.pos);
                this.game.zapper.power([0, 1]);
                // console.log("move down")
                break;


            case 65: // A left
                if (!this.game.zapper) { return; }

                this.game.zapper.power([-1, 0]);

                break;
            case 68: // D right
                if (!this.game.zapper) { return; }
                this.game.zapper.power([1, 0]);
                break;

            case 83: // S down
                if (!this.game.zapper) { return; }

                this.game.zapper.power([0, 1]);

                break;

            case 87: // W up
                if (!this.game.zapper) { return; }

                this.game.zapper.power([0, -1]);

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

    keyUpHandler(e) {
        // console.log("keyUpHandler is being accessed");
        e.preventDefault();
        switch (e.which) {
            case 13: // enter is no longer pressed
                if (!this.game.zapper) { return; }
                //import function to firebullets
                this.game.zapper.zapperBarrell.stopFiringZapper();
                break;

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