function GameManager (Manager) {
  this.htmlManager = new Manager;
  this.level = 1
  this.board = new Board(this.level);
  this.htmlManager.setBoard(this);
  this.totalCoins = 0;
  this.currentCoins = 0;
}

GameManager.prototype.flip = function (pos) {
  result = this.board.flip(pos)
  if (result == 0) {
    //Game Lost
  } else if (result != null) {
    this.currentCoins = (this.currentCoins ? this.currentCoins * result : result);
    this.htmlManager.setCurrentCoins(this.currentCoins);
    if (this.currentCoins == this.board.totalCoins) {
      this.gameWon();
    }
  }
  return result;
}

GameManager.prototype.gameWon = function () {
  this.htmlManager.gameWon(this.currentCoins, this);
}

GameManager.prototype.nextLevel = function () {
  this.totalCoins += this.currentCoins;
  this.htmlManager.setTotalCoins(this.totalCoins);
  this.currentCoins = 0;
  this.level = Math.min(this.level+1, 7);
  this.board = new Board(this.level);
  this.htmlManager.setBoard(this);
}

//Might not need
GameManager.prototype.getTile = function (pos) {
  return this.board.tiles[pos.row][pos.col].value
}