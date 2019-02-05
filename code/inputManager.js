function InputManager () {

}

InputManager.prototype.listen = function (manager) {

  var mapping = {
    38: 0, // Up
    39: 1, // Right
    40: 2, // Down
    37: 3, // Left

    87: 0, // W
    68: 1, // D
    83: 2, // S
    65: 3  // A
  }

  $(document).on("keydown", function (event) {
    var modifiers = event.altKey || event.ctrlKey || event.metaKey || event.shiftKey;
    var dir = mapping[event.which];

    if (!modifiers) {
      if (dir != undefined) {
        event.preventDefault();
        manager.updateCursorPos(dir);
      } else if (event.which == 13) {
        $(".cursor").trigger("click");
      }
    }
  });

}