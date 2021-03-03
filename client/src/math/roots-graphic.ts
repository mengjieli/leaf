/**
 * 具有根节点的有向图，用以快速计算根节点到任意节点的连通性
 * 
 */
export class RootsVGraphic {

    /**
     * 所有根节点
     */
    rootNodes: Node[];

    rootNodesMap: { [index: number]: Node };

    /**
     * 所有节点
     */
    nodes: Node[];

    nodesMap: { [index: number]: Node };

    /**
     * 所有边
     */
    edges: Edge[];

    edgesMap: { [index: number]: Edge };


    static create(roots: number[], nodes: { id: number, active: boolean, data?: any }[],
        edges: { id: number, active: boolean, from: number, to: number }[]) {
        let graphic = new RootsVGraphic();
        graphic.rootNodes = [];
        graphic.rootNodesMap = {};
        graphic.nodes = [];
        graphic.nodesMap = {};
        graphic.edges = [];
        graphic.edgesMap = {};
        for (let data of nodes) {
            let node = new Node();
            node.id = data.id;
            node.data = data.data;
            node.active = data.active;
            node.graphic = graphic;
            node.fromEdges = [];
            node.toEdges = [];
            node.toNodes = [];
            node.toNodesMap = {};
            graphic.nodes.push(node);
            graphic.nodesMap[node.id] = node;
        }
        for (let id of roots) {
            graphic.nodesMap[id].isRoot = true;
            graphic.rootNodes.push(graphic.nodesMap[id]);
            graphic.rootNodesMap[id] = graphic.nodesMap[id];
        }
        for (let data of edges) {
            let edge = new Edge();
            edge.id = data.id;
            edge.active = data.active;
            edge.graphic = graphic;
            edge.from = graphic.nodesMap[data.from];
            edge.to = graphic.nodesMap[data.to];
            edge.from.fromEdges.push(edge);
            edge.to.toEdges.push(edge);
            edge.toNodes = [];
            edge.toNodesMap = {};
            graphic.edges.push(edge);
            graphic.edgesMap[edge.id] = edge;
        }
        for (let node of graphic.nodes) {
            this.createNodeSubGraphic(graphic, node);
        }
        return graphic;
    }

    private static createNodeSubGraphic(graphic: RootsVGraphic, aim: Node) {
        let g = aim.selfSubGraphic = new SubRootsVGraphic();
        g.rootNodes = [];
        g.rootNodesMap = {};
        g.nodes = [];
        g.nodesMap = {};
        g.edges = [];
        g.edgesMap = {};
        g.aimNode = aim;
        g.graphic = graphic;
        g.hasRootPathDirty = true;
        for (let node of graphic.rootNodes) {
            this.scanSubGraphic(g, node, [node], []);
        }
        g.hasCheckedNodes = {};
        for (let node of g.nodes) {
            g.hasCheckedNodes[node.id] = false;
        }
    }

    private static scanSubGraphic(graphic: SubRootsVGraphic, node: Node, nodes: Node[], edges: Edge[]) {
        if (node == graphic.aimNode || graphic.nodesMap[node.id]) {
            for (let node of nodes) {
                if (!graphic.nodesMap[node.id]) {
                    graphic.nodesMap[node.id] = node;
                    graphic.nodes.push(node);
                }
                if (node.isRoot) {
                    if (!graphic.rootNodesMap[node.id]) {
                        graphic.rootNodesMap[node.id] = node;
                        graphic.rootNodes.push(node);
                    }
                }
                if (!node.toNodesMap[graphic.aimNode.id]) {
                    node.toNodesMap[graphic.aimNode.id] = graphic.aimNode;
                    node.toNodes.push(graphic.aimNode);
                }
            }
            for (let edge of edges) {
                if (!graphic.edgesMap[edge.id]) {
                    graphic.edgesMap[edge.id] = edge;
                    graphic.edges.push(edge);
                }
                if (!edge.toNodesMap[graphic.aimNode.id]) {
                    edge.toNodesMap[graphic.aimNode.id] = graphic.aimNode;
                    edge.toNodes.push(graphic.aimNode);
                }
            }
        } else {
            for (let edge of node.fromEdges) {
                nodes.push(edge.to);
                edges.push(edge);
                this.scanSubGraphic(graphic, edge.to, nodes, edges);
            }
        }
        nodes.pop();
        edges.pop();
    }
}

export class Node {

    id: number;

    private _active: boolean = false;

    public set active(val: boolean) {
        if (this._active === val) return;
        this._active = val;
        if (this.toNodes) {
            for (let node of this.toNodes) {
                node.selfSubGraphic.hasRootPathDirty = true;
            }
        }
    }

    public get active(): boolean {
        return this._active;
    }

    get hasPathFromRoots(): boolean {
        return this.selfSubGraphic.hasPathFromRoots;
    }

    data: any;

    isRoot: boolean;

    graphic: RootsVGraphic;

    /**
     * 以这个点为起点的边
     */
    fromEdges: Edge[];

    /**
     * 以这个点为终点的边
     */
    toEdges: Edge[];

    /**
     * 可以到达的节点
     */
    toNodes: Node[];

    /**
     * 可以到达的节点
     * key 可以到达的节点的 id
     */
    toNodesMap: { [index: number]: Node };

    /**
     * 根节点是否可达此节点与此图是否可从根节点走到此节点相关
     */
    selfSubGraphic: SubRootsVGraphic;
}

export class Edge {

    id: number;

    private _active: boolean = false;

    public set active(val: boolean) {
        if (this._active === val) return;
        this._active = val;
        if (this.toNodes) {
            for (let node of this.toNodes) {
                node.selfSubGraphic.hasRootPathDirty = true;
            }
        }
    }

    public get active(): boolean {
        return this._active;
    }

    graphic: RootsVGraphic;

    from: Node;

    to: Node;

    /**
     * 可以到达的节点
     */
    toNodes: Node[];

    /**
     * 可以到达的节点
     * key 可以到达的节点的 id
     */
    toNodesMap: { [index: number]: Node };
}

/**
 * 根节点到每个子节点的子图
 */
export class SubRootsVGraphic {

    graphic: RootsVGraphic;

    /**
     * 子图中的根节点
     */
    rootNodes: Node[];

    rootNodesMap: { [index: number]: Node };

    /**
     * 子图中的所有节点
     */
    nodes: Node[];

    nodesMap: { [index: number]: Node };

    /**
     * 子图中的所有边
     */
    edges: Edge[];

    edgesMap: { [index: number]: Edge };

    /**
     * 目标节点
     */
    aimNode: Node;

    private pathOk: boolean;
    hasCheckedNodes: { [index: number]: boolean };
    private rootPath: { nodes: Node[], edges: Edge[] };
    public static callCount = 0;
    // public static checkNodes = [];

    hasRootPathDirty: boolean;

    private hasRootPathResult: boolean;

    get hasPathFromRoots() {
        if (!this.hasRootPathDirty) return this.hasRootPathResult;
        //TODO
        //待优化，对比另外一种思路，循环调用父节点的可行性
        this.pathOk = false;
        for (let node of this.nodes) {
            this.hasCheckedNodes[node.id] = false;
        }
        for (let node of this.rootNodes) {
            if (!node.active) continue;
            this.scanSubGraphic(node);
            if (this.pathOk) break;
        }
        this.hasRootPathResult = this.pathOk;
        this.hasRootPathDirty = false;
        return this.pathOk;
    }

    public hasPathFromRoot(node: Node) {
        this.pathOk = false;
        for (let node of this.nodes) {
            this.hasCheckedNodes[node.id] = false;
        }
        this.scanSubGraphic(node);
        return this.pathOk;
    }

    private scanSubGraphic(node: Node) {
        // SubRootsVGraphic.checkNodes.push(node);
        this.hasCheckedNodes[node.id] = true;
        SubRootsVGraphic.callCount++;
        if (node == this.aimNode) {
            this.pathOk = true;
            return;
        } else {
            for (let edge of node.fromEdges) {
                if (!edge.active || !edge.to.active || !this.edgesMap[edge.id] || this.hasCheckedNodes[edge.to.id]) continue;
                this.scanSubGraphic(edge.to);
                if (this.pathOk) return;
            }
        }
    }

    getRootPath(root: Node): { nodes: Node[], edges: Edge[] } {
        this.pathOk = false;
        this.rootPath = {
            nodes: [],
            edges: []
        }
        this.scanSubGraphic2(root);
        return this.pathOk ? this.rootPath : null;
    }

    private scanSubGraphic2(node: Node) {
        if (node == this.aimNode) {
            this.pathOk = true;
            return;
        } else {
            for (let edge of node.fromEdges) {
                if (!edge.to.active) continue;
                this.rootPath.nodes.push(edge.to);
                this.rootPath.edges.push(edge);
                this.scanSubGraphic2(edge.to);
                if (this.pathOk) return;
            }
        }
        this.rootPath.nodes.pop();
        this.rootPath.edges.pop();
    }
}