function HTMLManager () {
  this.boardContainer = document.querySelector(".board-container");
  this.scoreContainer = document.querySelector(".score-container");
  // this.bestContainer    = document.querySelector(".best-container");
  this.messageContainer = document.querySelector(".game-message");
  this.rowsInfoContainer = document.querySelector(".info_rows");
  this.colsInfoContainer = document.querySelector(".info_cols");

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
    Rinfo = this.rowsInfoContainer.children[i];
    Rinfo.children[0].innerHTML = this.extend(manager.board.rowsInfo[i].points, 2);
    Rinfo.children[1].innerHTML = manager.board.rowsInfo[i].bombs.toString();

    Cinfo = this.colsInfoContainer.children[i];
    Cinfo.children[0].innerHTML = this.extend(manager.board.colsInfo[i].points, 2);
    Cinfo.children[1].innerHTML = manager.board.colsInfo[i].bombs.toString();
  }

  document.getElementById("level").innerHTML = manager.level.toString();
  document.getElementById("current-coins").innerHTML = "00000";
}

HTMLManager.prototype.addListeners = function (manager) {
  $(".tile_front").addClass("clickable");
  $(".tile").off();
  $(".tile").on("click", function () {
    this.classList.add('is-flipped');
    manager.flip(this.pos);
  });
}

HTMLManager.prototype.extend = function (n, places) {
  if (n == 0) {
    return "0".repeat(places);
  }
  num0 = Math.ceil(Math.log10(Math.pow(10, places-1)/n));
  return (num0 >= 0 ? "0".repeat(num0) + n.toString() : n.toString());
}

HTMLManager.prototype.setCurrentCoins = function (coins) {
  current = parseInt(document.querySelector("#current-coins").innerHTML);
  if (coins > current) {
    hm = this;
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
    hm = this;
    for (i = current+1; i<=coins; i++) {
      setTimeout(function (x) {
      document.querySelector("#total-coins").innerHTML = hm.extend(x, 5);
      }, 5*(i-current), i);
    }
  } else {
    document.querySelector("#total-coins").innerHTML = this.extend(coins, 5);
  }
}

HTMLManager.prototype.gameOverMessage = function (coins, win, manager) {
  if (coins) {
    this.messageContainer.innerHTML = "Game clear! You received " + coins.toString() + " Coin(s)!";
  } else {
    this.messageContainer.innerHTML = "Oh no! you get 0 Coins!";
  }
  $(".game-message").toggleClass("fadeIn animated hidden clickable");
  $(".tile_front").removeClass("clickable");
  $(".tile").off();
  setTimeout(function () {
    $("body").one("click", function () {
      $(".game-message").toggleClass("fadeIn animated hidden clickable");
      $(".tile").addClass("is-flipped");
      setTimeout(function () {
        $("body").one("click", function () {
          $(".tile").removeClass("is-flipped");
          win ? manager.levelUp() : manager.levelDown();
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
  hm = this;
  $("body").one("click", function () {
    $(".game-message").addClass("hidden");
    hm.addListeners(manager);
  });
  setTimeout(function () {
    $(".game-message").toggleClass("fadeIn fadeOut");
    setTimeout(function () {
      $(".game-message").toggleClass("fadeOut animated");
      $(".game-message").addClass("hidden");
      hm.addListeners(manager);
    }, 900)
  }, 1500);
}