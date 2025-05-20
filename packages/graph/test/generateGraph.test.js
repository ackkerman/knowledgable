import { strict as assert } from 'node:assert';
import { generateGraph } from '../src/index.js';

let graph = generateGraph([{ id: '1', content: 'Hello world. Goodbye moon.' }]);

let nodeIds = graph.nodes.map(n => n.id).sort();
assert.deepEqual(nodeIds, ['goodbye', 'hello', 'moon', 'world']);

function hasEdge(a, b) {
  return graph.edges.some(
    e => (e.source === a && e.target === b) || (e.source === b && e.target === a)
  );
}

assert.equal(graph.edges.length, 2);
assert(hasEdge('hello', 'world'));
assert(hasEdge('goodbye', 'moon'));

// repeated words should not create duplicate edges
graph = generateGraph([{ id: '2', content: 'Hello hello world.' }]);
nodeIds = graph.nodes.map(n => n.id).sort();
assert.deepEqual(nodeIds, ['hello', 'world']);
assert.equal(graph.edges.length, 1);
assert(hasEdge('hello', 'world'));
