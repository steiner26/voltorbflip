function Board (rank) {
  //set tiles to a 5x5 array of 1 tiles
  this.tiles = Array.from({ length: 5 }, (_, colIndex) => (
    Array.from({ length: 5 }, (_, rowIndex) => (
      new Tile ([colIndex, rowIndex], 1, false)
    ))
  ));

  //read 2/3/bomb data from levels and set up board
  data = levels[rank][chance.natural({ min: 0, max: 4 })];
  this.totalpoints = Math.pow(2, data[0]) + Math.pow(3, data[1]);
  this.setup(data);
}

Board.prototype.setup = function (data) {
  //pick random spots for each 2/3/bomb on this board
  var spots = chance.unique(function () {
    result = {};
    result.x = (chance.natural({ min: 0, max: 4 }));
    result.y = (chance.natural({ min: 0, max: 4 }));
    return result
  }, data[0]+data[1]+data[2], { comparator: function(arr, val) {
    return arr.reduce(function(acc, item) {
      return acc || (item.x == val.x && item.y == val.y);
    }, false)
  }});

  //place 2/3/bomb tiles onto the board
  for (i = 0; i < data[0]; i++) {
    this.tiles[spots[i].x][spots[i].y] = new Tile(spots[i], 2, false)
  }
  for (i = i; i < data[0]+data[1]; i++) {
    this.tiles[spots[i].x][spots[i].y] = new Tile(spots[i], 3, false)
  }
  for (i = i; i < data[0]+data[1]+data[2]; i++) {
    this.tiles[spots[i].x][spots[i].y] = new Tile(spots[i], 0, false)
  }

  //calculate the info for the rows and columns
  var rsums = [];
  for (r = 0; r < 5; r++) {
    p = 0; b = 0;
    for (c = 0; c < 5; c++) {
      tile = this.tiles[r][c];
      (v = tile.value) ? p += v : b += 1;
    }
    rsums.push(new Info(p, b))
  }
  this.rowsinfo = rsums

  var csums = [];
  for (c = 0; c < 5; c++) {
    p = 0; b = 0;
    for (r = 0; r < 5; r++) {
      tile = this.tiles[r][c];
      (v = tile.value) ? p += v : b += 1;
    }
    csums.push(new Info(p, b));
  }
  this.colsinfo = csums
}

Board.prototype.flip = function (pos) {
  return this.tiles[pos.row][pos.col].flip();
}