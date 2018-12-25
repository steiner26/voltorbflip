function Board(size, rank) {
  this.size = size

  this.tiles = this.genTiles(rank)
  this.setup(rank)
}

Board.prototype.getTiles = function (rank) {
  var data = ""
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      data = JSON.parse(this.responseText);
    }
  };
  xhttp.open("GET", "levels.json", true);
  xhttp.send();
}

Board.prototype.setup = function () {
  var sums = []
  for (r = 0; r < this.size; r++) {
    p = 0; b = 0;
    for (c = 0; c < this.size; c++) {
      tile = this.tiles[r][c]
      (v = tile.value) ? p += v : b += 1;
    }
    sums.push(new Info(p, b))
  }
  this.rowsinfo = sums

  var sums = []
  for (c = 0; c < this.size; c++) {
    p = 0; b = 0;
    for (r = 0; r < this.size; r++) {
      tile = this.tiles[r][c]
      (v = tile.value) ? p += v : b += 1;
    }
    sums.push(new Info(p, b))
  }
  this.colsinfo = sums
}
