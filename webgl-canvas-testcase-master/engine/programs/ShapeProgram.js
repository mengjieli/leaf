var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var engine;
(function (engine) {
    var ShapeProgram = (function (_super) {
        __extends(ShapeProgram, _super);
        function ShapeProgram(gl, stageWidth, stageHeight) {
            _super.call(this);
            this.projectionMatrix = new Float32Array([
                1, 0, 0, 0,
                0, 1, 0, 0,
                0, 0, 1, 0,
                -1, 1, 0, 1]);
            this.colors = [];
            this.count = [];
            this.positionData = [];
            this.initProgram(gl);
            this.initAttriLocation(gl, stageWidth, stageHeight);
        }
        ShapeProgram.prototype.initProgram = function (gl) {
            var vertexSource = "\n\n             attribute vec4 a_Position;\n             uniform mat4 u_PMatrix;\n             void main(void)\n             {\n                gl_Position = u_PMatrix*a_Position;\n             }\n             ";
            var fragmentSource = "\n\n            #ifdef GL_ES\n                precision lowp float;\n             #endif\n             uniform vec4 u_FragColor;\n             void main(void)\n             {\n                gl_FragColor = u_FragColor;\n             }\n             ";
            var vertexShader = engine.Program.createShader(gl, gl.VERTEX_SHADER, vertexSource);
            var fragmentShader = engine.Program.createShader(gl, gl.FRAGMENT_SHADER, fragmentSource);
            this.program = engine.Program.createWebGLProgram(gl, vertexShader, fragmentShader);
        };
        ShapeProgram.prototype.initAttriLocation = function (gl, width, height) {
            var projectionMatrix = this.projectionMatrix;
            projectionMatrix[0] = 2 / width;
            projectionMatrix[5] = -2 / height;
            var program = this.program;
            program["name"] = "shape program";
            gl.useProgram(this.program);
            if (!this.buffer) {
                this.buffer = gl.createBuffer();
            }
            gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
            this.a_Position = gl.getAttribLocation(program, "a_Position");
            gl.enableVertexAttribArray(this.a_Position);
            gl.vertexAttribPointer(this.a_Position, 2, gl.FLOAT, false, engine.$size * 2, 0);
            var u_PMatrix = gl.getUniformLocation(program, "u_PMatrix");
            gl.uniformMatrix4fv(u_PMatrix, false, projectionMatrix);
            this.u_FragColor = gl.getUniformLocation(program, "u_FragColor");
        };
        ShapeProgram.prototype.reset = function () {
            var _this = this;
            _this.colors = [];
            _this.count = [];
            _this.positionData = [];
        };
        ShapeProgram.prototype.addDisplayObject = function (display) {
            var shape = display;
            if (!this.colors.length || this.colors[this.colors.length - 1] != shape.color) {
                this.colors.push(shape.color);
                this.positionData.push([]);
                this.count.push(0);
            }
            var index = this.count[this.count.length - 1] * 12;
            var positionData = this.positionData[this.positionData.length - 1];
            var matrix = display.matrix;
            positionData[index] = matrix.b + matrix.tx;
            positionData[1 + index] = matrix.d * display.height + matrix.ty;
            positionData[8 + index] = positionData[2 + index] = matrix.tx;
            positionData[9 + index] = positionData[3 + index] = matrix.ty;
            positionData[6 + index] = positionData[4 + index] = matrix.a * display.width + matrix.b + matrix.tx;
            positionData[7 + index] = positionData[5 + index] = matrix.c + matrix.d * display.height + matrix.ty;
            positionData[10 + index] = matrix.a * display.width + matrix.tx;
            positionData[11 + index] = matrix.c + matrix.ty;
            this.count[this.count.length - 1]++;
        };
        ShapeProgram.prototype.render = function (gl) {
            var _this = this;
            gl.useProgram(_this.program);
            gl.bindBuffer(gl.ARRAY_BUFFER, _this.buffer);
            gl.vertexAttribPointer(this.a_Position, 2, gl.FLOAT, false, engine.$size * 2, 0);
            for (var i = 0, len = _this.colors.length; i < len; i++) {
                var color = _this.colors[i];
                gl.uniform4f(this.u_FragColor, color >>> 16 & 0xff, color >>> 8 & 0xff, color & 0xff, (color >>> 24) / 256);
                gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(_this.positionData[i]), gl.STATIC_DRAW);
                gl.drawArrays(gl.TRIANGLES, 0, 6 * _this.count[i]);
            }
        };
        return ShapeProgram;
    })(engine.Program);
    engine.ShapeProgram = ShapeProgram;
})(engine || (engine = {}));
//# sourceMappingURL=ShapeProgram.js.map