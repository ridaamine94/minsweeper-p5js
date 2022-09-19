const difficulties = {
  "Easy": 16,
  "Medium": 22,
  "Hard": 30,
  "Expert": 36
};

let chosenDifficulty = "Easy";
let totalNumbersOfMines = 1;

function changeToEasy(){
  chosenDifficulty = "Easy";
  totalNumbersOfMines = 8;
  createGrid();
}

function changeToMedium(){
  chosenDifficulty = "Medium";
  totalNumbersOfMines = 12;
  createGrid();
}

function changeToHard(){
  chosenDifficulty = "Hard";
  totalNumbersOfMines = 16;
  createGrid();
}

function changeToExpert(){
  chosenDifficulty = "Expert";
  totalNumbersOfMines = 22;
  createGrid();
}

let grid;

function setup() {
  for (let element of document.getElementsByClassName("p5Canvas")) {
    element.addEventListener("contextmenu", (e) => e.preventDefault());
  }
  createCanvas(600, 600);
  button = createButton('Easy');
  button.position(12, 15);
  button.mousePressed(changeToEasy);

  button = createButton('Medium');
  button.position(70, 15);
  button.mousePressed(changeToMedium);

  button = createButton('Hard');
  button.position(140, 15);
  button.mousePressed(changeToHard);

  button = createButton('Expert');
  button.position(190, 15);
  button.mousePressed(changeToExpert);

  createGrid();
}

function createGrid(){
  grid = new Grid(300, 20);
  grid.initialize();
}

function mousePressed() {
  if(mouseButton == LEFT)
  {
    grid.revealCell(mouseX, mouseY);
  }
  else
  {
    grid.markCell(mouseX, mouseY);
  }
}

let button;

function draw() {
  clear();
  background(255);
  text("Choose Difficulty : ", 10, 10);
  grid.display();
}
