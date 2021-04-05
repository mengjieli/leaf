namespace leaf {

    export class TouchManager {

        static start(touchId: number, touchX: number, touchY: number) {
            if (!leaf.world) return;
            let target = this.findTarget(touchX, touchY, leaf.world.root) || leaf.world.root;
            let e = new TouchEvent();
            e.touchId = touchId;
            let m = leaf.world.root.transform.reverse;
            e.stageX = m.a * touchX + m.c * touchY + m.tx;
            e.stageY = m.b * touchX + m.d * touchY + m.ty;
            e.target = target;
            this.dispatchTouchEvent(e, target, touchX, touchY, "start");
        }

        static move(touchId: number, touchX: number, touchY: number) {
            if (!leaf.world) return;
            let target = this.findTarget(touchX, touchY, leaf.world.root) || leaf.world.root;
            let e = new TouchEvent();
            e.touchId = touchId;
            let m = leaf.world.root.transform.reverse;
            e.stageX = m.a * touchX + m.c * touchY + m.tx;
            e.stageY = m.b * touchX + m.d * touchY + m.ty;
            e.target = target;
            this.dispatchTouchEvent(e, target, touchX, touchY, "move");
        }

        static end(touchId: number, touchX: number, touchY: number) {
            if (!leaf.world) return;
            let target = this.findTarget(touchX, touchY, leaf.world.root) || leaf.world.root;
            let e = new TouchEvent();
            e.touchId = touchId;
            let m = leaf.world.root.transform.reverse;
            e.stageX = m.a * touchX + m.c * touchY + m.tx;
            e.stageY = m.b * touchX + m.d * touchY + m.ty;
            e.target = target;
            this.dispatchTouchEvent(e, target, touchX, touchY, "end");
        }

        private static dispatchTouchEvent(e: TouchEvent, target: ecs.Entity, touchX: number, touchY: number, type: "start" | "move" | "end") {
            let list: ecs.Entity[] = [];
            let locals = [];
            while (target) {
                list.push(target)
                target = target.parent;
            }
            for (let i = list.length - 1, x = 0, y = 0; i >= 0; i--) {
                let m = list[i].transform.reverse;
                x = m.a * (touchX + m.tx) + m.c * touchY;
                y = m.b * touchX + m.d * (touchY + m.ty);
                touchX = x;
                touchY = y;
                locals.push([x, y]);
            }
            for (let i = 0; i < list.length; i++) {
                e.localX = locals[list.length - 1 - i][0];
                e.localY = locals[list.length - 1 - i][1];
                e.currentTarget = list[i];
                let tc = list[i].getComponent(TouchComponent);
                if (tc) {
                    if (type === 'start') tc.onTouchStart.dispatch(e);
                    else if (type === 'move') tc.onTouchMove.dispatch(e);
                    else if (type === 'end') tc.onTouchEnd.dispatch(e);
                }
            }
        }

        private static findTarget(touchX: number, touchY: number, checkEntity: ecs.Entity): ecs.Entity {
            let m = checkEntity.transform.reverse;
            let x = m.a * (touchX + m.tx) + m.c * touchY;
            let y = m.b * touchX + m.d * (touchY + m.ty);
            let t = checkEntity.getComponent(TouchComponent);
            if (!t || t.touchChildrenEnabled) {
                for (let i = checkEntity.children.length - 1; i >= 0; i--) {
                    let target = this.findTarget(x, y, checkEntity.children[i]);
                    if (target) {
                        return target;
                    }
                }
            }
            if (!t || t.touchEnabled) {
                let render = checkEntity.getComponent(Render);
                if (render && render.width && render.height &&
                    x >= 0 && x < render.width && y >= 0 && y < render.height) {
                    return checkEntity;
                }
            }
        }

    }

}