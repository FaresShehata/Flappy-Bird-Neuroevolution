const total = 100;
const mutationRate = 0.1;
let generation = 1;

let birds = [];
let deadBirds = [];
let pipes = [];
const gap = 175;
const interval = 150;
const speed = 2;

let score = 0;

let slider;

function setup() {
	createCanvas(400, 600);
	for (let i = 0; i < total; i++) {
		birds.push(new Bird());
	}



	slider = createSlider(1, 100, 1);

}

let frames = 0;

function draw() {
	for (let n = 0; n < slider.value(); n++) {


		for (let i = pipes.length - 1; i >= 0; i--) {

			pipes[i].update();

			if (pipes[i].offscreen()) pipes.splice(i, 1);

			for (let j = birds.length - 1; j >= 0; j--) {
				if (birds[j].hits(pipes[i])) {
					// gameOver();
					deadBirds.push(birds[j]);
					birds.splice(j, 1);
				}
			}
		}

		if (birds.length == 0) nextGeneration();


		if (frames > 100) {
			if ((frames % interval) - 30 == 0) {
				score++;
			}
		}
		if (frames % interval == 0) pipes.push(new Pipe());

		for (let i = birds.length - 1; i >= 0; i--) {
			birds[i].think(pipes);
			birds[i].update();
			if (birds[i].offscreen()) {
				deadBirds.push(birds[i]);
				birds.splice(i, 1);
			}
		}

		frames++;
	}

	// Drawing
	background(100, 150, 255);
	for (let bird of birds) bird.show();
	for (let pipe of pipes) pipe.show();
	showScore();
	showGeneration();
}

function showScore() {
	textAlign(CENTER, CENTER);
	stroke(0);
	strokeWeight(2);
	fill(255);
	textSize(40);
	text(score, width / 2, 50);
}

function showGeneration() {
	textAlign(LEFT, TOP);
	stroke(0);
	strokeWeight(2);
	fill(255);
	textSize(30);
	text("Generation " + generation, 0, 0);
}

// function gameOver() {
// 	textSize(100);
// 	stroke(0);
// 	strokeWeight(3);
// 	fill(255);
// 	text("HIT", width / 2, height / 2);
// 	noLoop();
// }

// function keyPressed() {
// 	if (key == ' ') bird.hop();
// }