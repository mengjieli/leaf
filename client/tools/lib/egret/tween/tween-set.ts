export class TweenSet {
  time: number;
  x: number;
  y: number;
  scaleX: number;
  scaleY: number;
  width: number;
  height: number;
  alpha: number;
  rotation: number;

  setAttribute(name: string, value: string): boolean {
    value = value.slice(1, value.length - 1);
    if (name == "x") this.x = +value;
    else if (name == "y") this.y = +value;
    else if (name == "scaleX") this.scaleX = +value;
    else if (name == "scaleY") this.scaleY = +value;
    else if (name == "width") this.width = +value;
    else if (name == "height") this.height = +value;
    else if (name == "alpha") this.alpha = +value;
    else if (name == "rotation") this.rotation = +value;
    else return false;
    return true;
  }
}