import Mushrooms from "./mushrooms.js";
import Centipede from "./centipede.js";
import Spider from "./spider.js";
import Flea from "./flea.js";
import Scorpion from "./scorpion.js";
import Bullet from "./bullet.js";
import BugZapper from "./bugZapper.js";
import Util from "./utils.js";
import ArmoredScorpion from "./armored_Scorpion.js";
import JumpingSpider from "./jumping_Spider.js";
import Wasp from "./wasp.js";
import LightningWasp from "./lightning_Wasp.js";
import SplashEffect from "./splash_Effect.js";
import PowerUps from "./powerUps.js";
import SplayArray from "./splayArray.js";


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
        // this.bodyLength = 1;
        this.allArmoredScorpions = [];
        // this.addStartingShrooms();
        // this.addSpider();
        // // this.startGame = false;
        this.zapper = new BugZapper({
            pos: [300, 36 + ((Game.DIM_Y - 36) * 3 / 4)],
            game: this,
        });
        // this.addStartingShrooms();
        // this.zapper;
        // this.scorpion_model="";
        // this.addScorpion();
        // this.addFlea();

        // this.addArmoredScorpion();
        this.spawner = [];
        this.allJumpingSpiders = [];
        this.allWasps = [];
        this.allLightningWasps = [];
        this.allSparks = [];
        this.allPowerUps = [];

        this.SplayBullets = new SplayArray();

        
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
        // this.lives = 3;
        this.lives = 5000;

        this.score = 0;
        this.playerBugZapper = [];
        this.allSpiders = [];
        this.allFleas = [];
        this.allCentipedes = [];
        this.allScorpions = [];
        this.allBullets = [];
        this.gameEntities = [];
        this.zapper = new BugZapper({
            pos: [300, 36 + ((Game.DIM_Y - 36) * 3 / 4)],
            game: this,
        });

        this.spawner = [];
        this.allJumpingSpiders = [];
        this.allWasps = [];
        this.allLightningWasps = [];
        this.allArmoredScorpions = [];
        this.allSparks.forEach((spawnTimer) =>{
            clearTimeout(spawnTimer);
        });
        this.allPowerUps = [];
        this.SplayBullets = new SplayArray();
        this.addStartingShrooms();
        this.spawner.push(setTimeout(this.addSpider.bind(this), 30000));
        this.spawner.push(setTimeout(this.addFlea.bind(this), 20000));
        this.spawner.push(setTimeout(this.addJumpingSpider.bind(this), 40000));
        this.spawner.push(setTimeout(this.addWasp.bind(this), 45000));
        this.spawner.push(setTimeout(this.addLightningWasp.bind(this), 100000));
        this.spawner.push(setTimeout(this.addScorpion.bind(this), 50000));
        this.spawner.push(setTimeout(this.addArmoredScorpion.bind(this), 100000));
        // this.spawner.push(setTimeout(this.addStartingShrooms.bind(this), 100000));
       

    }



    addPowerUp(pos) {



        let powerUpColorCode = {
            'ExtraLife': '#FFD700', // gold
            'FasterFireRate': '#B87333', //copper
            'Shield': '#00FFFF', //cyan
            'ClearPoisonMushrooms': '#2A0134', // poison purple
            'Wipeout': '#880808',//blood red
            'Splay': '#B9F2FF', // "Diamond"
            'Spread': '#50C878', //emerald green
            'Barrell': '#32CD32' //lime green
        }

        let powerUps = {

            gameEffect: ['ExtraLife', 'Shield', 'ClearPoisonMushrooms', 'Wipeout'],
            zapperEffect: ['FasterFireRate', 'Spread', 'Barrell', 'Splay']
        }

        //select random powerup type

        let powerTypeSelection = Math.floor(Math.random() * Object.keys(powerUps).length);
        let powerUpsofSelection = powerUps[Object.keys(powerUps)[powerTypeSelection]];
        let chosenPowerUp = Math.floor(Math.random() * powerUpsofSelection.length)

        let typeOfPowerUp = Object.keys(powerUps)[powerTypeSelection];
        let powerUpName = powerUpsofSelection[chosenPowerUp];

        //select random powerup of that type
        if (typeOfPowerUp === "gameEffect") {

            this.allPowerUps.push(
                new PowerUps({
                    pos: pos,
                    game: this,
                    vel: this.randomVelocity(),
                    typeOfPowerUp: typeOfPowerUp,
                    powerUpName: powerUpName,
                    color: powerUpColorCode[powerUpName]
                    // typeOfPowerUp: "gameEffect",
                    // powerUpName: 'Wipeout',
                    // color: '#880808'
                })
            );

        }
        else {
         
            this.allPowerUps.push(
                new PowerUps({
                    pos: pos,
                    game: this,
                    vel: this.randomVelocity(),
                    typeOfPowerUp: typeOfPowerUp,
                    powerUpName: powerUpName,
                    color: powerUpColorCode[powerUpName]

                })
            );
        }






    }

    increaseFireRate() {

    }


    unlockSplay() {
        this.zapper.hasSplayShot = true;
    }


    giveShield() {
        // console.log("called give shield: ", this.zapper.hasShield);
        this.zapper.hasShield = true;
    }

    addBarrell() {
        return { number: [1] };
    }

    addSpread() {
        return { number: [4] };
    }

    addfireRate() {

    }

    wipeOutPowerUp() {
        // console.log("called wipe out");
        let levelEntities = new Array();
        levelEntities = levelEntities.concat(
            this.allSpiders,
            this.allCentipedes,
            this.allScorpions,
            this.allArmoredScorpions,
            this.allFleas,
            this.allJumpingSpiders,
            this.allWasps,
            this.allLightningWasps,
            this.AllMushrooms
        );
        levelEntities.forEach((entity) => {
            this.removeEntity(entity);
        });
    }


    addLifeViaPowerUp() {
        this.lives++;
    }

    clearPoisonMushrooms() {
        this.AllMushrooms.forEach(
            (mushroom) => {
                mushroom.poisoned = false;
            }, this);
    }


    //sparks are the splash effect 
    addSpark(options) {
        // options.amount = options.amount ? options.amount : 8;
        for (let i = 0; i < options.amount; i++) {
            this.addSparks(options);
        }
    }

    addSparks(options) {

        this.allSparks.push(
            new SplashEffect({
                pos: options.pos,
                game: this,
                vel: [(Math.random() - 0.5), (Math.random() - 0.5)],
                color: options.color
            })
        )
    }



    addArmoredScorpion() {

        let startPos = Util.randomScorpionPos();

        this.allArmoredScorpions.push(

            new ArmoredScorpion({
                pos: startPos,
                direction: startPos[0] === 0 ? 0 : -Math.PI,

                game: this,
                maxVelocity: ((this.level * 0.05) * 1.10)
            })
            )
            this.spawner.push(
                setTimeout(
                    this.addScorpion.bind(this),
                    Math.max(200 - this.level,5) * 100
                )
            )  
    }


    addScorpion() {
        this.allScorpions.push(
            new Scorpion({
                pos: Util.randomScorpionPos(),
                vel: [4, 0],
                game: this
            })
        )
        this.spawner.push(
            setTimeout(
                this.addScorpion.bind(this),
                Math.max(200 - this.level,20) * 100
            )
        )   
    }

    addFlea() {
      
            let x_coord = Math.random() * (Game.DIM_X - 0) + 0;
            let y_coord = Util.centipedeHighestCorner();

          
            this.allFleas.push(
                new Flea({
                    pos: [x_coord,y_coord],
                    vel: [Math.random() * (this.level / 4) - (this.level / 8), 0],
                    acceleration: (0.05 + this.level * 0.01) * 1,
                    game: this
                })
            )
            this.spawner.push(
                setTimeout(
                    this.addFlea.bind(this),
                    Math.max(200 - this.level) * 100
                )
            )     
    }


    addWasp() {
        let x_coord = Math.random() * (Game.DIM_X - 0) + 0;
        let y_coord = Util.centipedeHighestCorner();

        this.allWasps.push(
            new Wasp({
                pos: [x_coord, y_coord],
                vel: [(5 + this.level * 0.5), 0],
                game: this,
                acceleration: (0.05 + this.level * 0.001) * 1,

            })
        )
        this.spawner.push(
            setTimeout(
                this.addWasp.bind(this),
                Math.max(200 - this.level, 20) * 100
            )
        )
    }



    addLightningWasp() {
        let x_coord = Math.random() * (Game.DIM_X - 0) + 0;
        let y_coord = Util.centipedeHighestCorner();

        this.allLightningWasps.push(
            new LightningWasp({
                pos: [x_coord, y_coord],
                vel: [10, 10],
                game: this,
                acceleration: (0.05 + this.level * 0.0001) * 1,

            })
        )
        this.spawner.push(
            setTimeout(
                this.addLightningWasp.bind(this),
                Math.max(200 - this.level, 20) * 100
            )
        )
    }

    addJumpingSpider() {
        let startPos = Util.randomSpiderPos();
        this.allJumpingSpiders.push(
            new JumpingSpider({
                pos: startPos,
                game: this,
                vel: [Math.sin(45) + 2 + this.level, Math.sin(45) + 2 + this.level],
                direction: startPos[0] === 0 ? 0 : -Math.PI,
                maxVelocity: ((this.level * 0.005) * 2) // increase spider speed at every level
            })
        )
        this.spawner.push(
            setTimeout(
                this.addJumpingSpider.bind(this),
                Math.max(200 - this.level, 20) * 100
            )
        )
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
        this.spawner.push(
            setTimeout(
                this.addStartingShrooms.bind(this),
                Math.random() * (200 - this.level) * 1000
            )
        )
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
            vel: [(5 + this.level * 0.5), 0],
            acceleration: (0.05 + this.level * 0.01) * 1,
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

            //redact this
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
            this.spawner.push(
                setTimeout(
                    this.addSpiders.bind(this),
                    Math.max(200 - this.level, 20) * 100
                )
            )
        }


    }

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
            this.drawCentipede(ctx);
        }
        else if (!this.startGame) {
            ctx.fillStyle = "#FFFFFF";
            ctx.fillText(
                "Click to play!",
                (Game.DIM_X) / 2,
                (Game.DIM_Y - 36) * 0.5 + 36
            );
        }

        else {
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

    randomVelocity() {
        return [(Math.random() * 3 - 1.5), (Math.random() * 6 - 3)]
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

        let levelEntities = new Array();
        levelEntities = levelEntities.concat(
            this.allBullets,
            [this.zapper],
            this.allSpiders,
            this.allCentipedes,
            this.allScorpions,
            this.allArmoredScorpions,
            this.allFleas,
            this.allJumpingSpiders,
            this.allWasps,
            this.allLightningWasps,
            this.allSparks,
            this.allPowerUps,
            this.SplayBullets

        );

        for (let i = 0; i < levelEntities.length; i++) {

            levelEntities[i].move();
        }

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

            this.AllMushrooms,
            this.allFleas,
            this.allBullets,
            this.allCentipedes,
            this.allSpiders,
            this.allArmoredScorpions,
            this.allScorpions,
            this.allJumpingSpiders,
            this.allWasps,
            this.allLightningWasps,
            this.allSparks,
            this.allPowerUps,
            this.SplayBullets,
            [this.zapper]

        );
    }

    // hasCollisonOccured 
    checkCollisons() {



        let testSubjects = [];

        testSubjects = testSubjects.concat(
            this.allBullets,
            this.AllMushrooms,
            [this.zapper],
            this.allSpiders,
            this.allCentipedes,
            this.allScorpions,
            this.allArmoredScorpions,
            this.allFleas,
            this.allJumpingSpiders,
            this.allWasps,
            this.allLightningWasps,
            this.allPowerUps,
            this.SplayBullets,
        );
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
            this.createBodySegment();
            if (this.allCentipedes.length === 0) {
            this.newLevel();
            }

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

    addLife() {

        // give the player a new life after reaching a certain score

        if (this.score !== 0 && this.lives > 0) {

            if (this.score >= this.nextLife) {
                this.nextLife += 10000;
                this.lives++;
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
        else if (entity instanceof ArmoredScorpion) {
            this.allArmoredScorpions.splice(this.allArmoredScorpions.indexOf(entity), 1);

        }

        else if (entity instanceof JumpingSpider) {
            this.allJumpingSpiders.splice(this.allJumpingSpiders.indexOf(entity), 1);

        }
        else if (entity instanceof Wasp) {
            this.allWasps.splice(this.allWasps.indexOf(entity), 1);

        }
        else if (entity instanceof LightningWasp) {
            this.allLightningWasps.splice(this.allLightningWasps.indexOf(entity), 1);

        }
        else if (entity instanceof SplashEffect) {
            this.allSparks.splice(this.allSparks.indexOf(entity), 1);
        }
        else if (entity instanceof PowerUps) {
            this.allPowerUps.splice(this.allPowerUps.indexOf(entity), 1);
        }
        else {
            this.allBullets.splice(this.allBullets.indexOf(entity), 1);

        }

    }

    newLevel() {
        this.incrementScore(this.level * 15);
        this.level++;
        this.bodyLength = Math.ceil(Math.random() * (12 - 10 + 1)) + Math.ceil((10 + (this.level / 2)));

        if(this.AllMushrooms.length !== Game.NUM_OF_MUSHROOMS){
        let difference = this.AllMushrooms.length - Game.NUM_OF_MUSHROOMS;
                if(difference < Game.NUM_OF_MUSHROOMS/2){
                    this.addStartingShrooms();
                }
        }
        //  this.AllMushrooms.forEach(
        //     (mushroom) => {
        //         mushroom.poisoned = false;
        //     }, this);
        Game.BackGroundColor = Util.randomColors();
    

    }


    //check if the game if over
    gameOver() {
        return this.lives === 0 ? true : false;
    }



}
Game.BackGroundColor = "#000000";
// Game.BackGroundColor = "#FFFFFF";
// Game.BackGroundColor = Util.randomColors();


Game.DIM_X = 600;
Game.DIM_Y = 756;
// Game.DIM_X = 600;
// Game.DIM_Y = 804;
Game.NUM_OF_MUSHROOMS = 50;
// Game.NUM_OF_MUSHROOMS = 200;



export default Game;