// @ts-check

/**
 * @typedef {{id: string, embedding: number[]}} AnalyzedDocument
 */

/**
 * Request OpenAI embeddings for a document.
 * Requires OPENAI_API_KEY environment variable.
 */
/**
 * Request embeddings for a document using OpenAI API.
 * @param {{id: string, content: string}} doc
 * @returns {Promise<AnalyzedDocument>}
 */
export async function analyzeDocument(doc) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) throw new Error('OPENAI_API_KEY is not set');

  const response = await fetch('https://api.openai.com/v1/embeddings', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: 'text-embedding-ada-002',
      input: doc.content,
    }),
  });

  if (!response.ok) {
    const msg = await response.text();
    throw new Error(`OpenAI API error: ${msg}`);
  }

  const json = await response.json();
  return { id: doc.id, embedding: json.data[0].embedding };
}


