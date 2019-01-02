function Board (rank) {
  this.tiles = Array.from({ length: 5 }, (_, colIndex) => (
    Array.from({ length: 5 }, (_, rowIndex) => (
      new Tile ([colIndex, rowIndex], 1, false)
    ))
  ));

  data = levels[rank][chance.natural({ min: 0, max: 4 })]

  // $.getJSON("code/levels.json", function(json) {
  //   data = json[rank][chance.natural({ min: 0, max: 4 })];
  // });

  this.setup(data)
}

Board.prototype.setup = function (data) {
  var pos = chance.unique(function () {
    result = [];
    result.push(chance.natural({ min: 0, max: 4 }));
    result.push(chance.natural({ min: 0, max: 4 }));
    return result
  }, data[0]+data[1]+data[2], { comparator: function(arr, val) {
    return arr.reduce(function(acc, item) {
      return acc || (item[0] == val[0] && item[1] == val[1]);
    }, false)
  }});
  for (i = 0; i < data[0]; i++) {
    this.tiles[pos[i][0]][pos[i][1]] = new Tile(pos[i], 2, false)
  }
  for (i = i; i < data[0]+data[1]; i++) {
    this.tiles[pos[i][0]][pos[i][1]] = new Tile(pos[i], 3, false)
  }
  for (i = i; i < data[0]+data[1]+data[2]; i++) {
    this.tiles[pos[i][0]][pos[i][1]] = new Tile(pos[i], 0, false)
  }

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
  if (result = this.tiles[pos.row][pos.col].flip()) {
    console.log(result);
    // result is the value of the flipped tile [0..3]
  } 
}
