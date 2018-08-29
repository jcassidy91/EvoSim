function setup() {
  createCanvas(500, 500);
  Tile.createGrid(50);
}

function draw() {
  getMouseTileId();
  for (let g of grid) {
    g.draw();
  }
  if (Input.getKey('S')) {
    setStartTile(mouseTileId);
  }
  if (Input.getKey('E')) {
    setEndTile(mouseTileId);
  }
  if (Input.getKey(' ')) {
    findPath();
  }
}
