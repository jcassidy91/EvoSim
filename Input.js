var register = {};

function keyPressed() {
  register[keyCode] = true;
}

function keyReleased() {
  register[keyCode] = false;
}

class Input {
  static getKey(name) {
    return register[name.charCodeAt(0)];
  }
}
