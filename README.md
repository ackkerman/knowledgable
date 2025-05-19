# knowledgeable

このリポジトリは、プレーンテキストの記事から知識グラフを生成し、
ブラウザ上で閲覧できるツールのベースプロジェクトです。

主な技術スタックは以下のとおりです。

- **Next.js** + **tailwindcss** + **shadcn** + **GSAP** による UI
- **cytoscape.js** を用いたグラフ描画
- **turborepo** による monorepo 管理
- データ保存はブラウザのローカルストレージ

詳しい要件と実装計画は `docs/` ディレクトリを参照してください。

TODO リストは `TODO.md` に記載されています。

## テスト実行方法

```bash
npm test
```

Node.js 標準の `node:test` を用いてテストを実行します。
