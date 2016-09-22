var mover;
var boids = [];
var numBoids = 50;

var attractors = [];
var numAtt = 1;

var repellers = [];
var numRep = 1;

var bullet;
var bullets = [];

var bulletVars = [];
var t = false;

var state = -1;
var g = 1;

function setup() {
	var cnv = createCanvas(900, 800);
	var x = (windowWidth - width) / 2;
	var y = (windowHeight - height) / 2;
	cnv.position(x, y);
	fill(200, 200, 0);

	//attractor = new Mover(false);
	Repeller.prototype = new Mover();
	Boid.prototype = new Mover();
	Attractor.prototype = new Mover();
	//Boid.prototype.constructor = Boid;
	r1 = new Repeller();
	b1 = new Boid(); // this must come after inherittance to receive
	a1 = new Attractor();

	loadBoids();
}

function draw() {
	//background(62);
	push();
	fill(120, 120, 140, 25);
	rect(0, 0, width, height);
	pop();

	for (var i = 0; i < boids.length; i++) {
		boids[i].run();
	}
	for (var i = 0; i < attractors.length; i++) {
		attractors[i].run();
		//a1.run();
	}
	for (var i = 0; i < repellers.length; i++) {
		repellers[i].run();
		//r1.run();
	}

	for (var i = 0; i < bullets.length; i++){
		if (bullets[i].isClicked === true){
			bullets[i].run();
		}
	}
}

function changeReppelrForce() {
	r1.force = createVector(random(-1, 1), random(-1, 1));
}
setInterval(changeReppelrForce, 1000);

function loadBoids() {
	for (var i = 0; i < numBoids; i++) {
		boids.push(new Boid());
	}
	for (var i = 0; i < numAtt; i++) {
		attractors.push(new Attractor());
	}
	for (var i = 0; i < numRep; i++) {
		repellers.push(new Repeller());
	}

}

function mousePressed() {
	bullets.push(new Bullet(mouseX, mouseY));
	bullets[bullets.length-1].isClicked = true;
}

function keyPressed(){
	if (keyCode == 32) {
		state *= -1;

		if (g === 1){
			attractors[0].color = color(255,0,0);
		} else {
			attractors[0].color = color(255);
		}
		g *= -1;
	}
}


// Boid.prototype.render = function() {
// 	fill(200, 30, 150);
// 	ellipse(this.loc.x, this.loc.y, 30, 30);
// }
