// import MovingObject from "./movingObject.js";



class Centipede {


  constructor () {
    //centipede has a random body size between  10 -12 segments long
    this.bodyLength = new Array(Math.floor(Math.random() * (12 - 10 + 1)) + 10);

    // super({


    // });
    // super();



  }

  drawCentipedeSegment (ctx) {
    var numberOfSides = 5;
    var radius = 10;
    var x = 25;
    var y = 25;
    var angle = 2 * Math.PI / numberOfSides;
    ctx.beginPath();
    ctx.translate(x, y);
    ctx.moveTo(radius, 0);
    for (var i = 1; i <= numberOfSides; i++) {
      ctx.lineTo(radius * Math.cos(i * angle), radius * Math.sin(i * angle));
    }
    ctx.stroke();
  }


  centipedeMovement () {

  }

  centipedeCollidesWithBullet () {

  }

  centipedeTouchesPoisonMushroom () {

  }


  centipedeDropDown () {

  }



}




export default Centipede;