namespace behaviorTree {

    export abstract class Decorator extends Node {

        run(data: RunningData) {
            let currentState = data.currentState;
            let lastNode = data.currentNode;
            data.currentNode = this;
            //还没有进入节点
            if (lastNode === this.parent || lastNode === null) {
                if (this.children.length === 0) {
                    data.nextNode = data.stack.pop();
                    return data.currentState = EMState.SUCCESS;
                } else {
                    data.nextNode = this.children[0];
                    return data.currentState = EMState.RUNNING;
                }
            }
            //如果子节点返回
            let index = this.children.indexOf(lastNode);
            if (index < this.children.length - 1) {
                data.nextNode = this.children[index + 1];
                return data.currentState = EMState.RUNNING;
            }
            return currentState;
        }

    }

}