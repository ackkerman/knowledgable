import { rm, mkdir, readFile, writeFile, cp } from 'node:fs/promises';
import { resolve, dirname, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import fg from 'fast-glob';

const CWD  = dirname(fileURLToPath(import.meta.url));            // <repo>/scripts
const SRC  = resolve(CWD, '../docs');
const DEST = resolve(CWD, '../apps/docs-site/src/content/docs'); // <repo>/apps/docs-site/src/content/docs

// ① 旧コピーを全削除
await rm(DEST, { recursive: true, force: true });
// ② 必要ディレクトリを確保
await mkdir(DEST, { recursive: true });

// ③ docs 以下を全部スキャン
const entries = await fg('**/*', { cwd: SRC, dot: true });

for (const entry of entries) {
  const srcPath  = resolve(SRC, entry);
  const destPath = resolve(DEST, entry);

  // ディレクトリなら mkdir だけして次へ
  if (entry.endsWith('/')) {
    await mkdir(destPath, { recursive: true });
    continue;
  }

  // .md / .mdx ならフロントマッター付与
  if (/\.(md|mdx)$/i.test(entry)) {
    const raw = await readFile(srcPath, 'utf8');

    // 先頭が `---` なら既にフロントマッターあり → そのままコピー
    if (raw.trimStart().startsWith('---')) {
      await mkdir(dirname(destPath), { recursive: true });
      await writeFile(destPath, raw);
      continue;
    }

    // 最初に現れる H1 (# 見出し) をタイトルに採用
    const h1 = raw.split(/\r?\n/).find((l) => /^#\s+/.test(l));
    const title = h1
      ? h1.replace(/^#\s+/, '').trim()
      : relative(SRC, srcPath).replace(/\.(md|mdx)$/i, '');

      const frontMatter = `---\ntitle: ${title}\n---\n\n`;
      await mkdir(dirname(destPath), { recursive: true });
      await writeFile(destPath, frontMatter + raw);
    } else {
      // 画像やその他はバイナリコピー
      await mkdir(dirname(destPath), { recursive: true });
      await cp(srcPath, destPath, { force: true });
    }
  }
  
  console.log('✅ docs → content へ同期 & フロントマッター付与 完了');
