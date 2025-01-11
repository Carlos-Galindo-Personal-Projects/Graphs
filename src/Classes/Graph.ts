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

    setVertexValue(nodeFrom: string, nodeTo: string, weight: number) {
        if (nodeFrom === undefined){
            throw new Error("addVertex requires nodeFrom");
        }
        if (nodeTo === undefined){
            throw new Error("addVertex requires nodeTo");
        }
        if (weight === undefined){
            throw new Error("addVertex requires weight");
        }
        const nodeFromIndex = this.#nodes.findIndex((node) => node.name === nodeFrom);
        if (nodeFromIndex === -1){
            throw new Error("nodeFrom not found");
        }
        const nodeToIndex = this.#nodes.findIndex((node) => node.name === nodeTo);
        if (nodeToIndex === -1){
            throw new Error("nodeTo not found");
        }

        this.#nodes[nodeFromIndex].values[nodeToIndex] = weight;

        return this.#nodes[nodeFromIndex];
    }

}
