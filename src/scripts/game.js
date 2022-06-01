import Mushrooms from "./mushrooms.js";
import Centipede from "./centipede.js";
import Spider from "./spider.js";
import Flea from "./flea.js";
import Scorpion from "./scorpion.js";
import Bullet from "./bullet.js";
import BugZapper from  "./bugZapper.js";




class Game {

    constructor () {
        // this.splitGameCanvas();
        this.AllMushrooms = [];
        this.level = 1;
        this.lives = 3;
        this.score = 0;
        // array of mushrooms should be a random number
        //erry time
        //rename to a non constant
        // fleas , spiders, and ventipedes array  
        //mushrooms are static so they shuld be placed in a 
        // random postion like the asteroids but they dont move
        // should be game bound as they only apppear within
        // dimensions of the game screen canvas
        this.playerBugZapper =[];
        this.allSpiders = [];
        this.allFleas = [];
        this.allCentipedes = [];
        this.allScorpions = [];
        this.allBullets = [];
        this.addStartingShrooms();
        // this.addBugZapper();
        this.addSpider();

        this.zapperStart = [250,572];
        // this.bugZapper = new BugZapper({
        //     // pos: [250,572],
        //     game: this

        // });
        this.zapper = new BugZapper({
            pos: [250,572],
            game: this,
          });
  


    }


    //need to split the game canvas into sections to 
    // allow proper orgranization of game stats 
    // and avoid placing mushrooms on exactly on top 
    // of each other 
    // the game needs to split into 3 areas
    // score table
    // game area - which has two sections forest and player area
    // player area is where the player can move through

    splitGameCanvas () {

        // this.scoreTable_DIMX= Game.DIM_X;
        // this.scoreTable_DIMY - ;
        this.setSquareSize();
        this.xDim = 25 * this.squareSize;
        this.yStart = 1.5 * this.squareSize;
        this.yDim = this.yStart + 30 * this.squareSize;
        this.yEnd = this.yDim;
        this.xStart = (this.xDim / 2) - 12.5 * this.squareSize;
        this.xEnd = (this.xDim / 2) + 12.5 * this.squareSize;
        // Game.DIM_X= this.xDim;
        // Game.DIM_Y = this.yDim;
        console.log("xDim " + this.xDim);
        console.log("yDim " + this.yDim);
        console.log("xstart " + this.xStart);
        console.log("ystar " + this.yStart);
        console.log("xend " + this.xEnd);
        console.log("yend " + this.yEnd);
        console.log(this.squareSize);
        console.log(this.squareSize);


    }
    setSquareSize = function () {
        // var xSpace = window.innerWidth - 540;
        // var ySpace = window.innerHeight - 80;
        var xSpace = window.innerWidth;
        var ySpace = window.innerHeight;


        console.log("game x " + Game.DIM_X);
        console.log("game y " + Game.DIM_Y);
        console.log("game xSpace " + xSpace);
        console.log("game ySpace " + ySpace);


        var yLimitedSize = Math.floor(ySpace / 30);
        var xLimitedSize = Math.floor(xSpace / 25);
        this.squareSize = Math.min(24, yLimitedSize, xLimitedSize);
    };
    //Begining of Level Rendering Functions



    




    addStartingShrooms () {
        for (let i = 0; i < Game.NUM_OF_MUSHROOMS; i++) {
            // console.log("starting pushing mushrooms into array");

            this.AllMushrooms.push(new Mushrooms(this.randomPosition()));
        }
    }

    // addBugZapper(){
    //     this.playerBugZapper.push(new BugZapper({
    //         pos: [250,572],
    //         game: this,
    //       }));
    //     // let pos = [250,250]
    //     //  this.playerBugZapper.push(new BugZapper(this.randomPosition()));

    // }

    addSpider(){
        for(let i=0; i<6; i++){
            // console.log("creating spiders");
            this.allSpiders.push(
                new Spider({pos:this.randomPosition()})
                );
        }
    }

    draw (ctx) {

        // ctx.clearRect(0, 0, this.xEnd, this.yEnd);
        // ctx.clearRect(0, 0, 500, 750);

        // ctx.fillStyle = "#444444";
        // // ctx.fillRect(0, 0, this.xEnd, this.yStart);
        // ctx.fillRect(0, 0, 500, 36);
        // ctx.fillStyle = "#22ff22";
        // ctx.font = this.squareSize + "pt Arial ";
        // ctx.textAlign = 'center';

        let playerStats = "Score: " + this.score + "      " + "Level: " + this.level;
        playerStats += "      " + "Lives: " + this.lives;
       


        ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
        ctx.fillStyle = Game.BackGroundColor;
        ctx.fillRect(0, 0, Game.DIM_X, Game.DIM_Y);
        // ctx.fillRect(0,36,500-0,750-36);
        ctx.fillStyle = "#444444";
        // ctx.fillRect(0, 0, this.xEnd, this.yStart);
        ctx.fillRect(0, 0, 500, 36);
        // ctx.fillStyle = "#22ff22";
        ctx.fillStyle = "#FFFFFF";
        ctx.font = 24 + "pt Serif ";
        ctx.textAlign = 'center';
        ctx.fillText(playerStats, 0.50 * (500 - 0), 1.25 * 24);



        // console.log("starting drawing mushrooms");
        for (let i = 0; i < Game.NUM_OF_MUSHROOMS; i++) {
            this.AllMushrooms[i].drawMushrooms(ctx);
        } 

        // console.log("starting drawing spiders");
        for (let i = 0; i < this.allSpiders.length; i++) {
            this.allSpiders[i].drawSpider(ctx);
        } 


        //  this.playerBugZapper[0].drawBugZapper(ctx)
        this.zapper.drawBugZapper(ctx);
        console.log("starting drawing bullets");

        for (let i = 0; i < this.allBullets.length; i++) {
            this.allBullets[i].draw(ctx);
        } 
    }

    randomPosition () {

        return [Math.floor(Math.random() * 400), Math.floor(Math.random() * 400)];
    };
    // shows lives, score and level 
    showPlayerInfo () {

    }

    // these are to add entities in the middle of play that spawn by game actions
    // such as breaking a centipede, mushroom spawns from centipede destroyed/ scorpion
    // changing a mushroom to be poisoned or fleas arrive to spawn mushrooms
    addEntities (object) {
        if (object instanceof Centipede) {
            this.allCentipedes.push(object);
        }
        else if (object instanceof Mushrooms) {
            this.AllMushrooms.push(object);
        }
        else {
            this.allBullets.push(object);
        }
    }

    moveStuff(){
        this.zapper.move();
        for(let i =0; i<this.allBullets.length;i++){
            this.allBullets[i].move();  
        }
    }

    // check if an object is out of bounds of the game canvas
    // outOfBounds(position){
    //     return position[0] < 0 || position[1] < 36 || position[0] >= Game.DIM_X || position[1] >= Game.DIM_Y;
    // }

    //remove an entity if destroyed or game reset by splicing it from 
    // the games dedicated array for said entity
    // removeEntity(entity){
        // if(entity instanceof Centipede){
        //     this.allCentipedes.splice(this.allCentipedes.indexOf(entity),1);
        // }
        // else if(entity instanceof Mushrooms){
        //     this.AllMushrooms.splice(this.AllMushrooms.indexOf(entity),1);

        // }
        // else if(entity instanceof Spider){
        //     this.allSpiders.splice(this.allSpiders.indexOf(entity),1);

        // }
        // else if(entity instanceof Scorpion){
        //     this.allScorpions.splice(this.allScorpions.indexOf(entity),1);

        // }
        // else if(entity instanceof Flea){
        //     this.allFleas.splice(this.allFleas.indexOf(entity),1);

        // }
        // else if(entity instanceof Bullet){
        //     this.allBullets.splice(this.allBullets.indexOf(entity),1);

        // }
        
    // }

    //check if the game if over
    gameOver () {
        return this.lives === 0 ? true : false;
    }


}
Game.BackGroundColor = "#000000";
Game.DIM_X = 500;
Game.DIM_Y = 750;
Game.NUM_OF_MUSHROOMS = 50;


export default Game;