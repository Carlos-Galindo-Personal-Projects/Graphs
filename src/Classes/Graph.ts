import GraphNode from "./GraphNode";

export default class Graph {

    #nodes: GraphNode[];

    constructor() {
        this.#nodes = [];
    }

    getNodes() {
        return this.#nodes.map((node) => node.values);
    }

    addNode(nodeName: string) {

        if (nodeName === undefined) {
            throw new Error("addNode requires a nodeName");
        }

        const newLength = this.#nodes.length + 1;
        this.#nodes.forEach((node) => {
            node.values.push(0);
        })
        const newNode = new GraphNode(nodeName, Array(newLength).fill(0));
        this.#nodes.push(newNode);
        return newNode;
    }

}
