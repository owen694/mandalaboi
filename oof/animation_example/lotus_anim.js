// This code draws a pink lotus on a white background and rotates it smoothly

/*--- Below are global variables ---*/
var x, y;
var f = 0;
var dim;


/*--- setup() method is executed once ---*/
function setup() {
  createCanvas(600, 600); // Defines the size of the canvas (width, height) in pixels.
  x = width / 2;
  y = height;
  ds = new PenroseLSystem();
  //please, play around with the following line

  ds.simulate(4);

}
/*--- draw() method is executed forever at a rate defined by frameRate() ---*/
function draw() {
  background(0, 0, 0); // Sets the background color to white ( in essence erases everything we )
  translate (width/2, height/2); // Moves the origin to the center of the Canvas
  fill('rgba(255, 0, 0, 0.50)'); // Fills the shapes that follow this command.
  noStroke(); // Removes the outline for shapes that follow this command.
  scale(4); // Scales the shapes that follow this command by 4 times.

  mandala();
  rotate(0);


  /*--- Factor to control animation ---*/
  }
function PenroseLSystem() {
      this.steps = 0;

     //these are axiom and rules for the penrose rhombus l-system
     //a reference would be cool, but I couldn't find a good one
      this.axiom = "[X]++[X]++[X]++[X]++[X]";
      this.ruleW = "YF++ZF----XF[-YF----WF]++";
      this.ruleX = "+YF--ZF[---WF--XF]+";
      this.ruleY = "-WF++XF[+++YF++ZF]-";
      this.ruleZ = "--YF++++WF[+ZF++++XF]--XF";

      //please play around with the following two lines
      this.startLength = 460.0;
      this.theta = TWO_PI / 10.0; //36 degrees, try TWO_PI / 6.0, ...
      this.reset();
  }

PenroseLSystem.prototype.simulate = function (gen) {
    while (this.getAge() < gen) {
      this.iterate(this.production);
    }
  }

PenroseLSystem.prototype.reset = function () {
      this.production = this.axiom;
      this.drawLength = this.startLength;
      this.generations = 0;
    }

PenroseLSystem.prototype.getAge = function () {
      return this.generations;
    }

    //apply substitution rules to create new iteration of production string

PenroseLSystem.prototype.iterate = function() {
        var newProduction = "";

        for(var i=0; i<this.production.length; ++i) {
          var step = this.production.charAt(i);
          //if current character is 'W', replace current character
          //by corresponding rule
          if (step == 'W') {
            newProduction = newProduction + this.ruleW;
          }
          else if (step == 'X') {
            newProduction = newProduction + this.ruleX;
          }
          else if (step == 'Y') {
            newProduction = newProduction + this.ruleY;
          }
          else if (step == 'Z') {
            newProduction = newProduction + this.ruleZ;
          }
          else {
            //drop all 'F' characters, don't touch other
            //characters (i.e. '+', '-', '[', ']'
            if (step != 'F') {
              newProduction = newProduction + step;
            }
          }
        }

        this.drawLength = this.drawLength * 0.5;
        this.generations++;
        this.production = newProduction;
    }

    //convert production string to a turtle graphic
    PenroseLSystem.prototype.render = function () {
        //translate(width/5, height/5);
        rotate(0);
        this.steps += 20;
        if(this.steps > this.production.length) {
          this.steps = this.production.length;
        }

        for(var i=0; i<this.steps; ++i) {
          var step = this.production.charAt(i);

          //'W', 'X', 'Y', 'Z' symbols don't actually correspond to a turtle action
          if( step == 'F') {
            stroke(255, 60);
            for(var j=0; j < this.repeats; j++) {
              line(0, 0, 0, -this.drawLength);
              noFill();
              translate(0, -this.drawLength);
            }
            this.repeats = 1;
          }
          else if (step == '+') {
            rotate(this.theta);
          }
          else if (step == '-') {
            rotate(-this.theta);
          }
          else if (step == '[') {
            push();
          }
          else if (step == ']') {
            pop();
          }
        }
      }

function lotus(){
    stroke('rgb(255, 148, 0)');
    scale(0.65)
    rotate(f);
    smolrect(0.8);
    smolrect(-0.8);

    drawcircle();
    stroke('rgb(255,0,0)');
    // Draw a petal rotated 0 degrees
    petal(1);
    // Draw a petal rotated 20 degrees
    petal(1/4);
    // Draw a petal rotated 120 degrees
    petal(1/2);
    //Draw a petal rotated 270 degrees
    petal(3/4);

    f = f + 0.015; // Increase the step value to make the lotus spin faster (0.5 = insane, 0.005 = too slow)
    if (f > 2 * PI) {
      f = 0;
    }
  }

function petal(y){
  push(); // Start a new drawing state (translation, rotation, color, etc.)
    rotate(PI*y) // Rotates the canvas 120 degrees
    arc(-20, 20, 120, 120, PI + PI / 2, TWO_PI, OPEN);
    rotate(PI); // Further rotates the canvas 1500 degrees
    arc(-20, 20, 120, 120, PI + PI / 2, TWO_PI, OPEN);
  pop();
}

function smolrect(a){
  push();
    fill('rgba(255,255,255,0.5)');
    rect(-40,-40,80,80);
  pop();
  rotate(a);
}

function drawcircle(){
  push();
    fill('rgba(255,255,255,0.5)');
    ellipse(0,0,100,100);
    stroke('rgb(255, 148, 0)');
    fill('rgba(255, 240, 32, 0.50)');
    ellipse(0,0,20,20);
    fill('rgba(255, 206, 33, 0.60)');
    ellipse(0,0,10,10);
  pop();
  rotate(40);
}

function mandala(){

  outerSquare();
  scale(0.5);
  push();
  ds.render(20);
  pop();
  scale(2);
  outerCircle();
  flowerboi();
  innerSquare();
  smolcircles();
  gates();
  lotus();


}

function smolcircles() {
  rotate(0);
  //stroke('rgba(255,255,255,0.5)');
  push();
    fill('rgba(255, 148, 0,1)');
    ellipse(-35,-35,12,12);
    ellipse(35,-35,12,12);
    ellipse(-35,35,12,12);
    ellipse(35,35,12,12);
    noStroke();
    fill('rgba(255, 255, 255,0.3)');
    ellipse(-35,-35,5,5);
    ellipse(35,-35,5,5);
    ellipse(-35,35,5,5);
    ellipse(35,35,5,5);
  pop();
}

function flowerboi(){
  push();
  rotate(-f/2);
  for (var i = 0; i < 10; i ++) {
    stroke('rgba(255, 148, 0,1)');
    fill('rgba(255,255,255,0.65)');
    ellipse(0, 30, 20, 80);
    rotate(PI/5);
  }
  pop();

}

function innerSquare(){
  stroke('rgba(255,255,255,0.5)');
  push();
    fill('rgba(255, 148, 0,1)');
    rect(-49,-49,98,98);
  pop();
  noStroke();
  push();
    fill('rgba(16, 68, 20,0.65)');
    rect(-45,-45,90,90);
  pop();
}

function gates(){
  stroke(225,5,0);
  push();
    fill('rgba(16, 68, 20,0.5)');
    rect(-20,-40,40,30);
    rect(-40,-20,30,40);
    rect(10,-20,30,40);
    rect(-20,10,40,30);
    /*rect(-70,-20,30,40);
    rect(-40,-20,30,40);*/
  pop();
}

function triangles(){
  stroke(225,5,0);
  push();
    fill('rgba(16, 68, 20,0.5)');

  pop();
}

function outerCircle(){
  push();
    fill('rgba(255,0,0,0.75)');
    ellipse(0,0,140,140);
  pop();
}

function outerSquare(){
  push();
    fill('rgba(16, 68, 20,0.5)');
    rect(-75,-75,150,150);
  pop();
  rotate(0.0,0);
  push();
    fill('rgba(255, 170, 0,0.5)');
    rect(-70,-70,140,140);
  pop();
}
