namespace leaf {

    export enum BlendMode {
        //重置混合模式
        NONE = -1,
        //普通的混合
        NORMAL = 0,
        //叠加
        ADD = 1,
        //覆盖
        OVERRIDE = 10,
    }

    export class BlendModeFunc {

        private static blendMode: number = BlendMode.NONE;

        public static changeBlendMode(mode: number) {
            if (mode == BlendModeFunc.blendMode) {
                return;
            }
            var gl = GLCore.gl;
            if (mode == BlendMode.NORMAL) {
                // gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA)
                gl.blendEquationSeparate(gl.FUNC_ADD, gl.FUNC_ADD);
                gl.blendFuncSeparate(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA, gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
            } else if (mode == BlendMode.ADD) {
                gl.blendEquationSeparate(gl.FUNC_ADD, gl.FUNC_ADD);
                gl.blendFunc(gl.ONE, gl.ONE);
            } else if (mode == BlendMode.OVERRIDE) {
                gl.blendEquationSeparate(gl.FUNC_ADD, gl.FUNC_ADD);
                gl.blendFunc(gl.ONE, gl.ZERO);
            }
            BlendModeFunc.blendMode = mode;
        }
    }

}