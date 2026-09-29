# emar27181 Gallery Portfolio

**[English version click here](#english-version)** | 日本語版

## 📖 プロジェクト概要

emar27181のアート作品を展示するギャラリーポートフォリオサイトです。イラスト、写真、AI生成アート、ロゴデザインなど様々な作品を整理・表示します。

**🌐 ライブサイト**: https://emar27181-gallery-portfolio.netlify.app

## ✨ 主な機能

- **レスポンシブギャラリー**: デスクトップ5列、タブレット3列、モバイル2列の Pinterest 型メイソンリー（`src/lib/gallery-grid.ts`）
- **多タグフィルタ**: 複数タグを同時選択して作品を絞り込み（AND検索対応）
- **並び替え機能**: カスタム順、日付順、タイトル順、カテゴリ順での表示切り替え
- **フルスクリーンモーダル**: 画像クリックで拡大表示、背景クリック・Escキー・×ボタンで閉じる
- **ダーク/ライトテーマ**: テーマ切り替えボタンでモード変更
- **日本語UI**: 完全日本語対応のユーザーインターフェース

## 🎨 カテゴリー

- **猫** - 猫のイラスト・写真
- **イラスト** - キャラクター、ドラゴン、手の練習等
- **マンガ** - アニメ・マンガファンアート
- **写真** - 一般的な写真作品
- **空** - 空の写真
- **AI** - AI生成アート
- **ジェネラティブアート** - ロゴ・デザイン等

## 🛠️ 技術スタック

- **フレームワーク**: Astro 5.0
- **スタイリング**: CSS Variables（カスタムテーマシステム）
- **レイアウト**: Pinterest 型メイソンリー（縦横比から配置を計算）
- **画像**: `astro:assets` でビルド時に縮小・WebP 化
- **デプロイ**: Netlify
- **型チェック**: TypeScript

## 🚀 開発コマンド

プロジェクトのルートディレクトリで以下のコマンドを実行してください：

| コマンド | 説明 |
| :--- | :--- |
| `npm install` | 依存関係をインストール |
| `npm run dev` | 開発サーバーを起動（`localhost:4321`） |
| `npm run build` | 本番用ビルドを`./dist/`に生成 |
| `npm run preview` | ビルド結果をローカルでプレビュー |
| `npm run check` | 型チェック（`astro check`） |
| `npm test` | ユニットテスト（Vitest、`src/**/*.test.ts`） |
| `npm run test:e2e` | E2E テスト（Playwright、`e2e/`）。先に `npm run build` が必要 |
| `npm run verify` | 上記すべて（型チェック → ユニット → ビルド → E2E）。コミット前に実行 |
| `netlify deploy --prod` | Netlifyに本番デプロイ |

E2E テストの初回は `npx playwright install chromium` でブラウザを入れてください。
失敗時のトレースは `test-results/`、HTML レポートは `playwright-report/` に出力されます（どちらもコミットしない）。

CI（`.github/workflows/ci.yml`）は push / PR ごとに `verify` と同じ手順を実行します。

## 📁 プロジェクト構造

```text
/
├── .github/workflows/ci.yml  # CI（型チェック・テスト・ビルド・E2E）
├── e2e/                      # Playwright の E2E テスト
├── public/                   # そのまま配信するファイル（favicon など）
├── src/
│   ├── assets/
│   │   ├── gallery/          # 作品画像の原本（ビルド時に縮小・WebP 化）
│   │   └── brand/            # ロゴ・ローディングアニメーションの原本
│   ├── components/
│   │   ├── Gallery.astro     # ギャラリー（フィルタ・並び替え・モーダル）
│   │   └── NavBar.astro      # ナビゲーションバー
│   ├── data/
│   │   └── image.ts          # 作品データ定義
│   ├── lib/
│   │   ├── gallery.ts        # 並び替え・絞り込みの規則
│   │   ├── gallery-grid.ts   # 列数・間隔（CSS と sizes の生成元）
│   │   ├── gallery-images.ts # 作品画像の変換（ビルド時）
│   │   ├── brand-images.ts   # ロゴ等の変換（ビルド時）
│   │   ├── masonry.ts        # メイソンリーの配置計算
│   │   └── theme.ts          # テーマの保存・適用
│   ├── pages/
│   │   └── index.astro       # メインページ（ローディング画面）
│   └── styles/
│       └── global.css        # グローバルスタイル
├── ARCHITECTURE.md           # 構成と責務
├── CHANGELOG.md              # 変更履歴
├── CLAUDE.md                 # 開発ルール・仕様書
└── package.json
```

## 🎨 デザインシステム

### ライトテーマ
- 背景: `#f9fafb` / `#ffffff`
- テキスト: `#111827` / `#6b7280`
- アクセント: `#3b82f6`

### ダークテーマ
- 背景: `#111827` / `#1f2937`
- テキスト: `#f9fafb` / `#d1d5db`
- アクセント: `#60a5fa`

## 📝 ライセンス

このプロジェクトはポートフォリオ目的で作成されています。

---

## English Version

### 📖 Project Overview

A gallery portfolio site showcasing emar27181's artwork. Displays various works including illustrations, photography, AI-generated art, and logo designs in an organized manner.

**🌐 Live Site**: https://emar27181-gallery-portfolio.netlify.app

### ✨ Key Features

- **Responsive Gallery**: Adaptive layout with 5 columns (desktop), 3 columns (tablet), 2 columns (mobile)
- **Multi-tag Filter**: Filter works by selecting multiple tags simultaneously (AND search supported)
- **Sort Functionality**: Switch display order by custom, date, title, or category
- **Fullscreen Modal**: Click images for enlarged view, close with background click, Escape key, or × button
- **Dark/Light Theme**: Toggle between themes with theme switcher button
- **Japanese UI**: Fully Japanese-localized user interface

### 🎨 Categories

- **Cat (猫)** - Cat illustrations and photos
- **Illustration (イラスト)** - Characters, dragons, hand studies, etc.
- **Manga (マンガ)** - Anime and manga fan art
- **Photography (写真)** - General photography works
- **Sky (空)** - Sky photography
- **AI** - AI-generated art
- **Generative Art (ジェネラティブアート)** - Logos and designs

### 🛠️ Tech Stack

- **Framework**: Astro 5.0
- **Styling**: CSS Variables (custom theme system)
- **Layout**: Pinterest-style masonry (computed from aspect ratios)
- **Deployment**: Netlify
- **Type Checking**: TypeScript

### 🚀 Development Commands

Run these commands from the project root directory:

| Command | Action |
| :--- | :--- |
| `npm install` | Install dependencies |
| `npm run dev` | Start dev server at `localhost:4321` |
| `npm run build` | Build production site to `./dist/` |
| `npm run preview` | Preview build locally before deploying |
| `npm run check` | Type check (`astro check`) |
| `npm test` | Unit tests (Vitest) |
| `npm run test:e2e` | E2E tests (Playwright). Run `npm run build` first |
| `npm run verify` | All of the above. Run before committing |
| `netlify deploy --prod` | Deploy to Netlify production |

### 📝 License

This project is created for portfolio purposes.