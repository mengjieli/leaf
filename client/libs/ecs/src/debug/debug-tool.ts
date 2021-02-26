namespace ecs {

  export class DebugTool {

    static componentCreated(id: number, call?: Function) {
      if (debug) {
        this.debugPointTip("组件 " + id + " 何时被创建?");
      }
      Entity.componentCreatedPoints.add({
        id: id,
        call: () => {
          if (debug) {
            this.debugPointTip("发现组件 " + id + " 被创建!!!", false);
          }
          call && call();
        }
      })
    }

    static componentDestroyed(id: number, call?: Function) {
      if (debug) {
        this.debugPointTip("组件 " + id + " 何时被销毁?");
      }
      Component.componentDestroyedPoints.add({
        id: id,
        call: () => {
          if (debug) {
            this.debugPointTip("发现组件 " + id + " 被销毁!!!", false);
          }
          call && call();
        }
      })
    }

    static addedToLink(id: number, call?: Function) {
      if (debug) {
        this.debugPointTip("组件 " + id + " 何时加入队列?");
      }
      Link.debugPoints = true;
      Link.addPoints.add({
        id: id,
        call: () => {
          if (debug) {
            this.debugPointTip("发现组件 " + id + " 加入队列!!!", false);
          }
          call && call();
        }
      })
    }

    static remvedFromLink(id: number, call?: Function) {
      if (debug) {
        this.debugPointTip("组件 " + id + " 何时移出队列?");
      }
      Link.debugPoints = true;
      Link.addPoints.add({
        id: id,
        call: () => {
          if (debug) {
            this.debugPointTip("发现组件 " + id + " 移出队列!!!", false);
          }
          call && call();
        }
      })
    }

    static debugPointTip(name: string, tip: boolean = true) {
      if (tip) {
        console.warn("调试点:" + name);
      } else {
        console.warn("调试点:" + name);
      }
    }
  }

}