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
  var start = grid.find(x => x instanceof StartTile);
  var end = grid.find(x => x instanceof EndTile);

  var open = [];
  var closed = [];
  open.push(start);
  var current = start;

  var i = 0;
  while (current != end || i < 1000) {
    calcFCost(open, start, end);
    current = findLowestFCost(open);
    open = open.filter(x => x != current);

    closed.push(current);

    if (!current) {return;}
    if (current == end) { return getPath(start, end); }

    let neighbors = getNeighbors(current.id);
    for(let n of neighbors) {
      if (closed.find(x => x === n)) {continue;}
      if (!open.find(x => x === n)) {
        n.parent = current.id;
        open.push(n);
      }
    }

    i++;
  }
  console.log("no path found");
  return false;
}

function calcFCost(open, start, end) {
  for (let o of open) {
    let G = dist(o.x, o.y, start.x, start.y);
    let H = dist(o.x, o.y, end.x, end.y);
    o.F = G + H;
  }
}

function findLowestFCost(open) {
  let nodes = open.sort((a,b) => {return (a.F > b.F) ? 1 : -1})
  return nodes[0];
}

function getNeighbors(id) {
  let neighbors = [];

  let row = floor(id / numx);
  let col = id - numx * row;

  for (let i = col - 1; i <= col + 1; i++) {
    for (let j = row - 1; j <= row + 1; j++) {
      if (j < 0 || j > numy - 1) {continue;}
      if (i < 0 || i > numx - 1) {continue;}

      let id = Tile.getGridId(i, j);
      if (grid[id].traversible)
        neighbors.push(grid[id]);
    }
  }
  return neighbors;
}

function getPath(from, to) {
  let path = [];

  let par = to
  let i = 0;
  while (par != from && i < 1000) {
    path.push(par);
    if (par && par.parent)
    par = Tile.getTile(par.parent);
    i++;
  }
  return path;
}
