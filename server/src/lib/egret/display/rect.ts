import { Component } from "./component"

export class Rect extends Component {

  type = "eui.Rect"
  // fillColor: string;
  // strokeColor: string;
  // fillAlpha: number;
  // strokeAlpha: number;
  // strokeWeight: number;

  setAttribute(name: string, value: string): boolean {
    if (super.setAttribute(name, value)) return true;
    if (name == "fillColor") this.properties.fillColor = value;
    else if (name == "strokeColor") this.properties.strokeColor = value;
    else if (name == "fillAlpha") this.properties.fillAlpha = +value;
    else if (name == "strokeAlpha") this.properties.strokeAlpha = +value;
    else if (name == "strokeWeight") this.properties.strokeWeight = +value;
    else return false;
    return true;
  }
}