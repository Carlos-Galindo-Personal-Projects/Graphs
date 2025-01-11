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
