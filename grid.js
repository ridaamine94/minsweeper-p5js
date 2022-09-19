class Grid {
  constructor(w, cellSize) {
    let size = floor(w / cellSize);
    let grid = new Array(size);
    for (let i = 0; i < size; i++) {
      grid[i] = new Array(size);
    }
    this.grid = grid;
    this.cellSize = cellSize;
  }

  initialize() {
    for (var i = 0; i < this.grid.length; i++) {
      for (var j = 0; j < this.grid.length; j++) {
        this.grid[i][j] = new Cell(
          (i + 2) * this.cellSize,
          (j + 2) * this.cellSize,
          this.cellSize
        );
      }
    }

    // Pick totalBees spots
    var options = [];
    for (var i = 0; i < this.grid.length; i++) {
      for (var j = 0; j < this.grid.length; j++) {
        options.push([i, j]);
      }
    }


    for (var n = 0; n < difficulties[chosenDifficulty]; n++) {
      var index = floor(random(options.length));
      var choice = options[index];
      var i = choice[0];
      var j = choice[1];
      // Deletes that spot so it's no longer an option
      options.splice(index, 1);
      this.grid[i][j].mine = true;
    }

    for (var i = 0; i < this.grid.length; i++) {
      for (var j = 0; j < this.grid.length; j++) {
        if (this.grid[i][j].mine) {
          continue;
        }

        for (var k = -1; k <= 1; k++) {
          for (var l = -1; l <= 1; l++) {
            var neighborsX = i + k;
            var neighborsY = j + l;
            if(neighborsX < 0 || neighborsY < 0 || neighborsX >= this.grid.length || neighborsY >= this.grid.length){
              continue;
            }

            this.grid[i][j].value += this.grid[neighborsX][neighborsY].mine ? 1 : 0;
          }
        }
      }
    }
  }

  display() {
    for (var i = 0; i < this.grid.length; i++) {
      for (var j = 0; j < this.grid.length; j++) {
        this.grid[i][j].show();
      }
    }
  }

  revealCell(x, y) {
    for (var i = 0; i < this.grid.length; i++) {
      for (var j = 0; j < this.grid.length; j++) {
        if (this.grid[i][j].contains(x, y)) {
          this.grid[i][j].reveal();
          if(this.grid[i][j].mine){
            this.gameOver();
          }
          else
          {
            if(this.grid[i][j].value == 0){
              var visited = [];
              visited.push([i, j]);
              this.openNeighbors(i, j, visited);
            }
          }
          return;
        }
      }
    }
  }

  markCell(x, y){
    for (var i = 0; i < this.grid.length; i++) {
      for (var j = 0; j < this.grid.length; j++) {
        if (this.grid[i][j].contains(x, y)) {
          this.grid[i][j].mark();
          return;
        }
      }
    }
  }

  openNeighbors(i, j, visited){
    for (var k = -1; k <= 1; k++) {
      for (var l = -1; l <= 1; l++) {
        var neighborsX = i + k;
        var neighborsY = j + l;
        if(neighborsX < 0 || neighborsY < 0 || neighborsX >= this.grid.length || neighborsY >= this.grid.length){
          continue;
        }
        this.grid[neighborsX][neighborsY].reveal();
        if(visited.find(e => e[0] == neighborsX && e[1] == neighborsY) == undefined && this.grid[neighborsX][neighborsY].value == 0)
        {
          visited.push([neighborsX, neighborsY]);
          this.openNeighbors(neighborsX, neighborsY, visited);
        }
      }
    }
  }

  gameOver() {
    for (var i = 0; i < this.grid.length; i++) {
      for (var j = 0; j < this.grid.length; j++) {
        this.grid[i][j].reveal();
        
      }
    }
  }
}