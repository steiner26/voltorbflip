function Tile(position, value, flipped) {
  this.x = position[0]
  this.y = position[1]
  this.value = value
  this.isFlipped = flipped
}

Tile.prototype.flip = function () {
  if (this.isFlipped) { 
    return null 
  } else {
    this.isFlipped = true; 
    return this.value
  } 
}

Tile.prototype.toString = function () {
  return this.isFlipped ? this.value.toString() : "X"
}