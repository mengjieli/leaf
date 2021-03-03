namespace behaviorTree {

    export class RunningData {

        currentState: EMState;

        currentNode: Node;

        nextNode: Node;

        stack: Node[] = [];

        loops: number[] = [];

        tree: Tree;

        data: any;

        destroy() {
            this.currentNode = null;
            this.nextNode = null;
            this.stack.length = 0;
            this.loops.length = 0;
            this.tree = null;
            this.data = null;
            RunningData.pool.push(this);
        }

        runToLeafRunning() {
            while (this.nextNode) {
                this.nextNode.run(this);
                if (this.currentState === behaviorTree.EMState.RUNNING &&
                    this.currentNode && this.currentNode.isLeaf) break;
            }
        }

        private static pool: RunningData[] = [];

        static create(tree: Tree, data?: any): RunningData {
            let stack: RunningData;
            if (this.pool.length) {
                stack = this.pool.pop();
            } else {
                stack = new RunningData();
            }
            stack.tree = tree;
            if (tree.root) {
                stack.nextNode = tree.root;
            }
            stack.data = data;
            return stack;
        }
    }

}