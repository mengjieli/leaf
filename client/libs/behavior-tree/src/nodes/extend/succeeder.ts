namespace behaviorTree {

    /**
     * 单个子节点
     */
    export class Succeeder extends Decorator {

        run(data: RunningData) {
            let lastNode = data.currentNode;
            data.currentNode = this;
            //还没有进入节点
            if (lastNode === this.parent || lastNode === null) {
                if (this.children.length === 0) {
                    data.nextNode = data.stack.pop();
                    return data.currentState = EMState.SUCCESS;
                } else {
                    data.nextNode = this.children[0];
                    data.stack.push(this);
                    return data.currentState = EMState.RUNNING;
                }
            }
            //子节点跑完
            data.nextNode = data.stack.pop();
            return data.currentState = EMState.SUCCESS;
        }
    }

}