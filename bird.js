class Bird {

  constructor(brain) {
    this.x = 75;
    this.y = height / 2;
    this.w = 18;

    this.velocity = 0;
    this.gravity = 0.7;
    this.upforce = -15;

    this.score = 0;
    this.fitness = 0;

    if (brain) {
      this.brain = brain.copy();
    } else {
      this.brain = new NeuralNetwork(5, 8, 2);
    }
  }

  mutate() {
    // console.log("mutate");
    this.brain.mutate(mutationRate);
  }

  think(pipes) {

    let next = null;
    let nextd = Infinity;
    for (let i = 0; i < pipes.length; i++) {
      let d = (pipes[i].x + pipes[i].w) - (this.x - this.w);
      if (d < nextd && d > 0) {
        next = pipes[i];
        nextd = d;
      }
    }
    // console.log(next);

    let inputs = [];
    inputs[0] = map(this.y, 0, height, 0.01, 1);
    inputs[1] = map(next.top, 0, height, 0.01, 1);
    inputs[2] = map(next.bottom, 0, height, 0.01, 1);
    inputs[3] = map(next.x, 0, width, 0.01, 1);
    inputs[4] = map(this.velocity, -50, 20, 0.01, 1);
    // console.log(inputs);

    let output = this.brain.query(inputs);
    // console.log(output);
    if (output[0] > output[1]) this.hop();
  }

  hop() {
    this.velocity += this.upforce;
  }

  hits(pipe) {
    const xs = (
      this.x + this.w > pipe.x &&
      this.x - this.w < pipe.x + pipe.w);

    const top = (
      this.y - this.w < pipe.top);

    const bottom = (
      this.y + this.w > pipe.bottom);

    return (xs && (top || bottom));
  }

  offscreen() {
    return (this.y > height || this.y < 0);
  }

  update() {
    this.velocity += this.gravity;
    this.velocity *= 0.95;
    this.velocity = constrain(this.velocity, -50, 20);
    this.y += this.velocity;

    // if (this.y > height) {
    //   this.y = height;
    //   this.velocity = 0;
    // }
    // if (this.y < 0) {
    //   this.y = 0;
    //   this.velocity = 0;
    // }

    this.score++;
  }

  show() {
    stroke(0);
    strokeWeight(2);
    fill(255, 200, 0, 100);
    ellipse(this.x, this.y, this.w * 2);
  }
}