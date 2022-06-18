import MovingObject from "./movingObject.js";
import Util from "./utils.js";



class Centipede extends MovingObject {


  constructor(options) {


    super({

      pos: [12, 48],
      game: options.game,
      vel: options.vel,
      radius: 12,
      color: Util.randomColors()

    });




  }

  draw(ctx) {

    // body seges using a pentagon
    let angle = 2 * Math.PI / 5;
    ctx.fillStyle = Util.randomColors();
    ctx.beginPath();
    for (let i = 0; i < 5; i++) {
      ctx.lineTo(this.pos[0] + (this.radius*1.25) * Math.cos(i * angle), this.pos[1] + (this.radius * 2) * Math.sin(i * angle));
    }
    ctx.moveTo(this.pos[0], this.pos[1]);
    ctx.lineTo(this.pos[0] + 10, this.pos[1] - 50);
    ctx.lineTo(this.pos[0] + 10, this.pos[1] - 40);
    ctx.moveTo(this.pos[0], this.pos[1]);
    ctx.lineTo(this.pos[0] + 10, this.pos[1] + 50);
    ctx.lineTo(this.pos[0] + 10, this.pos[1] + 40);
    ctx.fill();
    ctx.stroke();


    //spider body
    // ctx.fillStyle = this.color;
    // ctx.beginPath();
    // ctx.arc(this.pos[0], this.pos[1] - 8, 8, 0, 2 * Math.PI);
    // ctx.arc(this.pos[0], this.pos[1] + 8, 8, 0, 2 * Math.PI);
    // ctx.fill();
    // ctx.beginPath();
    // // Left Legs
    // ctx.fillStyle = this.color;
    // ctx.moveTo(this.pos[0], this.pos[1]);
    // ctx.lineTo(this.pos[0] - 30, this.pos[1] - 30);
    // ctx.lineTo(this.pos[0] - 30, this.pos[1] - 35);
    // ctx.moveTo(this.pos[0], this.pos[1]);
    // ctx.lineTo(this.pos[0] - 30, this.pos[1] - 10);
    // ctx.lineTo(this.pos[0] - 40, this.pos[1] - 10);
    // ctx.moveTo(this.pos[0], this.pos[1]);
    // ctx.lineTo(this.pos[0] - 30, this.pos[1] + 10);
    // ctx.lineTo(this.pos[0] - 40, this.pos[1] + 10);
    // ctx.moveTo(this.pos[0], this.pos[1]);
    // ctx.lineTo(this.pos[0] - 30, this.pos[1] + 30);
    // ctx.lineTo(this.pos[0] - 30, this.pos[1] + 35);
    // // Right legs
    // ctx.moveTo(this.pos[0], this.pos[1]);
    // ctx.lineTo(this.pos[0] + 30, this.pos[1] - 30);
    // ctx.lineTo(this.pos[0] + 30, this.pos[1] - 35);
    // ctx.moveTo(this.pos[0], this.pos[1]);
    // ctx.lineTo(this.pos[0] + 30, this.pos[1] - 10);
    // ctx.lineTo(this.pos[0] + 40, this.pos[1] - 10);
    // ctx.moveTo(this.pos[0], this.pos[1]);
    // ctx.lineTo(this.pos[0] + 30, this.pos[1] + 10);
    // ctx.lineTo(this.pos[0] + 40, this.pos[1] + 10);
    // ctx.moveTo(this.pos[0], this.pos[1]);
    // ctx.lineTo(this.pos[0] + 30, this.pos[1] + 30);
    // ctx.lineTo(this.pos[0] + 30, this.pos[1] + 35);
    // ctx.fill();
    // ctx.stroke();

    //using semi circles
    // ctx.fillStyle = Util.randomColors();
    // ctx.beginPath();
    // ctx.arc(this.pos[0], this.pos[1], this.radius*1.5, 1.5 * Math.PI, 0.5 * Math.PI, false);
    
    // ctx.moveTo(this.pos[0], this.pos[1]+10);
    // ctx.lineTo(this.pos[0]-10, this.pos[1]+75);
    // ctx.lineTo(this.pos[0]-10, this.pos[1]+50);
    
    // ctx.moveTo(this.pos[0], this.pos[1]-10);
    // ctx.lineTo(this.pos[0]-10, this.pos[1] - 70);
    // ctx.lineTo(this.pos[0]-10, this.pos[1] - 50);
    // ctx.fill();
    // ctx.stroke();
    // ctx.closePath();

    // square body 
    // ctx.fillStyle = this.color;
    // ctx.fillRect(
    //   this.pos[0] - this.radius,
    //   this.pos[1] - this.radius,
    //   this.radius * 2,
    //   this.radius * 2
    // );

  }

  drawHead(ctx) {

    let angle = 2 * Math.PI / 5;
    ctx.fillStyle = Util.randomColors();
    ctx.beginPath();
    for (let i = 0; i < 5; i++) {
      ctx.lineTo(this.pos[0] + (this.radius*1.25) * Math.cos(i * angle), this.pos[1] + (this.radius * 2) * Math.sin(i * angle));
    }
    //antennee
    // ctx.fill();
    // ctx.stroke();
    // ctx.beginPath();
    // ctx.moveTo(this.pos[0], this.pos[1]);
    // ctx.lineTo(this.pos[0] + 50, this.pos[1] - 20);
    // ctx.lineTo(this.pos[0] + 60, this.pos[1] - 20);
    // ctx.moveTo(this.pos[0], this.pos[1]);
    // ctx.lineTo(this.pos[0] + 50, this.pos[1] + 20);
    // ctx.lineTo(this.pos[0] + 60, this.pos[1] + 20);
    // ctx.fill();
    // ctx.stroke();

    //antennee with curves
    // ctx.fill();
    // ctx.stroke();
    // ctx.beginPath();
    // // ctx.fillStyle = this.color;
    // ctx.moveTo(this.pos[0] + 10, this.pos[1] - 10);
    // ctx.lineTo(this.pos[0] + 50, this.pos[1] - 20);
    // ctx.lineTo(this.pos[0] + 10, this.pos[1] - 30);
    // ctx.lineTo(this.pos[0] + 60, this.pos[1] - 20);


    // ctx.moveTo(this.pos[0] - 10, this.pos[1] + 10);
    // ctx.lineTo(this.pos[0] + 50, this.pos[1] + 20);
    // ctx.lineTo(this.pos[0] - 10, this.pos[1] + 30);
    // ctx.lineTo(this.pos[0] + 60, this.pos[1] + 20);
    // // ctx.moveTo(this.pos[0], this.pos[1]);
    // ctx.fill();
    // ctx.stroke();
    // ctx.closePath();

    // ctx.fill();
    // ctx.stroke();
    // //shorter antentesz
    // ctx.fillStyle = Util.randomColors();
    // ctx.beginPath();

//HERE

    ctx.moveTo(this.pos[0] + 10, this.pos[1] - 10);
    ctx.lineTo(this.pos[0] + 40, this.pos[1] - 20);
    ctx.lineTo(this.pos[0] + 10, this.pos[1] - 30);
    ctx.lineTo(this.pos[0] + 50, this.pos[1] - 20);
    ctx.closePath();
    ctx.moveTo(this.pos[0] + 10, this.pos[1] + 10);
    ctx.lineTo(this.pos[0] + 40, this.pos[1] + 20);
    ctx.lineTo(this.pos[0] + 10, this.pos[1] + 30);
    ctx.lineTo(this.pos[0] + 50, this.pos[1] + 20);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();


    // //eyes
    ctx.fillStyle = "red";
    ctx.beginPath();
    // ctx.moveTo(this.pos[0], this.pos[1]);
    ctx.arc(this.pos[0] + 4, this.pos[1] + 10, 5, 0, 2 * Math.PI);
    ctx.arc(this.pos[0] + 4, this.pos[1] - 10, 5, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();
    ctx.closePath();







    // //circle head
    // // ctx.fillStyle = "blue";
    // ctx.beginPath();
    // // ctx.translate(this.pos[0], this.pos[1])
    // ctx.arc(this.pos[0], this.pos[1], this.radius*1.5, 1.5 * Math.PI, 0.5 * Math.PI, false);
    // ctx.fill();
    // ctx.beginPath();
    // // ctx.fillStyle = "black";
    // ctx.moveTo(this.pos[0] + 6, this.pos[1] - 10);
    // ctx.lineTo(this.pos[0] + 40, this.pos[1] - 20);
    // ctx.lineTo(this.pos[0] + 10, this.pos[1] - 30);
    // ctx.lineTo(this.pos[0] + 50, this.pos[1] - 20);
    // ctx.closePath();
    // ctx.moveTo(this.pos[0] + 6, this.pos[1] + 10);
    // ctx.lineTo(this.pos[0] + 40, this.pos[1] + 20);
    // ctx.lineTo(this.pos[0] + 10, this.pos[1] + 30);
    // ctx.lineTo(this.pos[0] + 50, this.pos[1] + 20);
    // ctx.fill();
    // ctx.stroke();
  
    // ctx.beginPath();
    // ctx.fillStyle = "red";
    // ctx.arc(this.pos[0] + 4, this.pos[1] + 5, 2, 0, 2 * Math.PI);
    // ctx.arc(this.pos[0] + 4, this.pos[1] - 5, 2, 0, 2 * Math.PI);
    // ctx.fill();
    // ctx.closePath();














  }


  drawTail(){

  }



  move() {
    let newPos = [this.pos[0] + this.vel[0], this.pos[1] + this.vel[1]];
    let splitSize;
    if (this.hitBottomOfCanvas(newPos)) {
      // console.log("centipede has hit bottom canvas");
      // console.log("moving up");

      this.moveUp();
      splitSize = true;

    }
    else if (this.hitTopOfCanvas(newPos)) {
      // console.log("centipede has hit top canvas");

      let swap = this.vel[0];
      this.vel[0] = (this.vel[1]) * -1;
      this.vel[1] = swap;
      splitSize = true;
    }
    else if (this.hitSideWall(newPos) || this.centipedeCollatsMushroom(newPos)) {
      if (this.pos[1] === Util.centipedeLowestCorner()) {
        // console.log("centipede has hitwall of canvas   moving up ");
        this.moveUp();
      }
      else {
        // console.log("centipede has hitwall of canvas   moving down ");

        this.moveDown();
      }
      splitSize = true;
    }
    else if (this.reachedNextRow(newPos)) {
      this.newRow = null;
      this.vel[0] = -this.previousDirection;
      this.vel[1] = 0;
      let newRowPos = [this.pos[0] + this.vel[0], this.pos[1] + this.vel[1]];
      // console.log("centipede has reached next row ");

      if (this.centipedeCollatsMushroom(newRowPos) || this.hitSideWall(newRowPos)) {
        this.vel[0] *= -1;
      }
      splitSize = true;
    }
    this.pos[0] += this.vel[0];
    this.pos[1] += this.vel[1];
    if (splitSize) {
      this.moveToNextRow();
      // console.log("centipede has moved to next row ");

    }
    if (this.game.outOfBounds(this.pos)) {
      // console.log("body seg out of bounds being deleted");

      this.game.removeEntity(this);
    }

  }


  hitByZapper() {
    console.log("hit by zapper");

    this.game.removeEntity(this);
    this.game.incrementScore(100);
    this.game.addMushroomHere(
      {
        pos: Util.centipedeNearestPos(this.pos),
        game: this.game
      }
    )
  }


  // collisonDetection(entity) {


  // }

  // centipedeTouchesPoisonMushroom() {

  // }

  // if poisoned drop down to player immediately
  // centipedeDropDown() {

  // }



  moveUp() {
    // console.log("moving up");
    this.vel[1] = -Math.abs(this.vel[0]);
    this.vel[0] = 0;

  }

  moveDown() {
    // console.log("moving down");

    // this.nextRow = Util.centipedeNearestPos(this.pos)[1] + 2 * this.radius;

    let nearestPos = Util.centipedeNearestPos(this.pos);
    this.nextRow = nearestPos[1] + (this.radius * 2);


    this.previousDirection = this.vel[0];
    this.vel[0] = this.vel[1];
    this.vel[1] = Math.abs(this.previousDirection);
  }

  reachedNextRow(newPos) {
    // console.log("reached next row");

    return this.nextRow && newPos[1] > this.nextRow;
  }


  hitSideWall(newPos) {
    // console.log("hit the wall");

    // return (newPos[0] < 12 && newPos[1] !== 48) || newPos[0] > Util.centipedeRightMostPos();
    return (newPos[0] < 12 && newPos[1] !== 48) || newPos[0] > Util.centipedeRightMostPos();

    //ADDING THE RIGHT MOST POSITION SEEMS TO BE THE FIX TO PREVENT the body segments from 
    // jamming into the wall this is odd as the data thats returned by thge util function
    // if added by itself for some reason does not work even thous the data does not change
    // also it seems that the canvas width*height set in html and then in js if theyt
    // dont have the same values at the start it corrupts the movement
  }

  hitBottomOfCanvas(newPos) {
    // console.log("hit the floor");

    return this.hitSideWall(newPos) && this.pos[1] === Util.centipedeLowestCorner();
  }

  // centipede can move out of canvas but only for a small amount
  hitTopOfCanvas(newPos) {
    // console.log("hit the roof");

    return newPos[1] < Util.centipedeHeightLimit() && this.vel[1] < 0;
  }


  // refactor to check for poison mushrooms when the scorpion 
  // is implemented
  centipedeCollatsMushroom(newPos) {
    // console.log("cent hit mushroom");

    let tempPos = this.pos;
    this.pos = newPos;

    let collided = this.game.AllMushrooms.some(
      (mushroom) => {
        return this.hasCollisonOccured(mushroom);
      }, this);

    this.pos = tempPos;
    return collided && this.vel[0];
  }


  moveToNextRow() {
    // console.log("moving to next row");

    this.pos = Util.centipedeNearestPos(this.pos);
  }





}




export default Centipede;