namespace behaviorTree {

    export class Sequence extends Composite {

        run(data: RunningData) {
            let currentState = data.currentState;
            let lastNode = data.currentNode;
            data.currentNode = this;
            //还没有进入子节点
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
            //如果子节点返回的是 failure 则直接返回结果
            if (currentState === EMState.FAILURE) {
                data.nextNode = data.stack.pop();
                return data.currentState = currentState;
            }
            //否则进入下一个子节点
            let index = this.children.indexOf(lastNode);
            if (index < this.children.length - 1) {
                data.nextNode = this.children[index + 1];
                data.stack.push(this);
                return data.currentState = EMState.RUNNING;
            }
            //所有子节点跑完
            data.nextNode = data.stack.pop();
            return data.currentState = currentState;
        }
    }

}