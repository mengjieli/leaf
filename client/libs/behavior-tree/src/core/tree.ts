namespace behaviorTree {

    export class Tree {

        root: Node;

        nodeMap: { [index: string]: Node };

        leafMap: { [index: string]: Leaf[] };

        static createWithJSON(json: ITreeJSON) {
            let tree = new Tree();
            tree.nodeMap = {};
            tree.leafMap = {};
            tree.root = this.createNode(tree, null, json.root);
            return tree;
        }

        private static createNode(tree: Tree, parent: Node, cfg: INodeJSON): Node {
            let node: Node;
            if (cfg.type === "leaf") {
                node = new Leaf();
                node.isLeaf = true;
                if (!tree.leafMap[cfg.name]) tree.leafMap[cfg.name] = [];
                tree.leafMap[cfg.name].push(node);
            }
            else if (cfg.type === "inverter") node = new Inverter();
            else if (cfg.type === "repeat-until-fail") node = new RepeatUntilFail();
            else if (cfg.type === "repeater") {
                node = new Repeater();
                (node as Repeater).init(cfg.loop || 0);
            }
            else if (cfg.type === "selector") node = new Selector();
            else if (cfg.type === "sequence") node = new Sequence();
            else if (cfg.type === "succeeder") node = new Succeeder();
            node.name = cfg.name;
            node.data = cfg.data;
            node.parent = parent;
            // if (node.name && tree.nodeMap[node.name]) console.error("节点名称重复:" + node.name);
            tree.nodeMap[node.name] = node;
            if (parent) parent.children.push(node);
            if (cfg.children) {
                for (let child of cfg.children) {
                    if (!child) continue;
                    this.createNode(tree, node, child);
                }
            }
            return node;
        }
    }

    window["behaviorTree"] = behaviorTree;

    export interface INodeJSON {
        name: string;
        type: string;
        children: (INodeJSON[]) | null;
        data?: any;
        loop?: number;
    }

    export interface ITreeJSON {
        version: string;
        root: INodeJSON;
    }


}