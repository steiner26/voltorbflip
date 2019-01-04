function HTMLManager () {
  this.boardContainer    = document.querySelector(".board-container");
  this.scoreContainer   = document.querySelector(".score-container");
  // this.bestContainer    = document.querySelector(".best-container");
  this.messageContainer = document.querySelector(".game-message");
}

HTMLManager.prototype.setBoard = function (manager) {
  for  (r = 0; r < 5; r++) {
    for (c = 0; c < 5; c++) {
      var tile = this.boardContainer.children[r].children[c]
      tile.pos = {row:r, col:c}
      tile.addEventListener("click", function () {
        this.classList.add('is-flipped');
        manager.flip(this.pos);
      });
    }
  }
}

