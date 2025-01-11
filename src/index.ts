import Graph from "./Classes/Graph";

const graph = new Graph();

graph.addNode("A");
graph.addNode("B");
graph.addNode("C");
graph.addNode("D");
graph.addNode("E");

graph.setVertexValue("A", "B", 4);
graph.setVertexValue("B", "C", 7);
graph.setVertexValue("B", "D", 6);
graph.setVertexValue("B", "E", 9);
graph.setVertexValue("D", "E", 4);
graph.setVertexValue("E", "C", 2);


try {
    const { path, totalWeight } = graph.dijkstra("A", "E");
    console.log(`Path: ${path.join(" -> ")}, Total Weight: ${totalWeight}`);
} catch (error:any) {
    console.log(error.message);
}
