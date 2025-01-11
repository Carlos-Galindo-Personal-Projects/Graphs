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

    dijkstra(startNodeName: string, endNodeName: string): { path: string[], totalWeight: number } {
        if (!startNodeName || !endNodeName) {
            throw new Error("dijkstra requires both a start and end node name");
        }

        const startIndex = this.#nodes.findIndex(node => node.name === startNodeName);
        const endIndex = this.#nodes.findIndex(node => node.name === endNodeName);

        if (startIndex === -1 || endIndex === -1) {
            throw new Error("One or both nodes not found in the graph");
        }

        const distances: number[] = Array(this.#nodes.length).fill(Infinity);
        const previous: (number | null)[] = Array(this.#nodes.length).fill(null);
        const visited: boolean[] = Array(this.#nodes.length).fill(false);

        distances[startIndex] = 0;

        while (true) {
            // Find the unvisited node with the smallest distance
            let closestNodeIndex = -1;
            let smallestDistance = Infinity;

            for (let i = 0; i < distances.length; i++) {
                if (!visited[i] && distances[i] < smallestDistance) {
                    closestNodeIndex = i;
                    smallestDistance = distances[i];
                }
            }

            // If all nodes are visited or no reachable nodes remain
            if (closestNodeIndex === -1) break;

            visited[closestNodeIndex] = true;

            // Update distances to neighbors of the closestNode
            const neighbors = this.#nodes[closestNodeIndex].values;
            for (let i = 0; i < neighbors.length; i++) {
                if (neighbors[i] > 0 && !visited[i]) { // Edge exists and not visited
                    const newDistance = distances[closestNodeIndex] + neighbors[i];
                    if (newDistance < distances[i]) {
                        distances[i] = newDistance;
                        previous[i] = closestNodeIndex;
                    }
                }
            }
        }

        // Build the shortest path by backtracking from the end node
        const path: string[] = [];
        let currentNodeIndex: number | null = endIndex;

        while (currentNodeIndex !== null) {
            path.unshift(this.#nodes[currentNodeIndex].name);
            currentNodeIndex = previous[currentNodeIndex];
        }

        if (distances[endIndex] === Infinity) {
            throw new Error(`No path found from ${startNodeName} to ${endNodeName}`);
        }

        return { path, totalWeight: distances[endIndex] };
    }

}
