import Game from "./game";


const Util = {

    //everything but mushrooms
    randomColors() {
        let color = '#';
        let hexcode = '0123456789ABCDEF';
        for (let i = 0; i < 6; i++) {
            color += hexcode[Math.floor((Math.random() * 16))];
        }

        return color;
    },
    // the mushrooms cannot be black #000000 as it matches the play field nor can they start
    // of as purple '#800080' as they are poison mushrooms 
    mushroomRandomColors() {
        let color = '#';
        let hexcode = '0123456789ABCDEF';
        for (let i = 0; i < 6; i++) {
            color += hexcode[Math.floor((Math.random() * 16))];
        }
        if (color === '#000000' || color === '#800080') {
            alert("color is black or purple");
        }

        return color === '#000000' ? color = '#ff4100' : color === '#800080' ? color = '#ff4100' : color;
    },


    randomSpiderPos() {
        //spiders start near the edge of the widths of the canvas before coming in
        let x = Math.random() > 0.5 ? 0 : Game.DIM_X;
        let y = Math.random() * ((Game.DIM_Y - 36) / 2);
        y += 36 + (Game.DIM_Y / 4);
        // console.log("spider coords : " + x + " " + y);
        return [x, y];
    },



    randomPosition() {
        let x = Math.random() * (Game.DIM_X) + 0;
        let y = Math.random() * ((Game.DIM_Y - 36) / 2) + 36;
        let temp = [x, y];
        let randPos = [];
        for (let i = 0; i < temp.length; i++) {
            let offset = i === 0 ? 0 : 36;
            let point = temp[i] - offset;
            let difference = (point - 12) % 24;
            if (difference > 12) {
                randPos.push(temp[i] + 24 - difference);
            }
            else {
                randPos.push(temp[i] - difference);
            }
        }
        return randPos;

    },
    // get a random position for the mushroom spawn point that wont render out of the canvas or
    // in the score table
    randomMushroomPos() {
        let randomSpawnPoints = new Array();
        let tempPos= this.randomPosition();
        while (randomSpawnPoints.length < Game.NUM_OF_MUSHROOMS) {
            if (randomSpawnPoints.indexOf(tempPos) !== 1
                || (tempPos[0] <= 24 && tempPos[1] <= 60)
            ) {
                randomSpawnPoints.push(tempPos);
            }
            tempPos = this.randomPosition();
        }
        return randomSpawnPoints;

    },

    //location functions to add a proper locations for objects to snap to the grid more properly
    centipedeNearestPos(pos){
        let randPos = [];
        for (let i = 0; i < pos.length; i++) {
            let offset = i === 0 ? 0 : 36;
            let point = pos[i] - offset;
            let difference = (point - 12) % 24;
            if (difference > 12) {
                randPos.push(pos[i] + 24 - difference);
            }
            else {
                randPos.push(pos[i] - difference);
            }
        }
        return randPos;
    },

    centipedeLeftMostPos (){
        return  12;
    },

    centipedeRightMostPos(){
        return Game.DIM_X - 12;
    },


    centipedeLowestCorner(){
        return Game.DIM_Y - 12;
    },

    centipedeHighestCorner(){
        return 48;
    },

    //same math used to bound the players moveable are just created 
    // into a function
    centipedeHeightLimit(){
        let twoThirdsofCanvas = ((Game.DIM_Y - 36)*2/3) + 36;
        let bodyPlacement = twoThirdsofCanvas - (twoThirdsofCanvas%24);
        return bodyPlacement+ 12;
    },

    getRandomYPos(){
        let x = Math.random() * (Game.DIM_X) + 0;
        let y = Math.random() * ((Game.DIM_Y - 36) / 2) + 36;
        return this.centipedeNearestPos([x,y]);
    }

};


export default Util;