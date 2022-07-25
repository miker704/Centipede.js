
// this class main purpose is to handle the player/ bugzapper
//controls 



class GameView {

    constructor(game, ctx) {
        this.game = game;
        this.ctx = ctx;
        this.x_Coord = this.game.zapper.pos[0];
        this.y_Coord = this.game.zapper.pos[1];

        this.x = this.game.zapper.pos[0];
        this.y = this.game.zapper.pos[1];
        // this.animation;

        console.log("constructor call : ")
        console.log("this.xCoord pos : ", this.x_Coord);
        console.log("this.YCoord pos : ", this.y_Coord);
        console.log("this.x pos : ", this.x);
        console.log("this.Y pos : ", this.y);
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
   

    listenToKeyboardNMouseEvents() {




        // document.addEventListener("keydown", this.keyDownHandler.bind(this));
        // document.addEventListener("keyup", this.keyUpHandler.bind(this));

        // const gameCanvas = document.getElementById("game-canvas");
        // gameCanvas.addEventListener("mousemove", this.mouseMoveHandler.bind(this));
        // gameCanvas.addEventListener("mousedown", this.mouseDownHandler.bind(this));
        // gameCanvas.addEventListener("mouseup", this.mouseUpHandler.bind(this));
        // gameCanvas.addEventListener("click", this.handleClick.bind(this));


        //cut
        const defaultStartingpostion = [300, 576];


        const gameCanvas = document.getElementById("game-canvas");

        //lock the mouse to the canvas to prevent the following problems
        // 1). click an drag of canvas
        //2). mouse moving out of canvas and highlighting app text and clicking thing outside the window
        //3). clicking escape will free the mouse 
        gameCanvas.requestPointerLock = gameCanvas.requestPointerLock || gameCanvas.mozRequestPointerLock;

        document.exitPointerLock = document.exitPointerLock || document.mozExitPointerLock;


        // if (gameCanvas.requestPointerLock) {
        //     console.log("pointer lock intialized ");
        // }
        // else if (gameCanvas.mozRequestPointerLock) {
        //     console.log("moz pointer lock intialized ");

        // }

        gameCanvas.onclick = function () {
            gameCanvas.requestPointerLock();
        }




        document.addEventListener("pointerlockchange", this.lockChangeAlert.bind(this), false);
        document.addEventListener("mozpointerlockchange", this.lockChangeAlert.bind(this), false);
        // document.addEventListener("pointerlockchange", lockChangeAlert, false);
        // document.addEventListener("mozpointerlockchange", lockChangeAlert, false);


        document.addEventListener("keydown", this.keyDownHandler.bind(this));
        document.addEventListener("keyup", this.keyUpHandler.bind(this));



        // gameCanvas.addEventListener("mousemove", this.mouseMoveHandler.bind(this));
        gameCanvas.addEventListener("mousedown", this.mouseDownHandler.bind(this));
        gameCanvas.addEventListener("mouseup", this.mouseUpHandler.bind(this));
        // gameCanvas.addEventListener("click", this.handleClick.bind(this));


    }



    lockChangeAlert(e) {
     

        const gameCanvas = document.getElementById("game-canvas");

        if (document.pointerLockElement === gameCanvas || document.mozPointerLockElement === gameCanvas) {
            // console.log("the pointer lock status is now achieved");
            // document.addEventListener("mousemove")
            document.addEventListener("mousemove", this.mouseMoveHandler.bind(this), false);
            // gameCanvas.addEventListener("mousedown", this.mouseDownHandler.bind(this));
            // gameCanvas.addEventListener("mouseup", this.mouseUpHandler.bind(this));
        }
        else {
            // console.log("the pointer lock is now disengaged ");
            document.removeEventListener("mousemove", this.mouseMoveHandler.bind(this), false);

        }
    }



    handleClick(e) {
        if (!this.game.lives) {
            this.game.zapper && this.game.zapper.zapperBarrell.stopFiringZapper();
            // console.log(this.game.startGame)
            this.game.reset();
            // console.log(this.game.startGame)
        }
        else {
            this.game.zapper.zapperBarrell.startFiringZapper();
        }
    }

    mouseMoveHandler(e) {

        // console.log("calling mouse move handler : ");


        if (!this.game.AllMushrooms) {
            return;
        }

        //  let mousePosition = [e.clientX-4 , e.clientY - 100];
        // let mousePosition = [e.clientX - 100, e.clientY - 4];
        // let mousePositon = [e.clientX, e.clientY];
        // this.game.zapper.pos[0] = e.clientX;
        // this.game.zapper.pos[1] = e.clientY;
        // this.game.zapper.pos[0] -=gameCanvas.offSetLeft;
        // this.game.zapper.pos[1] -= gameCanvas.offSetTop;
        // let mousePosition = [e.clientX, e.clientY];
        // pos: [300, 36 + ((Game.DIM_Y-36)*3/4) ],
        let canvas = document.getElementById("game-canvas");
        // var relativeX = e.clientX - canvas.offsetLeft;
        // if(relativeX > 0 && relativeX < canvas.width) {
        //   this.game.zapper.pos[0] = relativeX;
        // }


        //this is the orginal movement
        // let x = e.clientX;
        // let y = e.clientY;
        // x -= canvas.offsetLeft;
        // y -= canvas.offsetTop;


        const startingPos = this.game.zapper.pos;
        // console.log("starting pos : ", startingPos);
        // console.log("this.xCoord pos : ", this.x_Coord);
        // console.log("this.YCoord pos : ", this.y_Coord);


        // let x = e.movementX;
        // let y = e.movementY;
        // let x = this.game.zapper.pos[0];
        // let y = this.game.zapper.pos[1];


        // x += e.movementX;
        // y += e.movementY;

        // this.x = this.game.zapper

        // this.x = this.game.zapper.pos[0];
        // this.y = this.game.zapper.pos[1];

        this.x += e.movementX;
        this.y += e.movementY;
        // this.game.zapper.pos [0]+= e.movementX;
        // this.game.zapper.pos [1]+= e.movementY;


        //  this.x -= canvas.offsetLeft;
        //  this.y -= canvas.offsetTop;




        console.log("this.X, this.Y - coord: ", this.x, this.y);
        // console.log("this.Y - coord: ", this.y);


        // console.log("X - coord: ", x);
        // console.log("Y - coord: ", y);
        // console.log("e.clientX - coord: ", e.clientX);
        // console.log("e.clientY - coord: ", e.clientY);

        // console.log("e.movementX - coord: ", e.movementX);
        // console.log("e.movementY - coord: ", e.movementY);

        // console.log("mX - coord: ", mx);
        // console.log("mY - coord: ", my);

        console.log("bugzapper pos : ", this.game.zapper.pos);


        // console.log("bugzapper radius : ", this.game.zapper.radius);
        // console.log("canvas height: ", canvas.height);
        // console.log("canvas width: ", canvas.width);


        // if(this.x > canvas.width + this.game.zapper.radius){
        //     this.x = (-this.game.zapper.radius);
        // }
        // if(this.y > canvas.height + this.game.zapper.radius ){
        //     this.y = (-this.game.zapper.radius);

        // }
        // if(this.x < (-this.game.zapper.radius)){
        //     this.x = canvas.height + this.game.zapper.radius;

        // }
        // if(this.y < (-this.game.zapper.radius)){
        //     this.y = canvas.height + this.game.zapper.radius;

        // }



        if (this.x + this.game.zapper.radius > 600) {
            this.x = 600 - this.game.zapper.radius;
            // this.game.zapper.vel[0] = this.game.zapper.vel[0] < 0 ? this.game.zapper.vel[0] : 0;

        }
        if (this.y + this.game.zapper.radius > 756) {
            this.y = 756 - this.game.zapper.radius;
            // this.game.zapper.vel[1] = this.game.zapper.vel[1] < 0 ? this.game.zapper.vel[1] : 0;

        }
        if (this.x - this.game.zapper.radius < 0) {
            this.x = this.game.zapper.radius + 0;
            // this.game.zapper.vel[0] = this.game.zapper.vel[0] > 0 ? this.game.zapper.vel[0] : 0;

            //toplimit = 516
        }
        if (this.y - this.game.zapper.radius < 516) {
            this.y = 516 + this.game.zapper.radius;
            // this.game.zapper.vel[1] = this.game.zapper.vel[1] > 0 ? this.game.zapper.vel[1] : 0;


        }









        // if (this.x > canvas.width + this.game.zapper.radius) {
        //     this.x = (this.game.zapper.radius);
        // }
        // if (this.y > canvas.height + this.game.zapper.radius) {
        //     this.y = (this.game.zapper.radius);

        // }
        // if (this.x < 0) {
        //     this.x = canvas.height + this.game.zapper.radius;

        // }
        // if (this.y < 0) {
        //     this.y = canvas.height + this.game.zapper.radius;

        // }







        let collison = this.game.AllMushrooms.some(
            (mushroom) => {
                return mushroom.hasCollisonOccured({
                    // pos: mousePosition,
                    pos: [this.x, this.y],

                    radius: this.game.zapper.radius
                });
            }
        );

        if (!collison) {
            this.game.zapper.pos = [this.x, this.y];
        }

        // let animation;

        // if(!animation){
        //     animation = requestAnimationFrame(function(){
        //         console.log("animation call:");
        //         animation = null;
               
        //         this.redraw.bind(this);

        //     })
        // }
        






        ///NORMAL
        // let mousePosition = [e.clientX, e.clientY];

        // let collison = this.game.AllMushrooms.some(
        //     (mushroom) => {
        //         return mushroom.hasCollisonOccured({
        //             // pos: mousePosition,
        //             pos: [x, y],

        //             radius: this.game.zapper.radius
        //         });
        //     }
        // );

        // if (!collison) {
        //     this.game.zapper.pos = [x, y];
        // }


        // this.game.draw(this.ctx);

    }


    // mouseMoveHandler2(e){
    //     window.addEventListener('mousemove', function (e) {
    //         myGameArea.x = e.pageX;
    //         gameCanvas.y = e.pageY;
    //     })
    // }




    updateGameArea() {

    }



    mouseDownHandler(e) {

        // e.preventDefault();
        // console.log("mouseDOWNhandler called : ");
        // console.log("# of lives : ", this.game.lives);

        if (!this.game.lives || this.game.lives <= 0) {
            // console.log("mouseUpdown gameover called : ");

            this.game.zapper && this.game.zapper.zapperBarrell.stopFiringZapper();
            // console.log(this.game.startGame)
            this.game.reset();
            // this.game.startGame=true;
            // console.log(this.game.startGame)
        }
        else {
            // console.log("firezapper:");
            this.game.zapper.zapperBarrell.startFiringZapper();
        }
    }

    mouseUpHandler(e) {

        // console.log("mouseUphandler called : ");
        this.game.zapper.zapperBarrell.stopFiringZapper();
    }



    keyDownHandler(e) {

        e.preventDefault();

        switch (e.which) {


            case 13: // enter - > fire

                //check if the game is over player cannot fire zapper
                if (!this.game.lives) {
                    this.game.zapper && this.game.zapper.zapperBarrell.stopFiringZapper();
                    this.game.reset();
                }
                else {
                    this.game.zapper.zapperBarrell.startFiringZapper();
                    // console.log("fired zapper");
                }
                break;

            case 32: // space bar  - > fire

                //check if the game is over player cannot fire zapper
                if (!this.game.lives) {
                    this.game.zapper && this.game.zapper.zapperBarrell.stopFiringZapper();
                    this.game.reset();
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