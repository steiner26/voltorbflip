function GameManager (Manager) {
  this.htmlManager = new Manager;
  this.board = new Board(1);
  this.htmlManager.setBoard(this);
}

GameManager.prototype.flip = function (pos) {
  result = this.board.flip(pos)
  if (result == 0) {
    console.log("bomb");
    //Game is over
  } else if (result != null) {
    console.log(result)
    //Flip the tile
  }
}

GameManager.prototype.getTile = function (row, col) {
  return this.board.tiles[row][col].value
}