namespace behaviorTree {

    export class Leaf extends Node {

        data: any;

        run(data: RunningData) {
            let lastNode = data.currentNode;
            data.currentNode = this;
            if (lastNode !== this) {
                if (!this.execute) {
                    data.nextNode = data.stack.pop();
                    return data.currentState = EMState.SUCCESS;
                }
                let state = this.execute(data);
                if (state != EMState.RUNNING) {
                    data.nextNode = data.stack.pop();
                    return data.currentState = state;
                }
                return data.currentState = EMState.RUNNING;
            }
            let state = this.execute(data);
            if (state != EMState.RUNNING) {
                data.nextNode = data.stack.pop();
                return data.currentState = state;
            }
            return data.currentState = EMState.RUNNING;
        }

        execute?(data?: RunningData): EMState;
    }

}