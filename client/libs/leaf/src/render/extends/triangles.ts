namespace leaf {

    export class Triangles extends Polygon {

        private _length: number = 0;

        get length(): number {
            return this._length;
        }

        set length(val: number) {
            val = Math.max(val, 0);
            if (this.vertices.length != val * 9) {
                this.vertices.length = val * 9;
                this.colors.length = val * 9;
                this.alphas.length = val * 3;
                this.indices.length = val * 3;
            }
        }

        setTriangle(v1: Vertex3, v2: Vertex3, v3: Vertex3, index: number) {
            let polygon = this;
            let vertices = polygon.vertices;
            let colors = polygon.colors;
            let indices = polygon.indices;
            let alphas = polygon.alphas;
            // 0.5, 0.5, 0,
            //   -0.5, 0.5, 0,
            //   -0.5, -0.5, 0,
            let ind = index * 9;
            vertices[ind + 0] = v1.x;
            vertices[ind + 1] = v1.y;
            vertices[ind + 2] = v1.z;
            vertices[ind + 3] = v2.x;
            vertices[ind + 4] = v2.y;
            vertices[ind + 5] = v2.z;
            vertices[ind + 6] = v3.x;
            vertices[ind + 7] = v3.y;
            vertices[ind + 8] = v3.z;

            colors[ind + 0] = v1.color.r;
            colors[ind + 1] = v1.color.g;
            colors[ind + 2] = v1.color.b;
            colors[ind + 3] = v2.color.r;
            colors[ind + 4] = v2.color.g;
            colors[ind + 5] = v2.color.b;
            colors[ind + 6] = v3.color.r;
            colors[ind + 7] = v3.color.g;
            colors[ind + 8] = v3.color.b;

            ind = index * 3;
            alphas[ind + 0] = v1.alpha;
            alphas[ind + 1] = v2.alpha;
            alphas[ind + 2] = v3.alpha;

            indices[ind + 0] = index * 3 + 0;
            indices[ind + 1] = index * 3 + 1;
            indices[ind + 2] = index * 3 + 2;

            if (index > this._length) this._length = index;
        }

        onDestroy() {
            super.onDestroy();
            this._length = 0;
        }

    }

}