

function Cell(indexC, indexR)
{
  this.columnIndex = indexC;
  this.rowIndex = indexR;
  this.xPos = this.columnIndex*objectW;
  this.yPos = this.rowIndex*objectW;
  this.isMine = false;
  this.isClicked = false;
  this.neighboringCells = 0;
  this.isFlagged = false;

//This will find if neighboringCells are bombs.
this.findNeighbors = function()
{
  //If this cell is a bomb then no need to find neighbors.
  if(this.isMine)
  {
    this.neighboringCells = -1;
    return;
  }

for(var i = -1; i <= 1; i++)
  for(var j = -1; j <= 1; j++)
  {
    //Checks the surrounding cells :: 9 cells
    var x = this.columnIndex+i;
    var y = this.rowIndex+j;
    //Make sure the corner cells don't check against null cells.
    if(x > -1 && x < rows && y < cols && y > -1)
    {
    //If it is a mine then increase neighor count.
      if(gameGrid[x][y].isMine)
      {
        this.neighboringCells++;
      }
    }
  }
}

//Checks if cells are zereos to show them.
this.findZeroes = function()
{
    //loop through the surrounding neighbor cells.
    for(var i = -1; i <= 1; i++)
      for(var j = -1; j <= 1; j++)
      {
        var x = this.columnIndex+i;
        var y = this.rowIndex+j;
        //Check we don't call null cells.
        if(x > -1 && x < rows && y < cols && y > -1)
        {
          //Check if it has 0 neighboring bombs and it hasn't been clicked.
          if(this.neighboringCells > 0 && gameGrid[this.columnIndex+i][this.rowIndex+j].neighboringCells == 0 && !gameGrid[this.columnIndex+i][this.rowIndex+j].isClicked)
            gameGrid[this.columnIndex+i][this.rowIndex+j].mouseClicked(-1, -1, -1);
          else if(this.neighboringCells == 0 && !gameGrid[this.columnIndex+i][this.rowIndex+j].isMine && !gameGrid[this.columnIndex+i][this.rowIndex+j].isClicked)
            gameGrid[this.columnIndex+i][this.rowIndex+j].mouseClicked(-1, -1, -1);
        }
      }
}

this.mouseClicked = function(state, x, y)
{
  //Check for mouse collision
  if((x > this.xPos && x < this.xPos + objectW && y > this.yPos && y < this.yPos + objectW) || x == -1 && y == -1)
  {
    if(state == "left" || state == -1)
    {
      //If it was left click or programmatically clicked then findzereos and check for win condition.
      if(!this.isFlagged)
      {
        this.isClicked = true;
        this.findZeroes();
        clicked++;
        if(clicked == ((cols*rows)-mines) )
        won = true;
      }
    }
    //If right clicked or programmatically right clicekd then flag the cell.
    else if(state == "right")
    {
      this.isFlagged = !this.isFlagged;
    }
  }
}

this.draw = function()
{
    //Draw grid.
    stroke(0);
    noFill();
    rect(this.xPos, this.yPos, objectW, objectW);
    if(this.isClicked)
    {
      //If this cell is a mine then draw a circle, perform a game over, and expose all cells.
      if(this.isMine)
      {
        ellipse(this.xPos + objectW*0.5, this.yPos + objectW*0.5, objectW*0.5, objectW*0.5);
        for(var i = 0; i < cols;i++)
          for(var j = 0; j < rows; j++)
            gameGrid[i][j].mouseClicked(-1, -1, -1);
        textAlign(CENTER);
        fill(255,0,0);
        text("Game Over", screenW*0.5, screenH*0.5-objectW*0.5);
        won = false;
      }
      else
      {
        stroke(0);
        fill(230);
        rect(this.xPos, this.yPos, objectW, objectW);
        if(this.neighboringCells > 0)
        {
          //Checks the neighboringCells and gives a color for text based on it
          textAlign(CENTER);
          stroke(0);
          switch(this.neighboringCells)
          {
            case 1:
              fill(0, 0, 255);
              break;
            case 2:
              fill(0, 255, 0);
              break;
            case 3:
              fill(255, 255, 0);
              break;
            case 4:
              fill(255, 0, 0);
            default:
              fill(255, 0, 255);
              break;
        }
        //Draws the number.
        text(this.neighboringCells, this.xPos + objectW*0.5, this.yPos + objectW*0.5);
        }
      }
  }
  //If flagged then draw a red circle.
  else if(this.isFlagged)
  {
    stroke(255, 0, 0);
    ellipse(this.xPos + objectW*0.5, this.yPos + objectW*0.5, objectW*0.5, objectW*0.5);
  }

}
}
