function GameManager (Manager) {
  this.htmlManager = new Manager;
  this.board = new Board(1);
  this.htmlManager.setBoard(this);
}

GameManager.prototype.flip = function (pos) {
  result = this.board.flip(pos)
  if (result == 0) {
    //Game is over
  } else if (result != null) {
    //Flip the tile
  }
  return result;
}

GameManager.prototype.getTile = function (row, col) {
  return this.board.tiles[row][col].value
}