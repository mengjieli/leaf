namespace leaf {

    export class BatchRender extends Render {

        shader = BatchShaderTask.shader;

        /**
         * @internal
         */
        old = true;

        renderChildren = false;

        private matrix = new ecs.Matrix();

        preRender2(matrix: ecs.Matrix, alpha: number) {
            let projectionMatrix = this.projectionMatrix;
            projectionMatrix[0] = matrix.a;
            projectionMatrix[1] = matrix.c;
            projectionMatrix[3] = matrix.tx;
            projectionMatrix[4] = matrix.b;
            projectionMatrix[5] = matrix.d;
            projectionMatrix[7] = matrix.ty;

            if (this.old) {
                this.old = false;
                this.refresh();
            }
            this.shader.batchs.push(this);
        }

        refresh() {
            this.reset();
            this.matrix.identity();
            this.shader.curBatch = this;
            this.preRenderEntity(this.entity, this.matrix, 1);
        }

        preRenderEntity(entity: ecs.Entity, matrix: ecs.Matrix, alpha: number) {
            matrix.reconcat(entity.transform.local);
            for (let c of entity.children) {
                if (c.children.length) {
                    matrix.save();
                    this.preRenderEntity(c, matrix, alpha * c.transform.alpha);
                    matrix.restore();
                }
                let rd = c.getComponent(Render);
                if (rd) {
                    matrix.save();
                    rd.preRender2(matrix, alpha, this.shader);
                    matrix.restore();
                }
            }
        }


        projectionMatrix: Float32Array = new Float32Array([
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1]);

        textures: WebGLTexture[][] = [];
        count = [];
        positionData = [];
        blendModes = [];
        tints = [];
        buffers: WebGLBuffer[] = [];


        private reset(): void {
            while (this.buffers.length) {
                GLCore.gl.deleteBuffer(this.buffers.pop());
            }
            var _this = this;
            _this.textures = [];
            _this.count = [];
            _this.positionData = [];
            _this.blendModes = [];
            _this.tints = [];
        }


        onDestroy() {
        }
    }

}