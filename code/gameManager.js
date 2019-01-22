function GameManager (Manager) {
  this.htmlManager = new Manager;
  this.level = 1
  this.board = new Board(this.level);
  this.htmlManager.setBoard(this);
  this.totalPoints = 0;
  this.currentPoints = 1;
}

GameManager.prototype.flip = function (pos) {
  result = this.board.flip(pos)
  if (result == 0) {
    //Game Lost
  } else if (result != null) {
    this.currentPoints *= result;
    console.log(this.currentPoints);
    if (this.currentPoints == this.totalPoints) {
      this.gameWon();
    }
  }
  return result;
}

GameManager.prototype.gameWon = function () {
  this.level = Math.max(this.level+1, 7);
  this.board = new Board(this.level);
  this.htmlManager.setBoard(this);
}

//Might not need
GameManager.prototype.getTile = function (row, col) {
  return this.board.tiles[row][col].value
}