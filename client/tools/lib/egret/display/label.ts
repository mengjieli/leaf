import { Component } from "./component"

export class Label extends Component {

  type = "eui.Label"
  // text: string;

  setAttribute(name: string, value: string): boolean {
    if (super.setAttribute(name, value)) return true;
    if (name == "text") this.properties.text = value;
    else if (name == "textColor") this.properties.textColor = value;
    else if (name == "size") this.properties.size = +value;
    else if (name == "bold") this.properties.bold = !!value;
    else if (name == "stroke") this.properties.stroke = +value;
    else if (name == "strokeColor") this.properties.strokeColor = value;
    else if (name == "textAlign") this.properties.textAlign = value;
    else return false;
    return true;
  }
}