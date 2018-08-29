class StartTile extends Tile {
  constructor(id) {
    super(id);
    this.color = color(100, 200, 100);
  }

  update() {
    super.update();
  }
}

class EndTile extends Tile {
  constructor(id) {
    super(id);
    this.color = color(255, 100, 100);
  }

  update() {
    super.update();
  }
}
