var path = [];

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

  for (let step of path) {
    stroke(255,0,0);
    line(step.x+tilesize/2, step.y+tilesize/2, Tile.getTile(step.parent).x+tilesize/2, Tile.getTile(step.parent).y+tilesize/2);
  }
}
