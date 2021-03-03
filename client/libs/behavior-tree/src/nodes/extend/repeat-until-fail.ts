namespace behaviorTree {

    export class RepeatUntilFail extends Decorator {


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
            //如果子节点返回 fail 则直接返回
            if (data.currentState === EMState.FAILURE) {
                data.nextNode = data.stack.pop();
                return data.currentState = EMState.FAILURE;
            }
            data.nextNode = this.children[0];
            data.stack.push(this);
            return data.currentState = EMState.RUNNING;
        }

    }
}