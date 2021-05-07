namespace ecs {

  export class Vector3 {

    readonly id: number;

    elements = [0, 0, 0];

    get x() { return this.elements[0]; }
    set x(val: number) { this.elements[0] = val; }
    get y() { return this.elements[1]; }
    set y(val: number) { this.elements[1] = val; }
    get z() { return this.elements[2]; }
    set z(val: number) { this.elements[2] = val; }

    init(x: number = 0, y: number = 0, z: number = 0) {
      this.elements[0] = x;
      this.elements[1] = y;
      this.elements[2] = z;
    }

    set(x: number = 0, y: number = 0, z: number = 0) {
      this.elements[0] = x;
      this.elements[1] = y;
      this.elements[2] = z;
      return this;
    }

    dot(v: IVector3) {
      let x1 = this.elements[0];
      let y1 = this.elements[1];
      let z1 = this.elements[2];
      this.elements[0] = y1 * v.z - v.y * z1;
      this.elements[1] = v.x * z1 - x1 * v.z;
      this.elements[2] = x1 * v.y - v.x * y1;
      return this;
    }

    normalize() {
      let v: IVector3 = this;
      let l = Math.sqrt(v.x * v.x + v.y * v.y + v.z * v.z);
      if (l === 0) {
        v.x = v.y = v.z = 0;
        return this;
      } else if (l === 1) {
        return this;
      }
      l = 1 / l;
      v.x *= l;
      v.y *= l;
      v.z *= l;
      return this;
    }

    add(v: IVector3) {
      this.elements[0] += v.x;
      this.elements[1] += v.y;
      this.elements[2] += v.z;
      return this;
    }

    reduce(v: IVector3) {
      this.elements[0] -= v.x;
      this.elements[1] -= v.y;
      this.elements[2] -= v.z;
      return this;
    }

    scale(v: number) {
      this.elements[0] *= v;
      this.elements[1] *= v;
      this.elements[2] *= v;
      return this;
    }

    clone() {
      return ecs.ObjectPools.createRecyableObject(Vector3, this.x, this.y, this.z);
    }

    static create(x: number = 0, y: number = 0, z: number = 0): Vector3 {
      return ecs.ObjectPools.createRecyableObject(Vector3, x, y, z);
    }
  }

}