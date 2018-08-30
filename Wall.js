class Wall extends Tile {
  constructor(id) {
    super(id);
    this.color = color(100, 100, 150);
    this.traversible = false;
  }

  update() {
    super.update();
  }
}
