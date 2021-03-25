namespace leaf {

    export class GLCore {

        static gl: WebGLRenderingContext;

        static width: number;

        static height: number;

        static textureId: number = 0;

        static scale: number = 1;

        /**
         * @internal
         */
        static $shareContext2D: any;

        static init() {
            var canvas = (window["canvas"] || document.getElementById('leaf')) as HTMLCanvasElement;
            this.width = canvas.width;
            this.height = canvas.height;
            var names = ["experimental-webgl", "webgl"];
            var options = { "antialias": true, "stencil": true };
            var gl: WebGLRenderingContext;
            for (var i = 0; i < names.length; i++) {
                try {
                    gl = <any>canvas.getContext(names[i], options);
                    gl.colorMask(true, true, true, true);
                    gl.viewport(0, 0, GLCore.width, GLCore.height);
                    gl.disable(gl.DEPTH_TEST);
                    gl.disable(gl.CULL_FACE);
                    gl.enable(gl.BLEND);
                    gl.enable(gl.STENCIL_TEST);
                    gl.blendColor(1.0, 1.0, 1.0, 1.0);
                    gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, 1);
                    gl.clearColor(0.0, 0.0, 0.0, 1.0);
                } catch (e) {
                }
                if (gl) {
                    break;
                }
            }
            if (!gl) {
                console.log("Error : 当前环境不支持 WebGL");
                alert("Error : 当前环境不支持 WebGL 111");
            }
            if (!GLCore.$shareContext2D) {
                var canvas = document.createElement("canvas");
                canvas.width = GLCore.width;
                canvas.height = GLCore.height;
                GLCore.$shareContext2D = canvas.getContext("2d");
            }
            return this.gl = gl;
        }

        /**
        * 这里并没有加 image 对应 texture 的对应表，也就是说调用两次 createTexture，传同一个 image，会创建两个 texture，还可以进一步优化。
        * @param image
        * @returns {WebGLTexture}
        */
        public static createTexture(image: HTMLImageElement | HTMLCanvasElement | HTMLVideoElement | ImageData): WebGLTexture {
            var gl = this.gl;
            var texture = gl.createTexture();
            texture["id"] = this.textureId;
            this.textureId++;
            gl.bindTexture(gl.TEXTURE_2D, texture);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, <any>image);
            gl.bindTexture(gl.TEXTURE_2D, null);
            return texture;
        }

        public static updateTexture(texture: WebGLTexture, image: HTMLImageElement | HTMLCanvasElement | HTMLVideoElement | ImageData): void {
            var gl = this.gl;
            gl.bindTexture(gl.TEXTURE_2D, texture);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, <any>image);
            gl.bindTexture(gl.TEXTURE_2D, null);
        }

    }

}

window["leaf"] = leaf;