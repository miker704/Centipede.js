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

  centipededraw(ctx) {
    ctx.fillStyle = '#FFFFFF';
    ctx.beginPath();
  
    // let radius = 10;
    let x = 25;
    let y = 25;
    let angle = 2 * Math.PI /5;
    ctx.beginPath();
    ctx.translate(x, y);
    ctx.moveTo(this.pos[0], this.pos[1]);
      ctx.lineTo(this.radius * Math.cos(1 * angle), this.radius * Math.sin(i * angle));
      ctx.lineTo(this.radius * Math.cos(2 * angle), this.radius * Math.sin(i * angle));
      ctx.lineTo(this.radius * Math.cos(3 * angle), this.radius * Math.sin(i * angle));
      ctx.lineTo(this.radius * Math.cos(4 * angle), this.radius * Math.sin(i * angle));
      ctx.lineTo(this.radius * Math.cos(5 * angle), this.radius * Math.sin(i * angle));
    ctx.stroke();
  }


  move() {
      let newPos = [this.pos[0]+this.vel[0],this.pos[1]+this.vel[1]];
      let splitSize;
      if(this.hitBottomOfCanvas(newPos)){
        this.moveUp();
        splitSize = true;

      }
      else if (this.hitTopOfCanvas(newPos)){
        let swap = this.vel[0];
        this.vel[0]= -this.vel[1];
        this.vel[1]=swap;
        splitSize=true;
      }
      else if(this.hitSideWall(newPos) || this.centipedeCollatsMushroom(newPos)){
        if(this.pos[1]===Util.centipedeLowestCorner()){
          this.moveUp();
        }
        else{
          this.moveDown();
        }
        splitSize = true;
      }
      else if (this.reachedNextRow(newPos)){
        this.newRow=null;
        this.vel[0] = -this.previousRow;
        this.vel[1]=0;
        let newRowPos = [this.pos[0] + this.vel[0], this.pos[1]+this.vel[1]];
        if(this.centipedeCollatsMushroom(newRowPos) || this.hitSideWall(newRowPos)){
          this.vel[0]*=-1;
        }
        splitSize=true;
      }
      this.pos[0]+=this.vel[0];
      this.pos[1]+=this.vel[1];
      if(splitSize){
        this.moveToNextRow();
      }
      if(this.game.outOfBounds(this.pos)){
        this.game.removeEntity(this);
      }

  }


  hitByZapper() {
    this.game.removeEntity(this);
    this.game.incrementScore(100);
    this.game.addMushroomHere(
      {
        pos: Util.centipedeNearestPos(this.pos)
      }
    )
  }


  collisonDetection(entity) {


  }

  centipedeTouchesPoisonMushroom() {

  }

 // if poisoned drop down to player immediately
  centipedeDropDown() {

  }



  moveUp() {
    this.vel[1] = -(Math.abs(this.vel[0]));
    this.vel[0] = 0;

  }

  moveDown() {
    this.nextRow = Util.centipedeNearestPos(this.pos)[1] + 2 * this.radius;
    this.previousRow = this.vel[0];
    this.vel[0] = this.vel[1];
    this.vel[1] = Math.abs((this.previousRow));
  }

  reachedNextRow(newRow) {
    return this.nextRow && newRow[1] > this.nextRow;
  }


  hitSideWall(newRow) {

    return (newRow[0] < 12 && newRow[1] !== 48) || newRow[0] > 488;

  }

  hitBottomOfCanvas(newRow) {
    return this.hitSideWall(newRow) && this.pos[1] === Util.centipedeLowestCorner();
  }

  // centipede can move out of canvas but only for a small amount
  hitTopOfCanvas(newRow) {
    return newRow[1] < Util.centipedeHeightLimit() && this.vel[1] < 0;
  }


  // refactor to check for poison mushrooms when the scorpion 
  // is implemented
  centipedeCollatsMushroom(newRow) {
    let tempPos = this.pos;
    this.pos = newRow;

    let collided = this.game.AllMushrooms.some(
      (mushroom) => {
        return this.collisonDetection(mushroom);
      }, this);

    this.pos = tempPos;
    return collided && this.vel[0];
  }


  moveToNextRow(){
    this.pos = Util.centipedeNearestPos(this.pos);
  }





}




export default Centipede;