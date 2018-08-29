var grid = [];
var register = {};
var mouseTileId = 0;
var tilesize = 50;
var numx;
var numy;
var types;

function setup() {
  createCanvas(500, 500);
  numx = floor(width / tilesize);
  numy = floor(height / tilesize);
  for (let x = 0; x < numx; x++) {
    for (let y = 0; y < numy; y++) {
      let id = Tile.getGridId(x, y);
      if (random(4) > 1) {
        grid[id] = new Tile(id);
      } else {
        grid[id] = new Wall(id);
      }
    }
  }
}

function draw() {
  getMouseTileId();
  for (let g of grid) {
    g.draw();
  }
  if (register['S'.charCodeAt(0)]) {
    setStartTile(mouseTileId);
  }
  if (register['E'.charCodeAt(0)]) {
    setEndTile(mouseTileId);
  }
}

function getMouseTileId() {
  let mx = max(min(mouseX, width - tilesize), 0);
  let my = max(min(mouseY, height - tilesize), 0);
  mouseTileId = floor(mx / tilesize) + floor(my / tilesize) * numx;
}

function setStartTile() {
  if (grid[mouseTileId].type != "Tile") { return; }
  for(let g of grid) {
    if (g.type == "StartTile") {
      grid[g.id] = new Tile(g.id);
    }
  }
  grid[mouseTileId] = new StartTile(mouseTileId);
}

function setEndTile() {
  if (grid[mouseTileId].type != "Tile") { return; }
  for(let g of grid) {
    if (g.type == "EndTile") {
      grid[g.id] = new Tile(g.id);
    }
  }
  grid[mouseTileId] = new EndTile(mouseTileId);
}

function keyPressed() {
  register[keyCode] = true;
}

function keyReleased() {
  register[keyCode] = false;
}
