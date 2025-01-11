import GraphNode from "./GraphNode";
/**
 *
 * @class Graph
 *
 * @description A class to represent a graph data structure with nodes and edges (nodes has directional edges to other nodes)
 *
 * @method getNodes - returns an array of all nodes in the graph
 * @method addNode - adds a node to the graph
 * @method setVertexValue - sets the weight of the edge between two nodes
 *
 * @property {GraphNode[]} #nodes - an array of GraphNode objects
 *
 * @example
 * const graph = new Graph();
 *
 * graph.addNode("A");
 * graph.addNode("B");
 * graph.addNode("C");
 *
 * graph.setVertexValue("A", "B", 4);
 *
 * console.log(graph.getNodes());
 * @returns {GraphNode[]} - an array of GraphNode objects
 *
 * @see GraphNode
 *
 */
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
        if (weight === undefined || weight < 0){
            throw new Error("addVertex requires a positive weight");
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
