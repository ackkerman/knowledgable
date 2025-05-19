---
title: Reference
description: パッケージ構成と公開 API の概要
---

# リファレンス

## 設計思想
- プレーンテキストから知識グラフを生成し、ブラウザで閲覧するツール
- turbrorepo による monorepo 管理で `apps` と `packages` に分割
- データはブラウザのローカルストレージに保存し、オフラインでも利用可能

## アーキテクチャ概要
- **packages/data**: ドキュメントデータ管理
- **packages/graph**: グラフデータ構造と描画処理
- **packages/ui**: React コンポーネントなど UI 層
- **apps/web**: Next.js を用いたアプリケーション本体
詳しい設計思想は [Architecture](./architecture.md) を参照してください。

## あるべき姿
- ドキュメント解析からグラフ生成までの自動化ロジックを実装する
- 登録ドキュメントの検索・管理 UI を拡充する
- 包括的なテストとドキュメントを整備する

## 現在の実装と API
### packages/data
`Document` 型とローカルストレージ操作関数を提供する。
- `Document` 定義【F:packages/data/src/index.ts†L1-L6】
- `saveDoc`/`getDocs`/`deleteDoc`/`searchDocs` の実装【F:packages/data/src/index.ts†L8-L34】

### packages/graph
知識グラフのデータ構造と描画機能を扱う。
- `GraphNode`/`GraphEdge`/`GraphData` 定義【F:packages/graph/src/index.ts†L3-L17】
- `generateGraph` (生成ロジックは未実装)【F:packages/graph/src/index.ts†L19-L27】
- `renderGraph` による Cytoscape 描画【F:packages/graph/src/index.ts†L29-L63】

### packages/ui
React 製のビューワを提供する。
- `GraphViewer` コンポーネント【F:packages/ui/src/GraphViewer.tsx†L1-L26】

