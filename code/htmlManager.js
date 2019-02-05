function HTMLManager () {
  this.boardContainer = document.querySelector(".board-container");
  this.scoreContainer = document.querySelector(".score-container");
  // this.bestContainer    = document.querySelector(".best-container");
  this.messageContainer = document.querySelector(".game-message");
  this.rowsInfoContainer = document.querySelector(".info_rows");
  this.colsInfoContainer = document.querySelector(".info_cols");

  this.gameOver = false;

  if (("ontouchstart" in window) || window.navigator.msMaxTouchPoints > 0) { //supports touch
    this.cursorPos = null;
  } else {
    this.resetCursor();
  }
  new InputManager().listen(this);

  for  (r = 0; r < 5; r++) {
    for (c = 0; c < 5; c++) {
      var tile = this.boardContainer.children[r].children[c];
      tile.pos = {row:r, col:c};
    }
  }
}

HTMLManager.prototype.setBoard = function (manager) {
  $(".tile_back").removeClass("tile_back_bomb tile_back_1 tile_back_2 tile_back_3");
  $(".tile").each(function () {
    if ((value = manager.getTile(this.pos)) == 0) {
      this.children[1].classList.add("tile_back_bomb");
    } else {
      this.children[1].classList.add("tile_back_"+value.toString());
    }
  });

  for (i = 0; i < 5; i++) {
    var Rinfo = this.rowsInfoContainer.children[i];
    Rinfo.children[0].innerHTML = this.extend(manager.board.rowsInfo[i].points, 2);
    Rinfo.children[1].innerHTML = manager.board.rowsInfo[i].bombs.toString();

    var Cinfo = this.colsInfoContainer.children[i];
    Cinfo.children[0].innerHTML = this.extend(manager.board.colsInfo[i].points, 2);
    Cinfo.children[1].innerHTML = manager.board.colsInfo[i].bombs.toString();
  }

  document.getElementById("level").innerHTML = manager.level.toString();
  document.getElementById("current-coins").innerHTML = "00000";
}

HTMLManager.prototype.addListeners = function (manager) {
  hm = this;
  $(".tile_front").addClass("clickable");
  $(".tile").off();
  $(".tile").on("click", function () {
    this.classList.add('is-flipped');
    manager.flip(this.pos);
    hm.setCursor(this.pos);
  });
}

HTMLManager.prototype.extend = function (n, places) {
  if (n == 0) {
    return "0".repeat(places);
  }
  var num0 = Math.ceil(Math.log10(Math.pow(10, places-1)/n));
  return (num0 >= 0 ? "0".repeat(num0) + n.toString() : n.toString());
}

HTMLManager.prototype.setCurrentCoins = function (coins) {
  current = parseInt(document.querySelector("#current-coins").innerHTML);
  if (coins > current) {
    var hm = this;
    for (i = current+1; i<=coins; i++) {
      setTimeout(function (x) {
      document.querySelector("#current-coins").innerHTML = hm.extend(x, 5);
      }, 5*(i-current), i);
    }
  } else {
    document.querySelector("#current-coins").innerHTML = this.extend(coins, 5);
  }
}

HTMLManager.prototype.setTotalCoins = function (coins) {
  current = parseInt(document.querySelector("#total-coins").innerHTML);
  if (coins > current) {
    var hm = this;
    for (i = current+1; i<=coins; i++) {
      setTimeout(function (x) {
      document.querySelector("#total-coins").innerHTML = hm.extend(x, 5);
      }, 5*(i-current), i);
    }
  } else {
    document.querySelector("#total-coins").innerHTML = this.extend(coins, 5);
  }
}

HTMLManager.prototype.displayCursor = function () {
  $(".tile").removeClass("cursor");
  if (pos = this.cursorPos) {
    if (pos.col < 5) {
      this.boardContainer.children[pos.row].children[pos.col].classList.add("cursor");
    } else {
      //set cursor on memo button
    }
  } 
}

HTMLManager.prototype.clearCursor = function () {
  $(".tile").removeClass("cursor");
}

HTMLManager.prototype.updateCursor = function (dir) {
  if (this.cursorPos && !this.gameOver) {
    switch (dir) {
      case 0: //up
      case 2: //down
        if (this.cursorPos.col != 5) {
          this.cursorPos.row = (this.cursorPos.row + (dir-1) + 5)%5;
        }
        break;
      case 1: //right
      case 3: //left
        this.cursorPos.col = (this.cursorPos.col + (-dir+2) + 6)%6;
        break;
    }
    this.displayCursor();
  } else if (!this.gameOver) {
    this.cursorPos = {row:0, col:0};
    this.displayCursor();
  }
}

HTMLManager.prototype.setCursor = function (pos) {
  this.cursorPos = {row:pos.row, col:pos.col};
  this.displayCursor()
}

HTMLManager.prototype.resetCursor = function () {
  this.cursorPos = {row:0, col:0};
  this.displayCursor();
}

HTMLManager.prototype.gameOverMessage = function (coins, win, manager) {
  this.gameOver = true;
  if (coins) {
    this.messageContainer.innerHTML = "Game clear! You received " + coins.toString() + " Coin(s)!";
  } else {
    this.messageContainer.innerHTML = "Oh no! you get 0 Coins!";
  }
  $(".game-message").toggleClass("fadeIn animated hidden clickable");
  $(".tile_front").removeClass("clickable");
  $(".tile").off();
  var hm = this;
  setTimeout(function () {
    hm.clearCursor();
    $(document).one("click", function () {
      $(".game-message").toggleClass("fadeIn animated hidden clickable");
      $(".tile").addClass("is-flipped");
      setTimeout(function () {
        $(document).one("click", function () {
          $(".tile").removeClass("is-flipped");
          manager.nextLevel(win);
        });
      }, 100);
    });
  }, 100);
}

HTMLManager.prototype.displayNextLevel = function (nextlevel, difference, manager) {
  if (difference > 0) {
    this.messageContainer.innerHTML = "Advanced to Game Lv. " + nextlevel.toString() + "!";
  } else if (difference < 0) {
    this.messageContainer.innerHTML = "Dropped to Game Lv. " + nextlevel.toString() + "!";
  } else {
    this.messageContainer.innerHTML = "Ready to play Game Lv. " + nextlevel.toString() + "!";
  }
  $(".game-message").toggleClass("fadeIn animated hidden");
  var hm = this;
  $(document).one("click", function () {
    $(".game-message").addClass("hidden");
    hm.addListeners(manager);
    hm.gameOver = false;
    hm.resetCursor();
  });
  setTimeout(function () {
    $(".game-message").toggleClass("fadeIn fadeOut");
    setTimeout(function () {
      $(".game-message").toggleClass("fadeOut animated");
      $(".game-message").addClass("hidden");
      if (hm.gameOver) {
        hm.addListeners(manager);
        hm.gameOver = false;
        hm.resetCursor();
      }
    }, 900)
  }, 1500);
}