// This code draws a pink lotus on a white background and rotates it smoothly

/*--- Below are global variables ---*/
var x, y;
var f = 0;
var img;

function preload(){
  img = loadImage('buddha_bg.jpg'); // Loads an image of Buddha
}

/*--- setup() method is executed once ---*/
function setup() {
  createCanvas(720, 400); // Defines the size of the canvas (width, height) in pixels.
  x = width / 2;
  y = height;
}

/*--- draw() method is executed forever at a rate defined by frameRate() ---*/
function draw() {
  //background(255); // Sets the background color to white ( in essence erases everything we )
  image(img,-100,-110); //Positions the background to fit in the view
  //translate (width/2, height/2); // Moves the origin to the center of the Canvas
  translate (210, 340); //Translates the origin to the this location.
  //fill('rgba(243,142,174, 0.5)'); // Fills the shapes that follow this command.
  noStroke(); // Removes the outline for shapes that follow this command.
  scale(2); // Scales the drawing that follow this command by 2 times.
  rotate(f); // Rotates the drawing that follow this command f degrees.

  /*--- Draw a petal rotated 0 degrees ---*/
  push(); // Start a new drawing state (translation, rotation, color, etc.)
    fill('rgba(243,142,174, 0.5)'); // Fills the shapes that follow this command.
    arc(-20, 20, 80, 80, PI + PI / 2, TWO_PI, OPEN); // Draws an ARC
    rotate(PI); // Rotates the canvas 180 degrees
    arc(-20, 20, 80, 80, PI + PI / 2, TWO_PI, OPEN); // Draws the same ARC
  pop(); // Restore original drawing state

  /*--- Draw a petal rotated 45 degrees ---*/
  push(); // Start a new drawing state (translation, rotation, color, etc.)
    fill('rgba(243,142,174, 0.5)'); // Fills the shapes that follow this command.
    rotate(PI/4); // Rotates the canvas 45 degrees
    arc(-20, 20, 80, 80, PI + PI / 2, TWO_PI, OPEN);
    rotate(PI); // Further rotates the canvas 180 degrees
    arc(-20, 20, 80, 80, PI + PI / 2, TWO_PI, OPEN);
  pop(); // Restore original drawing state

  /*--- Draw a petal rotated 90 degrees ---*/
  push(); // Start a new drawing state (translation, rotation, color, etc.)
    fill('rgba(243,142,174, 0.5)'); // Fills the shapes that follow this command.
    rotate(PI/2); // Rotates the canvas 90 degrees
    arc(-20, 20, 80, 80, PI + PI / 2, TWO_PI, OPEN);
    rotate(PI); // Further rotates the canvas 180 degrees
    arc(-20, 20, 80, 80, PI + PI / 2, TWO_PI, OPEN);
  pop(); // Restore original drawing state

  /*--- Draw a petal rotated 270 degrees ---*/
  push(); // Start a new drawing state (translation, rotation, color, etc.)
    fill('rgba(243,142,174, 0.5)'); // Fills the shapes that follow this command.
    rotate(3 * PI/4); // Rotates the canvas 270 degrees
    arc(-20, 20, 80, 80, PI + PI / 2, TWO_PI, OPEN);
    rotate(PI); // Further rotates the canvas 180 degrees
    arc(-20, 20, 80, 80, PI + PI / 2, TWO_PI, OPEN);
  pop(); // Restore original drawing state

  /*--- Factor to control animation ---*/
  f = f + 0.01; // Increase the step value to make the lotus spin faster (0.5 = insane, 0.005 = too slow)
  if (f > 2 * PI) {
    f = 0;
  }

  }
