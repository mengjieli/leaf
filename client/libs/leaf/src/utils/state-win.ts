namespace leaf {

  export class StateWin extends ecs.Component {

    awake() {
      this.transform.alpha = 0.8;
      this.addComponent(Label).fontSize = 10;
      this.getComponent(Label).lineSpacing = 10;
      this.transform.y = GLCore.height / GLCore.scale - 50;
    }

    lateUpdate() {
      let txt = `fps:${runInfo.fps}\n`;
      txt += `drawCall:${runInfo.fpsDrawCall}\n`;
      txt += `frameCount:${runInfo.fpsDrawCount}\n`;
      txt += `frameTime:${runInfo.fpsTime}`;
      this.getComponent(Label).text = txt;
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