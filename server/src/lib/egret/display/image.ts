import { Component } from "./component"

export class Image extends Component {

  type = "eui.Image"
  // source: string;

  setAttribute(name: string, value: string): boolean {
    if (super.setAttribute(name, value)) return true;
    if (name == "source") this.properties.source = value;
    else return false;
    return true;
  }
}