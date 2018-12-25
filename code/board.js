function Board(size, rank) {
  this.size = size

  $.getJSON("code/levels.json", function(json) {
    data = json[rank][chance.natural({ min: 0, max: 4 })]
    this.setup(data)
  });
}

Board.prototype.setup = function (data) {
  /* 
  Generate board here using data [2s, 3s, bombs]
  Sum the numbers and pick that many random positions, then assign the tiles
  to those positions
  */

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
