namespace leaf {

    export class Render extends ecs.Component {

        readonly shader: Shader;

        static allowMultiply = false;

        blendMode: BlendMode = BlendMode.NONE;

        renderChildren: boolean = true;

        onDestroy() {
        }

        preRender() {

        }

        preRender2(matrix: ecs.Matrix4, alpha: number, shader?: Shader) {

        }

        get width() {
            return 0;
        }

        get height() {
            return 0;
        }
    }

}