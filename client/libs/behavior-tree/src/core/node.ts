namespace behaviorTree {

    export abstract class Node {

        name: string;

        parent: Node;

        children: Node[] = [];

        isLeaf: boolean = false;

        data: any;

        abstract run(stack: RunningData): EMState;
    }

    export enum EMState {
        SUCCESS = "success",
        FAILURE = "failure",
        RUNNING = "ruinning"
    }

}