import * as fs from 'node:fs';
import * as path from 'node:path';

export function importDocsFromDir(dir) {

  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const docs = [];

  for (const entry of entries) {
    if (entry.isFile() && entry.name.endsWith('.txt')) {
      const full = path.join(dir, entry.name);
      const content = fs.readFileSync(full, 'utf8');
      docs.push({ id: entry.name, content, createdAt: Date.now() });
    }
  }
  return docs;
}
