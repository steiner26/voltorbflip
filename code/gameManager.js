function GameManager (Manager) {
  this.htmlManager = new Manager;
  this.level = 1
  this.board = new Board(this.level);
  this.htmlManager.setBoard(this);
  this.totalPoints = 0;
  this.currentPoints = 0;
}

GameManager.prototype.flip = function (pos) {
  result = this.board.flip(pos)
  if (result == 0) {
    //Game Lost
  } else if (result != null) {
    this.currentPoints = (this.currentPoints ? this.currentPoints * result : result);
    if (this.currentPoints == this.board.totalPoints) {
      this.gameWon();
    }
  }
  return result;
}

GameManager.prototype.gameWon = function () {
  this.htmlManager.gameWon(this.currentPoints, function () {
    this.totalPoints += this.currentPoints;
    this.currentPoints = 0;
    this.level = Math.min(this.level+1, 7);
    this.board = new Board(this.level);
    this.htmlManager.setBoard(this);
  });

}

//Might not need
GameManager.prototype.getTile = function (pos) {
  return this.board.tiles[pos.row][pos.col].value
}