import Mushrooms from "./mushrooms.js";
import Centipede from "./centipede.js";
import Spider from "./spider.js";
import Flea from "./flea.js";
import Scorpion from "./scorpion.js";
import Bullet from "./bullet.js";
import BugZapper from "./bugZapper.js";
import Util from "./utils.js";




class Game {

    constructor() {
        // this.splitGameCanvas();
        this.AllMushrooms = [];
        this.level = 1;
        this.lives = 0;
        this.score = 0;
        // array of mushrooms should be a random number
        //erry time
        //rename to a non constant
        // fleas , spiders, and ventipedes array  
        //mushrooms are static so they shuld be placed in a 
        // random postion like the asteroids but they dont move
        // should be game bound as they only apppear within
        // dimensions of the game screen canvas
        this.playerBugZapper = [];
        this.allSpiders = [];
        this.allFleas = [];
        this.allCentipedes = [];
        this.allScorpions = [];
        this.allBullets = [];
        this.gameEntities = [];
        this.nextLife = 10000;
        //centipede has a random body size between  10 -12 segments long
        this.bodyLength = Math.floor(Math.random() * (12 - 10 + 1)) + 10;

        // this.addStartingShrooms();
        // this.addSpider();
        this.startGame = false;
        this.zapper = new BugZapper({
            pos: [300, 36 + ((Game.DIM_Y - 36) * 3 / 4)],
            game: this,
        });
        // this.addStartingShrooms();
        // this.zapper;
        // this.addArmoredScorpion();
        // this.spawner = [];


    }

    //need to split the game canvas into sections to 
    // allow proper orgranization of game stats 
    // and avoid placing mushrooms on exactly on top 
    // of each other 
    // the game needs to split into 3 areas
    // score table
    // game area - which has two sections forest and player area
    // player area is where the player can move through

    splitGameCanvas() {

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


    reset() {
        this.startGame = true;
        this.AllMushrooms = [];
        this.level = 1;
        this.lives = 3;
        this.score = 0;
        this.playerBugZapper = [];
        this.allSpiders = [];
        this.allFleas = [];
        this.allCentipedes = [];
        this.allScorpions = [];
        this.allBullets = [];
        this.gameEntities = [];
        this.nextLife = 10000;
        this.zapper = new BugZapper({
            pos: [300, 36 + ((Game.DIM_Y - 36) * 3 / 4)],
            game: this,
        });
        this.addStartingShrooms();
        // this.addSpider();
         // this.addScorpion();
        //  this.addFlea();s
        console.log("reset Call : ")

    }


    addStartingShrooms() {
        let randMushroomSpawnPoints = Util.randomMushroomPos();
        for (let i = 0; i < randMushroomSpawnPoints.length; i++) {

            // this.AllMushrooms.push(new Mushrooms(this.randomPosition()));
            this.AllMushrooms.push(new Mushrooms(
                {
                    pos: randMushroomSpawnPoints[i],
                    game: this,


                }));

        }
    }

    addMushroomHere(options) {
        this.AllMushrooms.push(new Mushrooms({
            pos: options.pos,
            game: options.game,
            color: options.color || Util.mushroomRandomColors()
        }));
    }

    // idk why maybe i need to bind with this function but hitting a mushroom 
    // doesnt damage it if its health is hard coded in its class

    mushroomHealth() {
        return Math.min(Math.floor(2 + (this.level / 4)), 4);
    }


    addBodySegments() {
        this.allCentipedes.push(new Centipede({
            game: this,
            vel: [(5 + this.level * 0.5), 0]
        }));

    }

    bodyPartsEmpty() {
        return this.allCentipedes.every(
            function (bodySegment) {
                return bodySegment.pos[0] >= 3 * bodySegment.radius ||
                    bodySegment.pos[1] >= 36 + 3 * bodySegment.radius;
            }, this);
    }

    createBodySegment() {
        if (this.bodyLength && this.bodyPartsEmpty()) {
            this.bodyLength--;
            this.addBodySegments();
        }
    }



    addSpider() {
        for (let i = 0; i < 6; i++) {
            let x = Math.random() > 0.5 ? 0 : Game.DIM_X;
            let y = Math.random() * ((Game.DIM_Y - 36) / 2);
            y += 36 + (Game.DIM_Y / 4);
            // let startPos=[x,y];
            let startPos = Util.randomSpiderPos();

            // console.log("spider coords : " + x + " " + y);
            this.allSpiders.push(
                new Spider({
                    pos: startPos,
                    game: this,
                    direction: startPos[0] === 0 ? 0 : -Math.PI,
                    maxVelocity: ((this.level * 0.5) * 2) // increase spider speed at every level

                })
            );
        }


    }




    addFlea() {

        let x_coord = Math.random() * (Game.DIM_X - 0) + 0;
        let y_coord = Util.centipedeHighestCorner();

        this.allFleas.push(
            new Flea({
                pos: [x_coord, y_coord],
                vel: [Math.random() * (this.level / 4) - (this.level / 8), 0],
                acceleration: (0.05 + this.level * 0.01) * 1,
                game: this
            })
        )
    }


    addScorpion() {
        this.allScorpions.push(
            new Scorpion({
                pos: Util.randomScorpionPos(),
                vel: [3, 0],
                game: this
            })
        )

    }


    // addArmoredScorpion(){

    //     let startPos = Util.randomScorpionPos();

    //     this.allArmoredScorpions.push(
            
    //         new ArmoredScorpion({
    //             pos: startPos,
    //             direction: startPos[0] === 0 ? 0 : -Math.PI,

    //             game: this,
    //             maxVelocity:((this.level * 0.5) * 2)
    //         })
       
    //     )
    // }

     // addWasp(){
    //     this.allWasps.push(
    //         new Wasp({

    //         })
    //     )
    // }



    draw(ctx) {


        ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
        ctx.fillStyle = Game.BackGroundColor;
        ctx.fillRect(0, 0, Game.DIM_X, Game.DIM_Y);
        ctx.fillStyle = "#444444";
        ctx.fillRect(0, 0, Game.DIM_X, 36);
        ctx.fillStyle = "#FFFFFF";
        ctx.font = 24 + "pt Serif ";
        ctx.textAlign = 'center';

        if (this.startGame === true) {
            let playerStats = "Score: " + this.score + "      " + "Level: " + this.level;
            playerStats += "      " + "Lives: " + this.lives;
            ctx.fillText(playerStats, 0.50 * (Game.DIM_X - 0), 1.25 * 24);

        }


        if (this.lives && this.startGame) {
            this.allEntitiesDraw().forEach(
                (entity) => {
                    entity.draw(ctx);

                });
            //render head and body parts 
            // this.drawCentipede(ctx);

        }
        else if (!this.startGame) {
            ctx.fillStyle = "#FFFFFF";
            ctx.fillText(
                "Click to play!",
                (Game.DIM_X) / 2,
                (Game.DIM_Y - 36) * 0.5 + 36
            );
        }

        else if (this.gameOver() === false) {
            ctx.fillStyle = "#ffffff";
            ctx.fillText(
                "Game Over!",
                (Game.DIM_X) / 2,
                (Game.DIM_Y - 36) * 0.45 + 36
            );
            ctx.fillText(
                "Play Again?",
                (Game.DIM_X) / 2,
                (Game.DIM_Y - 36) * 0.55 + 36
            );


        }


    }

    randomPosition() {

        return [Math.floor(Math.random() * 400), Math.floor(Math.random() * 400)];
    };
    // shows lives, score and level 
    incrementScore(score) {
        if (this.lives > 0) {
            this.score += score;

        }
    }


    addLife() {

        // give the player a new life after reaching a certain score

        if (this.score !== 0 && this.lives > 0) {

            if (this.score >= this.nextLife) {
                this.nextLife += 10000;
                this.lives++;
            }
        }

    }


    // these are to add entities in the middle of play that spawn by game actions
    // such as breaking a centipede, mushroom spawns from centipede destroyed/ scorpion
    // changing a mushroom to be poisoned or fleas arrive to spawn mushrooms
    addEntities(entity) {
        if (entity instanceof Centipede) {
            this.allCentipedes.push(entity);
        }
        else if (entity instanceof Mushrooms) {
            this.AllMushrooms.push(entity);
        }
        else {
            this.allBullets.push(entity);
        }
    }


    moveStuff() {
        // this.zapper.move();
        // for (let i = 0; i < this.allBullets.length; i++) {
        //     this.allBullets[i].move();
        // }

        // for(let i=0; i<this.allCentipedes.length;i++){
        //     this.allCentipedes[i].move();
        // }

        // this.gameEntities = this.allEntities(); <----this seems to break
        // by causeing the setinterval to call this it some how doubles in size 
        // with a manner of seconds and massive slow down within a minute
        let levelEntities = new Array();
        levelEntities = levelEntities.concat(this.allBullets, [this.zapper], this.allSpiders, this.allCentipedes);

        // let levelEntities = this.allEntities();
        for (let i = 0; i < levelEntities.length; i++) {

            levelEntities[i].move();
        }
        // this.allEntities().forEach(
        //     function (entity) {
        //         entity.move();
        //     });
    }
    allEntities() {
        return this.gameEntities.concat(
            //   return   this.AllMushrooms.concat(
            this.AllMushrooms,
            // this.allFleas,
            this.allBullets,
            this.allCentipedes,
            this.allSpiders,
            // this.allScorpions,
            [this.zapper]
        );
    }
    allEntitiesDraw() {
        return this.gameEntities.concat(
            //   return   this.AllMushrooms.concat(
            this.AllMushrooms,
            // this.allFleas,
            this.allBullets,
            // this.allCentipedes,
            // this.allSpiders,
            // this.allScorpions,
            [this.zapper]
        );
    }

    // hasCollisonOccured 
    checkCollisons() {


        // let testSubjects = this.allEntities();
        let testSubjects = [];
        //  testSubjects = this.allEntities(); //< wtf? this for some reason doesnt work on the mushrooms
        testSubjects = testSubjects.concat(this.allBullets, this.AllMushrooms, [this.zapper], this.allSpiders, this.allCentipedes);
        // testSubjects= testSubjects.concat(this.allCentipedes,this.AllMushrooms,this.allSpiders,this.allBullets,[this.zapper]);
        for (let i = 0; i < testSubjects.length; i++) {
            for (let j = i + 1; j < testSubjects.length; j++) {
                if (testSubjects[i].hasCollisonOccured(testSubjects[j])) {
                    testSubjects[i].collisonDetection(testSubjects[j]);
                }
            }
        }
    }



    gamefieldSetUp() {
        if (this.lives) {
            this.moveStuff();
            this.checkCollisons();
            this.zapper.slowZapper();
            this.addLife();
            // this.createBodySegment();

            // console.log("this.centipede Length : " + this.allCentipedes.length);
            // if (this.allCentipedes.length === 0) {

            // this.newLevel();
            // }

        }
        else {
            // console.log("game over");

            // this.startGame= false;
            // this.reset();
            this.startGame = false;
            // this.startGame = true;




        }
    }

    drawCentipede(ctx) {
        for (let i = 0; i < this.allCentipedes.length; i++) {
            if (i === 0) {
                this.allCentipedes[0].drawHead(ctx);
            }
            else {
                this.allCentipedes[i].draw(ctx);
            }

        }
    }



    // check if an object is out of bounds of the game canvas
    outOfBounds(pos) {
        return pos[0] < 0 || pos[1] < 36 || pos[0] >= Game.DIM_X || pos[1] >= Game.DIM_Y;
    }

    //remove an entity if destroyed or game reset by splicing it from 
    // the games dedicated array for said entity
    removeEntity(entity) {
        if (entity instanceof Centipede) {
            this.allCentipedes.splice(this.allCentipedes.indexOf(entity), 1);
        }
        else if (entity instanceof Mushrooms) {
            this.AllMushrooms.splice(this.AllMushrooms.indexOf(entity), 1);
            // console.log("removeEntityMushrooms: " + this.AllMushrooms.length);
        }
        else if (entity instanceof Spider) {
            this.allSpiders.splice(this.allSpiders.indexOf(entity), 1);

        }
        else if (entity instanceof Scorpion) {
            this.allScorpions.splice(this.allScorpions.indexOf(entity), 1);

        }
        else if (entity instanceof Flea) {
            this.allFleas.splice(this.allFleas.indexOf(entity), 1);

        }
        else {
            this.allBullets.splice(this.allBullets.indexOf(entity), 1);

        }

    }

    newLevel() {

        //give a bonus to the score for each level survived

        let newscore = 0;
        newscore += Math.ceil(((this.level) * (this.score * 0.025)));

        this.incrementScore(newscore);
        this.level++;
        this.bodyLength = Math.ceil(Math.random() * (12 - 10 + 1)) + Math.ceil((10 + (this.level / 2)));



    }


    //check if the game if over
    gameOver() {
        return this.lives > 0 ? this.startGame = true : this.startGame = false;
    }



}
Game.BackGroundColor = "#000000";
Game.DIM_X = 600;
Game.DIM_Y = 756;
// Game.DIM_X = 600;
// Game.DIM_Y = 804;
Game.NUM_OF_MUSHROOMS = 50;


export default Game;