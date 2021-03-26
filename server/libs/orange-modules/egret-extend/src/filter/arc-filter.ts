namespace egretExtend {

  export class ArcFilter extends egret.CustomFilter {

    /**
     * 
     * @param startRadius 起点弧度，范围 (-2*PI,2*PI) 坐标系方向与白鹭相同，x 向右为正，y 向下为正
     * @param endRadius 终点弧度，范围 (-2*PI,2*PI) 坐标系方向与白鹭相同，x 向右为正，y 向下为正
     * @param offRadius 偏移弧度
     */
    constructor(startRadius = -Math.PI, endRadius = Math.PI, offRadius = 0.0) {

      var vertexSrc = "attribute vec2 aVertexPosition;\n" +
        "attribute vec2 aTextureCoord;\n" +
        "uniform vec2 projectionVector;\n" +
        "varying vec2 vTextureCoord;\n" +
        'varying vec4 vColor;\n' +
        "attribute vec2 aColor;\n" +
        "const vec2 center = vec2(-1.0, 1.0);\n" +
        "void main(void) {\n" +
        "   gl_Position = vec4( (aVertexPosition / projectionVector) + center , 0.0, 1.0);\n" +
        "   vTextureCoord = aTextureCoord;\n" +
        "   vColor = vec4(aColor.x, aColor.x, aColor.x, aColor.x);\n" +
        "}";
      var fragmentSrc = "precision lowp float;\n" +
        "varying vec2 vTextureCoord;\n" +
        'uniform sampler2D uSampler;\n' +
        'uniform float start;\n' +
        'uniform float end;\n' +
        'uniform float off;\n' +
        'varying vec4 vColor;\n' +
        "void main(void) {\n" +
        'float r = atan(vTextureCoord.y-0.5,vTextureCoord.x-0.5);\n' +
        'float m = 0.0;\n' +
        'float PI = 3.1415926535626;\n' +
        'r = r + off;\n' +
        'if(r > PI) r -= PI * 2.0;\n' +
        'if(r < -PI) r += PI * 2.0;\n' +
        'if(start < r && r < end) m = 1.0;\n' +
        'gl_FragColor = texture2D(uSampler, vTextureCoord) * vColor * m ;\n' +
        "}";
      super(vertexSrc, fragmentSrc, { 'start': startRadius, 'end': endRadius, 'off': offRadius });
    }
  }
}
