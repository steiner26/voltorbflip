function Tile (position, value, flipped) {
  this.x = position.x
  this.y = position.y
  this.value = value
  this.isFlipped = flipped
}

Tile.prototype.flip = function () {
  if (this.isFlipped) { 
    return null 
  }
  this.isFlipped = true; 
  return this.value;
}

Tile.prototype.toString = function () {
  return this.isFlipped ? this.value.toString() : " "
}