# ARCHITECTURE

Astro による静的サイト（1ページ）。ビルド時に作品データから HTML を生成し、
並び替え・絞り込み・モーダルなどの操作だけをクライアント側のスクリプトで行う。

## ディレクトリと責務

| 場所 | 責務 | 依存してよいもの |
| :--- | :--- | :--- |
| `src/data/` | 作品データ（`image.ts`）。画像・動画・Web サイトの判別共用体。配列の順序がそのまま「カスタム順」 | なし |
| `src/assets/gallery/` | 作品画像の原本。ビルド時に縮小・WebP 化され、原本は配信されない | なし |
| `src/assets/sites/` | Web サイトの画面写真の原本（同上）。サイトが読み込まれるまで枠に敷く | なし |
| `src/assets/brand/` | ロゴ・ローディングアニメーションの原本（同上）。PWA のアイコンもここのサインから作る | なし |
| `src/lib/` | UI を持たない規則。DOM に触れないものはユニットテストの対象。`*-images.ts` はビルド専用 | `src/data/`, `src/assets/` |
| `src/components/atoms/` | トークンだけを知る部品（ボタン・選択欄・チップ・アイコン・タイル） | `src/styles/tokens.css` |
| `src/components/molecules/` | atoms の組み合わせと、その開閉・選択などの動き | atoms |
| `src/components/organisms/` | サイトの概念（作品・タグ・並び順）と実データ・日本語の文言 | molecules, atoms, `src/lib/`, `src/data/` |
| `src/pages/` | ページの組み立て、ローディング画面 | `src/components/`, `src/lib/` |
| `src/styles/tokens.css` | デザイントークンの唯一の定義元（色・文字・余白・角丸・寸法・影・動き、ライト/ダーク） | なし |
| `src/styles/global.css` | リセット・body・`[hidden]`・フォーカスの輪だけ。部品の見た目は各コンポーネントの `<style>` | tokens.css |
| `e2e/` | 実ブラウザでの振る舞いの検証 | `src/data/`, `src/lib/`（期待値の計算に使う） |

## 規則の置き場所（一元管理）

- **並び替え・絞り込み** … `src/lib/gallery.ts`。選択肢とラベル（`SORT_OPTIONS`）、比較関数、AND 検索、
  タグの使用数順を定義する。`Gallery.astro` のマークアップ（選択肢の生成）とスクリプト（再描画）、
  E2E テスト（期待値）が同じ関数を使う。
- **見た目の値** … `src/styles/tokens.css`（規格は `DESIGN.md`）。`src/styles/design-guards.test.ts` が直書きを検出する。
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
- **部品間の連絡** はカスタムイベントで行う。`MultiSelect` は選択が変わると `multiselect-change` を送り、
  `Gallery` は画像が押されると `lightbox-open` を送って `Lightbox` を開く。`EmbedFrame`（Web サイト）と
  `VideoEmbed`（動画）は自分の操作（操作開始・終了、再生）を自分で扱う。
  `EmbedFrame` の全画面ボタンは `embed-expand` を送り、`Gallery` が表示中のサイトを並び順どおりに集めて
  `embed-viewer-open` で `EmbedViewer` を開く（前後の切り替えは絞り込み・並び替えの結果に従う）。
  `EmbedViewer` は切り替えのたびに iframe を差し替える（src の書き換えはブラウザの履歴に積まれ、「戻る」が iframe の中で消費されるため）。
- **Web サイトの読み込み** … iframe は `data-src` だけを持って描かれ、枠が画面に近づいたとき
  （`IntersectionObserver`、先読みは画面の高さの半分）か操作を始めたときに読み込む。届くまでは画面写真
  （`poster`）か、無ければタイトルを見せ、iframe の `load` でフェードインする（`.is-loaded`）。
  全画面表示（`EmbedViewer`）も同じく画面写真の上にフェードインする。
  埋め込みを拒否するサイトでも `load` は発火するため、その場合はブラウザのエラー表示に切り替わる。
- **Web サイトの枠の縦横比** は、スマホ（列数が最少）では `SITE_FRAME_NARROW`（縦長）、それ以外は `SITE_FRAME` を
  `layout()` が画面幅に応じて選ぶ。
- **絞り込み** は `hidden` 属性で行う（`[hidden] { display: none !important }`）。
- **画面幅の変更** は `ResizeObserver` でギャラリーの幅を監視し、幅が変わったときだけ詰め直す。
- **スクリプト前の表示** … 配置計算前（`.is-masonry` が付く前）は通常の CSS Grid で並ぶ。
- **読み込み中の見た目** … 各アイテムは代表色を敷いた箱として先に描かれ、画像が届いたら
  フェードインする（`.is-loaded`）。

## PWA（ホーム画面に追加）

- マニフェスト（`/manifest.webmanifest`）とアイコン（`/icons/<name>.png`）は `src/pages/` のエンドポイントがビルド時に書き出す。
- アイコンはローディング画面のサインのアニメーション（`src/assets/brand/mov-sign-unscreen.gif`）の最後のコマ
  （描き終わった形）を `--color-surface` の正方形に置いたもの（`src/lib/app-icons.ts`）。maskable は端が切り取られるため余白を広く取る。
- 色は `src/lib/design-tokens.ts` が tokens.css から読む（CSS の外でもトークンを唯一の定義元にする）。
- サイト名は `src/lib/site.ts`（`<title>`・ナビゲーション・マニフェストで共通）。

## ローディング画面

1. HTML の時点で先頭の数枚（最大列数ぶん）は `loading="eager"` で取りに行く。
2. `Gallery.astro` が配置を計算し、初期表示に入るアイテムを割り出して `fetchpriority="high"` で読み込み、
   `img.decode()` でデコードまで済ませる。済んだら `#gallery[data-ready]` を付け、`gallery:ready` を送る。
3. `index.astro` はこれを受けて閉じる（最低 1 秒、最大 6 秒）。メインコンテンツは読み込み中も
   `visibility: hidden` でレイアウトされているため、幕が上がった時点で画面内は描画済みになる。最低表示時間は固定秒数ではなく、原本GIFの各フレーム遅延を合計して算出し、サインアニメーションを必ず1周表示する。
