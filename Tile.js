class Tile {
  constructor(id) {
    let coords = Tile.getTileCoords(id);
    this.x = coords.x;
    this.y = coords.y;
    this.id = id;
    this.color = color(255,255,255);
    this.type = this.constructor.name
  }

  draw() {
    stroke(200);
    fill(this.color);
    rect(this.x, this.y, tilesize, tilesize);
  }

  update() {
    draw();
  }

  static getGridId(col, row) {
    return col + numx * row;
  }

  static getTileCoords(id) {
    let y = floor(id / numx);
    let x = id - numx * y;
    return {x: x * tilesize, y: y * tilesize};
  }

  static getTile(id) {
    return grid[id];
  }

  static getTileColRow(col, row) {
    let id = Tile.getGridId(col, row);
    return grid[id];
  }
}
