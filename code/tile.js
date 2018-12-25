function Tile(position, value, flipped) {
  this.x = position.x
  this.y = position.y
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