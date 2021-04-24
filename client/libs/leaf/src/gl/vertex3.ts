namespace leaf {

    export class Vertex3 extends ecs.Vector3 {

        alpha: number = 1;

        readonly color = new ecs.Color();

        readonly normal = new ecs.Vector3();

        init(x = 0, y = 0, z = 0) {
            this.elements[0] = x;
            this.elements[1] = y;
            this.elements[2] = z;
        }

        onDestroy() {
            this.color.set(0, 0, 0);
            let elements = this.normal.elements;
            elements[0] = 0;
            elements[1] = 0;
            elements[2] = 0;
        }

        clone() {
            let v = ecs.ObjectPools.createRecyableObject(Vertex3, this.x, this.y, this.z, this.alpha, this.color);
            v.alpha = this.alpha;
            v.normal.set(this.normal.x, this.normal.y, this.normal.z);
            v.color.set(this.color.r, this.color.g, this.color.b);
            return v;
        }

        static create(x: number = 0, y: number = 0, z: number = 0, alpha: number = 1, color = 0) {
            let v = ecs.ObjectPools.createRecyableObject(Vertex3, x, y, z);
            v.alpha = alpha;
            v.color.value = color;
            return v;
        }
    }

}