function GameManager (Manager) {
  this.htmlManager = new Manager;
  this.board = new Board(1);
  this.htmlManager.setBoard(this.board);
}