namespace leaf {

  export class KeyBoard extends ecs.Component {

    onPressUp = new ecs.Broadcast();
    onPressDown = new ecs.Broadcast();
    onPressLeft = new ecs.Broadcast();
    onPressRight = new ecs.Broadcast();
    onPressZ = new ecs.Broadcast();
    onPressX = new ecs.Broadcast();

    awake() {
      window.onkeydown = this.onKeyDown;
    }

    onKeyDown = (e) => {
      console.log(e.keyCode);
      if (e.keyCode === 87 || e.keyCode === 38) {
        this.onPressUp.dispatch();
      } else if (e.keyCode === 83 || e.keyCode === 40) {
        this.onPressDown.dispatch();
      } else if (e.keyCode === 65 || e.keyCode === 37) {
        this.onPressLeft.dispatch();
      } else if (e.keyCode === 68 || e.keyCode === 39) {
        this.onPressRight.dispatch();
      } else if (e.keyCode === 90) {
        this.onPressZ.dispatch();
      } else if (e.keyCode === 88) {
        this.onPressX.dispatch();
      }
    }

    onDestroy() {
      if (window.onkeydown === this.onKeyDown) window.onkeydown = null;
      this.onPressUp.removeAll();
      this.onPressDown.removeAll();
      this.onPressLeft.removeAll();
      this.onPressRight.removeAll();
    }

  }
}