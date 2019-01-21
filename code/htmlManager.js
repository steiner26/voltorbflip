function HTMLManager () {
  this.boardContainer    = document.querySelector(".board-container");
  this.scoreContainer   = document.querySelector(".score-container");
  // this.bestContainer    = document.querySelector(".best-container");
  this.messageContainer = document.querySelector(".game-message");
}

HTMLManager.prototype.setBoard = function (manager) {
  for  (r = 0; r < 5; r++) {
    for (c = 0; c < 5; c++) {
      var tile = this.boardContainer.children[r].children[c];
      tile.pos = {row:r, col:c};
      tile.addEventListener("click", function () {
        this.classList.add('is-flipped');
        if ((value = manager.flip(this.pos)) == 0) {
          this.children[1].classList.add("tile_back_bomb");
        } else {
          this.children[1].classList.add("tile_back_"+value.toString());
        }
        // switch (manager.flip(this.pos)) {
        //   case 0:
        //     this.children[1].classList.add("tile-bomb");
        //     break;
        //   case 1:
        //     this.children[1].classList.add("tile-1");
        //     break;
        //   case 2:
        //     this.children[1].classList.add("tile-2");
        //     break;
        //   case 3:
        //     this.children[1].classList.add("tile-3");
        //     break;
        // }
      });
    }
  }
}

