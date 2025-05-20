import { strict as assert } from 'node:assert';
import { writeFileSync, mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { importDocsFromDir } from '../src/importDocs.js';

const dir = mkdtempSync(join(tmpdir(), 'docs-'));
try {
  writeFileSync(join(dir, 'a.txt'), 'hello');
  writeFileSync(join(dir, 'b.txt'), 'world');

  const docs = importDocsFromDir(dir);
  assert.equal(docs.length, 2);
  const ids = docs.map(d => d.id).sort();
  assert.deepEqual(ids, ['a.txt', 'b.txt']);
  assert.equal(docs.find(d => d.id === 'a.txt').content, 'hello');
} finally {
  rmSync(dir, { recursive: true, force: true });
}
