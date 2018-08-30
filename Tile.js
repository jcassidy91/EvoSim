var grid = [];
var mouseTileId = 0;
var tilesize = 50;
var numx;
var numy;

class Tile {
  constructor(id) {
    let coords = Tile.getTileCoords(id);
    this.x = coords.x;
    this.y = coords.y;
    this.id = id;
    this.color = color(255,255,255);
    this.type = this.constructor.name;
    this.F = 1000;
    this.traversible = true;
  }

  draw() {
    stroke(200);
    fill(this.color);
    rect(this.x, this.y, tilesize, tilesize);
    fill(0);
    text(round(this.F), this.x+10, this.y + 20);

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


  static createGrid(tilesize) {
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

function findPath() {
  let open = [];
  let closed = [];

  let start = grid.find(tile => tile instanceof StartTile);
  let end = grid.find(tile => tile instanceof EndTile);
  open.push(start);

  let current = start;

  let i = 0;
  while(current != end && i < 1000) {
    getFcost(open, start, end);
    open = open.filter(tile => tile != current);
    closed.push(current);

    ////////
    ////////
    i++;
  }
}

function getFcost(open, start, end) {
  for (let tile of open) {
    let G = dist(tile.x, tile.y, start.x, start.y);
    let H = dist(tile.x, tile.y, end.x, end.y);
    tile.F = G + H;
  }
}
