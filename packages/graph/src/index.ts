import cytoscape from 'cytoscape';
export { analyzeDocument, type AnalyzedDocument } from './analyze.js';

export interface GraphNode {
  id: string;
  label: string;
}

export interface GraphEdge {
  source: string;
  target: string;
  label?: string;
}

export interface GraphData {
  nodes: GraphNode[];
  edges: GraphEdge[];
}

export function generateGraph(
  docs: { id: string; content: string }[]
): GraphData {
  // TODO: Implement knowledge graph generation logic
  return {
    nodes: docs.map((doc) => ({ id: doc.id, label: doc.id })),
    edges: []
  };
}

export function renderGraph(
  container: HTMLElement,
  data: GraphData
): cytoscape.Core {
  const cy = cytoscape({
    container,
    elements: [
      ...data.nodes.map((n) => ({ data: { id: n.id, label: n.label } })),
      ...data.edges.map((e) => ({ data: { source: e.source, target: e.target, label: e.label } }))
    ],
    style: [
      {
        selector: 'node',
        style: {
          label: 'data(label)',
          'background-color': '#0070f3',
          color: '#000',
          'text-valign': 'center',
          'text-halign': 'center'
        }
      },
      {
        selector: 'edge',
        style: {
          'line-color': '#ccc',
          'target-arrow-color': '#ccc',
          'target-arrow-shape': 'triangle',
          'curve-style': 'bezier'
        }
      }
    ],
    layout: { name: 'grid' }
  });
  return cy;
}