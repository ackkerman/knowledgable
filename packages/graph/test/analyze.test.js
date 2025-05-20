import { strict as assert } from 'node:assert';
import { analyzeDocument } from '../src/analyze.js';

process.env.OPENAI_API_KEY = 'test';

let called = false;
const fakeEmbedding = [1, 2, 3];
globalThis.fetch = async (url, options) => {
  called = true;
  assert.equal(url, 'https://api.openai.com/v1/embeddings');
  const body = JSON.parse(options.body);
  assert.equal(body.model, 'text-embedding-ada-002');
  assert.equal(body.input, 'hello');
  return {
    ok: true,
    json: async () => ({ data: [{ embedding: fakeEmbedding }] }),
  };
};

const result = await analyzeDocument({ id: '1', content: 'hello' });
assert(called, 'fetch should be called');
assert.deepEqual(result, { id: '1', embedding: fakeEmbedding });


