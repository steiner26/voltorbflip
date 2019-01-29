function Tile (position, value, flipped) {
  this.x = position.x
  this.y = position.y
  this.value = value
  this.isFlipped = flipped
}

Tile.prototype.flip = function () {
  this.isFlipped = true; 
}

Tile.prototype.toString = function () {
  return this.isFlipped ? this.value.toString() : "X"
}