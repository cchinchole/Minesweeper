var cols;
var rows;
var gameGrid;
var screenW = 400;
var screenH = 400;
var objectW = 40;
var clicked = 0;
var won = false;
var mines = 15;

function Generate2DArray(x, y) {
  var arr = new Array(x);
  for (var i = 0; i < arr.length; i++)
    arr[i] = new Array(y);
  return arr;
}

function setup()
{
  //Setup the canvas with an extra pixel to draw grid border correctly.
  createCanvas(screenW+1, screenH+1);
  //Make columns and rows based off object width.
  cols = floor(screenW / objectW);
  rows = floor(screenH / objectW);
  //Builds the game board array.
  gameGrid = Generate2DArray(cols, rows);
  //Inits the array with new cells.
  for(var i = 0; i < cols; i++)
    for(var j = 0; j < rows; j++)
      gameGrid[i][j] = new Cell(i, j);
  //Makes random cells bombs.
  for(var i = 0; i < mines; i++)
  {
    var x = Math.floor((Math.random() * cols));
    var y = Math.floor((Math.random() * rows));
    //If already a mine then just restart this loop.
    if(gameGrid[x][y].isMine)
      i--;
    gameGrid[x][y].isMine = true;
  }
  //Find neighbors for all cells.
  for(var i = 0; i < cols; i++)
    for(var j = 0; j < rows; j++)
      gameGrid[i][j].findNeighbors();

}

function draw()
{
  //White background.
  background(255);
  //Draws cells.
  for(var i = 0; i < cols; i++)
    for(var j = 0; j < rows; j++)
      gameGrid[i][j].draw();
  if(won)
  {
  //If there is a winstate then draw you win.
    textAlign(CENTER);
    fill(0,255,0);
    text("You Win", screenW*0.5, screenH*0.5-objectW*0.5);
  }
}

function keyPressed() {
  //If pressed 'F' then perform the cell flagging.
  //If pressed 'R' then restart the game.
  if(keyCode == 70)
  for(var i = 0; i < cols; i++)
    for(var j = 0; j < rows; j++)
      gameGrid[i][j].mouseClicked("right", mouseX, mouseY);
  else if(keyCode == 82)
      location.reload();
}

function mouseClicked()
{
  //Sends the mouse event to all cells.
  for(var i = 0; i < cols; i++)
    for(var j = 0; j < rows; j++)
      gameGrid[i][j].mouseClicked(mouseButton, mouseX, mouseY);
}
