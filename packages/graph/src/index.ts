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
  const stopWords = new Set([
    'the',
    'and',
    'is',
    'in',
    'at',
    'of',
    'a',
    'an',
    'to',
    'for',
    'with',
    'on',
    'by',
    'it',
    'this',
    'that',
    'from',
    'or',
    'as',
    'are'
  ]);

  const nodesMap = new Map<string, GraphNode>();
  const edgeSet = new Set<string>();

  const cleanWord = (word: string) =>
    word
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '')
      .trim();

  const extractKeywords = (sentence: string): string[] => {
    const words = sentence
      .split(/\s+/)
      .map(cleanWord)
      .filter((w) => w && !stopWords.has(w));
    return Array.from(new Set(words));
  };

  for (const doc of docs) {
    const sentences = doc.content
      .split(/[.!?]/)
      .map((s) => s.trim())
      .filter(Boolean);

    for (const sentence of sentences) {
      const keywords = extractKeywords(sentence);

      // create nodes
      for (const kw of keywords) {
        if (!nodesMap.has(kw)) nodesMap.set(kw, { id: kw, label: kw });
      }

      // create edges between every pair of keywords in the sentence
      for (let i = 0; i < keywords.length; i++) {
        for (let j = i + 1; j < keywords.length; j++) {
          const a = keywords[i];
          const b = keywords[j];
          const key = a < b ? `${a}-${b}` : `${b}-${a}`;
          if (!edgeSet.has(key)) {
            edgeSet.add(key);
          }
        }
      }
    }
  }

  const edges: GraphEdge[] = Array.from(edgeSet).map((key) => {
    const [source, target] = key.split('-');
    return { source, target };
  });

  return { nodes: Array.from(nodesMap.values()), edges };
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