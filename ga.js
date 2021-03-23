function nextGeneration() {

  calculateFitness();

  for (let i = 0; i < total; i++)
    birds.push(pickOne());
  pipes = [];
  pipes.push(new Pipe());
  deadBirds = [];
  frames = 1;
  score = 0;
  offset = 0;
  generation++;
}

function pickOne() {

  let index = 0;
  let r = random(1);

  while (r > 0) {
    r -= deadBirds[index].fitness;
    index++;
  }
  index--;


  let bird = deadBirds[index];
  let child = new Bird(bird.brain);
  child.mutate();
  return child;
}

function calculateFitness() {
  let sum = 0;
  for (let bird of deadBirds) sum += bird.score;
  for (let bird of deadBirds) bird.fitness = bird.score / sum;
}