---
title: Getting Started
description: 開発環境の構築手順
---

# Getting Started

このセクションでは Knowledgable をローカル環境で動かすまでの手順を説明します。

## 1. 依存関係のインストール

```bash
pnpm install
```

インターネット接続環境が必要です。ネットワーク設定によってはプロキシの利用を検討してください。

## 2. 開発サーバーの起動

```bash
pnpm dev
```

`apps/web` が起動し、`http://localhost:3000` でアプリを確認できます。

## 3. ドキュメントサイトのビルド

```bash
pnpm run docs:build
```

`apps/docs-site/dist` に静的サイトが生成されます。

## 4. テストの実行

```bash
pnpm test
```

テストは `node:test` を利用しており、モノレポ全体のパッケージに対して実行されます。
