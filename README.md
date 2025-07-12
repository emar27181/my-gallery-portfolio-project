# emar27181 Gallery Portfolio

**[English version click here](#english-version)** | 日本語版

## 📖 プロジェクト概要

emar27181のアート作品を展示するギャラリーポートフォリオサイトです。イラスト、写真、AI生成アート、ロゴデザインなど様々な作品を整理・表示します。

**🌐 ライブサイト**: https://emar27181-gallery-portfolio.netlify.app

## ✨ 主な機能

- **レスポンシブギャラリー**: デスクトップ4列、タブレット3列、モバイル2列の適応レイアウト
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
- **レイアウト**: CSS Grid
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
| `netlify deploy --prod` | Netlifyに本番デプロイ |

## 📁 プロジェクト構造

```text
/
├── public/
│   └── images/           # 作品画像ファイル
├── src/
│   ├── components/
│   │   ├── Gallery.astro # メインギャラリーコンポーネント
│   │   └── Navbar.astro  # ナビゲーションバー
│   ├── data/
│   │   └── image.ts      # 作品データ定義
│   ├── pages/
│   │   └── index.astro   # メインページ
│   └── styles/
│       └── global.css    # グローバルスタイル
├── CLAUDE.md             # 開発ルール・仕様書
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

- **Responsive Gallery**: Adaptive layout with 4 columns (desktop), 3 columns (tablet), 2 columns (mobile)
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
- **Layout**: CSS Grid
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
| `netlify deploy --prod` | Deploy to Netlify production |

### 📝 License

This project is created for portfolio purposes.