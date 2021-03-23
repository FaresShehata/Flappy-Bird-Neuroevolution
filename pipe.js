class Pipe {

  constructor() {
    this.x = width;
    this.y = 0;
    this.w = 50;
    this.top = random(0, height - gap);
    this.bottom = this.top + gap;
  }

  update() {
    this.x -= speed;
  }

  offscreen() {
    return (this.x < -1000);
  }

  show() {
    noStroke();
    fill(50, 255, 50);
    rectMode(CORNER);
    rect(this.x, this.y, this.w, this.top);
    rect(this.x, this.bottom, this.w, height - this.bottom);
  }
}