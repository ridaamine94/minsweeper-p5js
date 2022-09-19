class Cell {
  constructor(x, y, w) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.revealed = false;
    this.mine = false;
    this.marked = false;
    this.value = 0;
  }

  charge() {
    this.mine = true;
  }

  reveal() {

    this.revealed = true;
  }

  setValue(value) {
    if (value == 0) {
      this.empty = true;
    }
    this.value = value;
  }

  mark(){
    this.marked = !this.marked;
  }

  show() {
    stroke(0);
    noFill();
    rect(this.x, this.y, this.w, this.w);
    if (this.revealed)
    {
      if (this.mine) {
        fill(127);
        ellipse(this.x + this.w * 0.5, this.y + this.w * 0.5, this.w * 0.5);
      }
      else
      {
        fill(200);
        rect(this.x, this.y, this.w, this.w);
        if(this.value > 0)
        {
          fill(0);
          text(this.value, this.x + this.w * 0.4, this.y + this.w * 0.6);
        }
      }
    }
    else
    {
      if(this.marked){
        fill(0);
        text("M", this.x + this.w * 0.4, this.y + this.w * 0.6);
      }
    }
  }

  contains(x, y) {
    return (
      x > this.x && x < this.x + this.w && y > this.y && y < this.y + this.w
    );
  }
}