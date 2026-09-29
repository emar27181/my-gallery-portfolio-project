# ARCHITECTURE

Astro による静的サイト（1ページ）。ビルド時に作品データから HTML を生成し、
並び替え・絞り込み・モーダルなどの操作だけをクライアント側のスクリプトで行う。

## ディレクトリと責務

| 場所 | 責務 | 依存してよいもの |
| :--- | :--- | :--- |
| `src/data/` | 作品データ（`image.ts`）。画像・動画・Web サイトの判別共用体。配列の順序がそのまま「カスタム順」 | なし |
| `src/assets/gallery/` | 作品画像の原本。ビルド時に縮小・WebP 化され、原本は配信されない | なし |
| `src/assets/brand/` | ロゴ・ローディングアニメーションの原本（同上） | なし |
| `src/lib/` | UI を持たない規則。DOM に触れないものはユニットテストの対象。`*-images.ts` はビルド専用 | `src/data/`, `src/assets/` |
| `src/components/` | 画面部品。マークアップとその部品の操作スクリプト | `src/lib/`, `src/data/` |
| `src/pages/` | ページの組み立て、ローディング画面 | `src/components/`, `src/lib/` |
| `src/styles/global.css` | すべてのスタイルと CSS 変数（テーマ色、ギャラリーの行単位・間隔） | なし |
| `e2e/` | 実ブラウザでの振る舞いの検証 | `src/data/`, `src/lib/`（期待値の計算に使う） |

## 規則の置き場所（一元管理）

- **並び替え・絞り込み** … `src/lib/gallery.ts`。選択肢とラベル（`SORT_OPTIONS`）、比較関数、AND 検索、
  タグの使用数順を定義する。`Gallery.astro` のマークアップ（選択肢の生成）とスクリプト（再描画）、
  E2E テスト（期待値）が同じ関数を使う。
- **テーマ** … `src/lib/theme.ts`。保存キーと既定値を持つ。`<head>` の描画前スクリプトも
  `define:vars` でここからキーを受け取る。
- **列数・間隔・動画の列幅** … `src/lib/gallery-grid.ts`。ここから CSS 変数（`--gallery-columns` /
  `--gallery-gap`）の media query と、画像の `sizes` 属性を生成する。配置スクリプトは CSS 変数を読む。
- **メイソンリーの配置規則** … `src/lib/masonry.ts`（純粋関数、ユニットテスト対象）。
- **画像の変換（縮小幅・形式・画質）** … `src/lib/gallery-images.ts`（作品）、`src/lib/brand-images.ts`（ロゴ等）。

## 画像の準備（ビルド時）

`src/lib/gallery-images.ts` が作品ごとに次を用意し、`Gallery.astro` が HTML に書き出す。

- 一覧用の縮小 WebP（320 / 480 / 640 / 960 / 1280px、原本より大きい幅は作らない）と `srcset` / `sizes`
- モーダル用の WebP（最大 2048px）
- 原本の寸法（縦横比）と代表色（sharp の `stats().dominant`）

原本のプロパティ（`ImageMetadata.width` など）を読むと Astro が原本を `dist/` に残すため、
寸法は sharp で原本ファイルから読む。

## ギャラリーの状態と描画

`Gallery.astro` のスクリプトは状態を `state = { selectedTags, sort }` の1箇所だけに持ち、
変更のたびに `layout()` で DOM に反映する。

- **配置（Pinterest 型メイソンリー）** … 並び替え・絞り込み後のアイテムを、先頭から順に
  「いちばん短い列」へ置く（`layoutMasonry`）。高さは縦横比から計算するので、画像の読み込みを
  待たずに位置が確定し、読み込み後に位置が動くことはない。各アイテムは `transform` で絶対配置する。
  1列幅のアイテムは置いた順に上端が下がっていくため、読み順は並び替え順と一致する。
  2列幅の動画は揃う位置まで下がることがある。
- **Web サイト** は iframe を `loading="lazy"` で置き、上に透明な `.site-activate` を重ねて
  クリックまでサイトに入力を渡さない。クリックで `.is-active` を付けて操作可能にし、
  「操作を終える」・外側クリック・Escape で外す。初期表示の準備（ローディング画面）は iframe を待たない。
- **絞り込み** は `hidden` 属性で行う（`[hidden] { display: none !important }`）。
- **画面幅の変更** は `ResizeObserver` でギャラリーの幅を監視し、幅が変わったときだけ詰め直す。
- **スクリプト前の表示** … 配置計算前（`.is-masonry` が付く前）は通常の CSS Grid で並ぶ。
- **読み込み中の見た目** … 各アイテムは代表色を敷いた箱として先に描かれ、画像が届いたら
  フェードインする（`.is-loaded`）。

## ローディング画面

1. HTML の時点で先頭の数枚（最大列数ぶん）は `loading="eager"` で取りに行く。
2. `Gallery.astro` が配置を計算し、初期表示に入るアイテムを割り出して `fetchpriority="high"` で読み込み、
   `img.decode()` でデコードまで済ませる。済んだら `#gallery[data-ready]` を付け、`gallery:ready` を送る。
3. `index.astro` はこれを受けて閉じる（最低 1 秒、最大 6 秒）。メインコンテンツは読み込み中も
   `visibility: hidden` でレイアウトされているため、幕が上がった時点で画面内は描画済みになる。
