namespace egretExtend {
  export class CircleFilter extends egret.CustomFilter {
  
      constructor(size?: number) {
          if (size != null) {
              size = ~~size;
          }
          var vertexSrc = "attribute vec2 aVertexPosition;\n" +
              "attribute vec2 aTextureCoord;\n" +
              "uniform vec2 projectionVector;\n" +
              "varying vec2 vTextureCoord;\n" +
              'varying vec4 vColor;\n' +
              "attribute vec2 aColor;\n" +
              "const vec2 center = vec2(-1.0, 1.0);\n" +
              "void main(void) {\n" +
              "   gl_Position = vec4((aVertexPosition / projectionVector) + center , 0.0, 1.0);\n" +
              "   vTextureCoord = aTextureCoord;\n" +
              "   vColor = vec4(aColor.x, aColor.x, aColor.x, aColor.x);\n" +
              "}";
          var fragmentSrc = "precision lowp float;\n" +
              "varying vec2 vTextureCoord;\n" +
              'uniform sampler2D uSampler;\n' +
              'varying vec4 vColor;\n' +
              'uniform vec2 uTextureSize;\n' +
              "void main(void) {\n" +
              (size == null ? "float res = step((vTextureCoord.x-0.5)*(vTextureCoord.x-0.5) + (vTextureCoord.y-0.5)*(vTextureCoord.y-0.5),0.25);\n"
                  : "float res = step((vTextureCoord.x-0.5)*(vTextureCoord.x-0.5)*uTextureSize.x*uTextureSize.x + (vTextureCoord.y-0.5)*(vTextureCoord.y-0.5)*uTextureSize.y*uTextureSize.y,0.25*" + (size * size) + ".0);\n") +
              'gl_FragColor = texture2D(uSampler, vTextureCoord) * vColor * res ;\n' +
              "}";
          super(vertexSrc, fragmentSrc);
      }
  }
}