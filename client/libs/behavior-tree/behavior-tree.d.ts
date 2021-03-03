declare namespace behaviorTree {
    abstract class Node {
        name: string;
        parent: Node;
        children: Node[];
        isLeaf: boolean;
        data: any;
        abstract run(stack: RunningData): EMState;
    }
    enum EMState {
        SUCCESS = "success",
        FAILURE = "failure",
        RUNNING = "ruinning"
    }
}
declare namespace behaviorTree {
    class RunningData {
        currentState: EMState;
        currentNode: Node;
        nextNode: Node;
        stack: Node[];
        loops: number[];
        tree: Tree;
        data: any;
        destroy(): void;
        runToLeafRunning(): void;
        private static pool;
        static create(tree: Tree, data?: any): RunningData;
    }
}
declare namespace behaviorTree {
    class Tree {
        root: Node;
        nodeMap: {
            [index: string]: Node;
        };
        leafMap: {
            [index: string]: Leaf[];
        };
        static createWithJSON(json: ITreeJSON): Tree;
        private static createNode;
    }
    interface INodeJSON {
        name: string;
        type: string;
        children: (INodeJSON[]) | null;
        data?: any;
        loop?: number;
    }
    interface ITreeJSON {
        version: string;
        root: INodeJSON;
    }
}
declare namespace behaviorTree {
    abstract class Composite extends Node {
    }
}
declare namespace behaviorTree {
    abstract class Decorator extends Node {
        run(data: RunningData): EMState.SUCCESS | EMState | EMState.RUNNING;
    }
}
declare namespace behaviorTree {
    class Leaf extends Node {
        data: any;
        run(data: RunningData): EMState.SUCCESS | EMState;
        execute?(data?: RunningData): EMState;
    }
}
declare namespace behaviorTree {
    /**
     * 单个子节点
     */
    class Inverter extends Decorator {
        run(data: RunningData): EMState;
    }
}
declare namespace behaviorTree {
    class RepeatUntilFail extends Decorator {
        run(data: RunningData): EMState;
    }
}
declare namespace behaviorTree {
    class Repeater extends Decorator {
        loop: number;
        init(loop: number): void;
        run(data: RunningData): EMState.SUCCESS | EMState.RUNNING;
    }
}
declare namespace behaviorTree {
    class Selector extends Composite {
        run(data: RunningData): EMState.SUCCESS | EMState | EMState.RUNNING;
    }
}
declare namespace behaviorTree {
    class Sequence extends Composite {
        run(data: RunningData): EMState.SUCCESS | EMState | EMState.RUNNING;
    }
}
declare namespace behaviorTree {
    /**
     * 单个子节点
     */
    class Succeeder extends Decorator {
        run(data: RunningData): EMState.SUCCESS | EMState.RUNNING;
    }
}
