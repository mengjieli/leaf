namespace behaviorTree {

    export class Repeater extends Decorator {

        loop: number = -1;

        init(loop: number) {
            this.loop = loop;
        }

        run(data: RunningData) {
            let lastNode = data.currentNode;
            data.currentNode = this;
            //还没有进入节点
            if (lastNode === this.parent || lastNode === null) {
                if (this.children.length === 0) {
                    data.nextNode = data.stack.pop();
                    return data.currentState = EMState.SUCCESS;
                } else {
                    data.loops.push(this.loop);
                    data.loops[data.loops.length]--;
                    data.nextNode = this.children[0];
                    data.stack.push(this);
                    return data.currentState = EMState.RUNNING;
                }
            }
            //子节点跑完
            let loop = data.loops[data.loops.length];
            if (loop !== 0) {
                data.loops[data.loops.length]--;
                data.nextNode = this.children[0];
                data.stack.push(this);
                return data.currentState = EMState.RUNNING;
            }
            data.nextNode = data.stack.pop();
            data.loops.pop();
            return data.currentState = EMState.SUCCESS;
        }

    }
}