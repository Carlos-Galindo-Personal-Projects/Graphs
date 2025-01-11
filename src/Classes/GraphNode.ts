/**
 *
 * GraphNode class
 *
 * @class GraphNode
 *
 * @description Represents a node in a graph data structure
 *
 * @property {string} name - the name of the node
 * @property {number[]} values - an array of numbers
 *
 * @example
 * const node = new GraphNode("A", [1, 2, 3]);
 *
 * console.log(node.name); // "A"
 *
 * console.log(node.values); // [1, 2, 3]
 *
 * @returns {GraphNode} - a GraphNode object
 *
 * @see Graph
 *
 */

export default class GraphNode {

    name: string;
    values: number[];

    constructor(name: string, values: number[]) {

        if (name === undefined || values === undefined) {
            throw new Error("GraphNode constructor requires a name and values");
        }

        this.name = name;
        this.values = values;
    }
}
