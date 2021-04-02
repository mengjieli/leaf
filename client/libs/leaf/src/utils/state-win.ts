namespace leaf {

  export class StateWin extends ecs.Component {

    awake() {
      this.transform.alpha = 0.8;
      this.addComponent(Label).fontSize = 16;
      this.getComponent(Label).lineSpacing = 3;
      this.transform.scaleX = this.transform.scaleY = 1 / GLCore.scale;
    }

    lateUpdate() {
      let txt = `fps          ${runInfo.fps}\n`;
      txt += `draw call  ${runInfo.frameDrawCall}\n`;
      // txt += `disCount:${runInfo.frameDrawCount}\n`;
      // txt += `frameTime:${runInfo.frameTime}\n`;
      txt += `logic        ${runInfo.frameLogicTime}\n`;
      // txt += `renderTime:${runInfo.frameRenderTime}\n`;
      txt += `render      ${runInfo.framePreRenderTime}\n`;
      txt += `webgl       ${runInfo.frameGlRenderTime}\n`;
      this.getComponent(Label).text = txt;
      this.transform.y = (GLCore.height - 92) / GLCore.scale;
    }

    private static ist: StateWin;

    static show() {
      if (this.ist) return;
      this.ist = ecs.Entity.create().addComponent(StateWin);
      this.ist.parent = world.root;
    }

    static hide() {
      if (this.ist) this.ist.entity.destroy();
    }

  }

}