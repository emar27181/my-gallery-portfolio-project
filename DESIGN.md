# DESIGN

emar27181 Gallery のデザイン規格。**値の実体は `src/styles/tokens.css` にだけ置き**、この文書は
「どの段階があり、何に使い、どう選ぶか」を定める。下の表の値は `src/styles/design-guards.test.ts` が
tokens.css と突き合わせるので、表と実装が食い違うとテストが落ちる。

## 1. 参考にしたもの

作品を大量に、隙間なく、読み込み待ちを感じさせずに見せる、という目的が同じ Pinterest を主な参考にした。
Pinterest の公開デザインシステム **Gestalt**（https://gestalt.pinterest.systems/ ）と、Pinterest のホームフィードから次を取り入れる。

| Pinterest / Gestalt の考え方 | このサイトでの規格 |
| :--- | :--- |
| 固定幅の列に、次の作品を「いちばん短い列」へ置くメイソンリー | `src/lib/masonry.ts`。縦横比をビルド時に取り、読み込み前に位置を確定する |
| 画像が届くまで作品の代表色を敷く | ビルド時に代表色を取り、タイルの地に敷く（`Tile` atom） |
| 作品の上には文字を載せず、操作はホバーで出す | タイル上の案内（再生・操作開始）はホバー時だけ。タッチ端末では常時 |
| 余白・文字・角丸は 4px 基準の少ない段階から選ぶ（Gestalt の spacing / font size / rounding トークン） | 下の 3〜6 章の段階だけを使う |
| 指で押す操作は 44〜48px、丸い（pill）ボタン | 操作部品は md 44px / sm 24px の 2 段階。アイコンボタンは丸 |
| 色は無彩色の地に、アクセント 1 色 | 地・文字は灰色系、アクセントは primary（青）1 色 |

Pinterest と違えている点（このサイトで既に決めた見た目を優先）:

- 作品の間隔は 4px（Pinterest は 16px 前後）。CLAUDE.md「画像間隔は4pxの統一スペーシング」
- 作品の角丸は 8px（Pinterest は 16px）。CLAUDE.md「角丸（rounded-lg）」
- アクセント色は赤ではなく青。CLAUDE.md「選択したタグは青いチップ」

## 2. 原則

1. **作品が主役**。枠・影・文字は最小限にし、作品の上に常時表示の文字を置かない。
2. **値は選ぶもの**。トークンの段階から選び、段階に無い値は近い段階に丸める。段階を足す前に既存で足りないか確かめる。
3. **同じ規則を 2 箇所に書かない**。書こうとしたら共通化する（見た目は atoms、列数は `gallery-grid.ts`、色は tokens.css）。
4. **状態は塗りで示す**。選択・押下で枠線の太さ・文字の太さ・大きさを変えない（外形が動いて並びがずれるため）。
5. **待たせない**。初期表示に入る作品はローディング画面の間に読み込み・デコードを済ませ、位置は読み込み前に確定する。

## 3. 色

意味色だけを使う。基底色（`--color-gray-*` など）はトークンの中でだけ参照し、コンポーネントからは使わない。
ライト・ダークの切り替えは tokens.css の `[data-theme='dark']` の上書きだけで行い、コンポーネントでテーマ分岐を書かない。
半透明は `rgba()` を書かず、`color-mix()` で作ったトークンを使う。

| トークン | ライトの値 | 用途 |
| :--- | :--- | :--- |
| `--color-bg` | `var(--color-gray-50)` | ページの地 |
| `--color-surface` | `var(--color-white)` | ナビ・入力欄・メニューなど面の地 |
| `--color-surface-muted` | `var(--color-gray-200)` | チップの地など控えめな面 |
| `--color-surface-hover` | `var(--color-gray-300)` | 面のホバー |
| `--color-text` | `var(--color-gray-900)` | 本文 |
| `--color-text-muted` | `var(--color-gray-500)` | 見出しラベル・プレースホルダー |
| `--color-border` | `var(--color-gray-300)` | 枠線 |
| `--color-primary` | `var(--color-blue-600)` | アクセント（選択・フォーカス・ホバーの枠） |
| `--color-on-primary` | `var(--color-white)` | primary の上の文字 |
| `--color-placeholder` | `var(--color-gray-300)` | 代表色が無いタイルの地 |
| `--color-media-control` | `color-mix(in srgb, var(--color-white) 90%, transparent)` | 写真・動画の上に載せる操作部品の地 |
| `--color-on-media-control` | `var(--color-gray-900)` | その上の文字 |
| `--color-media-overlay` | `color-mix(in srgb, var(--color-black) 30%, transparent)` | 写真を少し暗くする |
| `--color-scrim` | `color-mix(in srgb, var(--color-black) 50%, transparent)` | メニューの背景 |
| `--color-scrim-strong` | `color-mix(in srgb, var(--color-black) 90%, transparent)` | 拡大表示の背景 |

コントラスト（WCAG 2.x の相対輝度から計算）:

| 組み合わせ | ライト | ダーク |
| :--- | :--- | :--- |
| 本文 / 地 | 16.98 : 1 | 16.98 : 1 |
| 控えめな文字 / 地 | 4.63 : 1 | 9.96 : 1（面の上） |
| primary 上の文字 / primary | 5.17 : 1 | 6.98 : 1 |

primary はライトで `#3b82f6` → `#2563eb`、ダークの on-primary は白 → `--color-gray-900` に変えた。
以前の組み合わせは白文字が 3.68 : 1（ライト）/ 2.54 : 1（ダーク）で、小さい文字の AA（4.5 : 1）を満たしていなかった。

## 4. 文字

段階は 5 つ（比 1.14〜1.25）。見出しと本文で別系統を作らない。**12px を下限**にする
（Apple HIG 11pt / Material Design 12sp / GOV.UK 12px。WCAG に絶対値の規定は無い）。

| トークン | 値 | 用途 |
| :--- | :--- | :--- |
| `--font-size-caption` | `12px` | チップ・小さいボタン |
| `--font-size-body` | `14px` | 本文・見出しラベル |
| `--font-size-title` | `16px` | 入力欄・主要なボタン（iOS Safari は 16px 未満の入力欄で自動拡大する） |
| `--font-size-heading` | `20px` | パネルの見出し |
| `--font-size-display` | `24px` | サイト名 |
| `--font-weight-regular` | `400` | 通常 |
| `--font-weight-bold` | `700` | 見出し・サイト名 |

## 5. 余白

4px 基準。この中から選ぶ。

| トークン | 値 |
| :--- | :--- |
| `--space-2` | `2px` |
| `--space-4` | `4px` |
| `--space-6` | `6px` |
| `--space-8` | `8px` |
| `--space-10` | `10px` |
| `--space-12` | `12px` |
| `--space-16` | `16px` |
| `--space-20` | `20px` |
| `--space-24` | `24px` |
| `--space-40` | `40px` |

作品の間隔と左右の余白は `--space-4`（`src/lib/gallery-grid.ts` の `GALLERY_GAP_TOKEN`）。

## 6. 角の丸み

値ではなく役割で選ぶ。基準は画面でいちばん多い部品（作品のタイル）に合わせる。

| トークン | 値 | 役割 |
| :--- | :--- | :--- |
| `--radius-card` | `8px` | 作品のタイル・拡大表示の画像 |
| `--radius-control` | `8px` | ボタン・入力欄・ドロップダウン |
| `--radius-pill` | `9999px` | チップ・丸いアイコンボタン・タイル上の案内 |

## 7. 寸法とタッチ領域

操作部品の高さは **2 段階だけ**。同じ行・同じグループに並ぶ操作は同じ段階にする。

| トークン | 値 | 用途 |
| :--- | :--- | :--- |
| `--control-height-md` | `44px` | 指で押す主要な操作（ナビのボタン・フィルタ・並び替え・メニューの項目）。Apple HIG 44pt。Material は 48dp |
| `--control-height-sm` | `24px` | 補助操作（チップの ×・サイト枠の帯のボタン）。WCAG 2.2 AA 2.5.8 の下限 |
| `--icon-size-sm` | `16px` | 小さいボタン内・外部リンクの印 |
| `--icon-size-md` | `20px` | 通常のアイコンボタン |
| `--icon-size-lg` | `24px` | 再生ボタン・ロゴ |
| `--border-width` | `1px` | 枠線 |
| `--focus-ring-width` | `2px` | キーボードフォーカスの輪 |

レイアウトの寸法（段階ではなく場所ごとに 1 つ）:

| トークン | 値 | 用途 |
| :--- | :--- | :--- |
| `--layout-navbar-height` | `70px` | ナビゲーションバー（CLAUDE.md で固定） |
| `--layout-content-max-width` | `1200px` | ナビの中身の最大幅 |
| `--layout-control-width` | `180px` | フィルタと並び替えの幅（揃える） |
| `--layout-drawer-width` | `300px` | メニューのパネル（画面幅の 80% を上限） |

画面幅での切り替え（`@media` の幅指定）はコンポーネントに書かない。ギャラリーの列数だけは
`src/lib/gallery-grid.ts` の `GALLERY_BREAKPOINTS` から CSS を生成する（デスクトップ 5 列・タブレット 3 列・モバイル 2 列）。
それ以外は折り返し（`flex-wrap`）と `min()` で幅に追従させる。

## 8. 重なり・影・動き

| トークン | 値 | 用途 |
| :--- | :--- | :--- |
| `--opacity-hover` | `0.8` | 文字・ロゴのホバー |
| `--opacity-hover-media` | `0.9` | 作品のホバー（CLAUDE.md） |
| `--opacity-disabled` | `0.4` | 押せない操作部品（外形は変えず薄くする） |

| トークン | 値 | 用途 |
| :--- | :--- | :--- |
| `--shadow-sm` | `0 2px 4px var(--color-shadow)` | ナビゲーションバー |
| `--shadow-md` | `0 4px 12px var(--color-shadow)` | ドロップダウン・写真の上のボタン |
| `--shadow-lg` | `0 20px 25px -5px var(--color-shadow-strong)` | パネル・拡大表示 |
| `--z-dropdown` | `10` | ドロップダウン |
| `--z-navbar` | `100` | ナビゲーションバー |
| `--z-drawer` | `200` | メニューのパネル |
| `--z-modal` | `300` | 拡大表示 |
| `--z-loading` | `1000` | ローディング画面 |
| `--duration-fast` | `200ms` | ホバー・色の変化 |
| `--duration-base` | `300ms` | 開閉・並び替えの移動 |
| `--duration-slow` | `500ms` | ローディング画面の出入り |

`prefers-reduced-motion: reduce` では時間をすべて 0 にする（tokens.css で一括）。
時間を JS に書かない。終わりを待つときは `transitionend`（時間が 0 なら即座に）を使う。

## 9. アトミックデザイン

層は**何を知っているか**で決める。見た目の複雑さでは決めない。

| 層 | 知ってよいもの | 部品（`src/components/`） |
| :--- | :--- | :--- |
| atoms | トークンだけ | `Button` / `IconButton` / `LinkButton` / `CoverButton` / `Select` / `Chip` / `Icon` / `Tile` |
| molecules | atoms の組み合わせ方だけ | `Field` / `RemovableChip` / `MultiSelect` / `Drawer` / `Lightbox` / `EmbedFrame` / `EmbedViewer` / `VideoEmbed` |
| organisms | サイトの概念（作品・タグ・並び順）と実データ・文言 | `NavBar` / `Gallery` / `LoadingScreen` |

迷ったら:

1. その部品からドメイン語（作品・タグ・動画など）を消せるか？ 消せないなら organism
2. props を差し替えれば別のサイトでも使えるか？ 使えるなら atom / molecule

atoms の規則:

1. 寸法・色はトークンから取る。部品ごとに高さ・角丸・余白を作らない
2. テーマは CSS 変数で受け取る。JS でテーマを読まない
3. 状態で外形を変えない（塗りで示す）
4. 文言を持たない。表示する文字・読み上げ名は props / slot で受け取る（日本語の文言は organisms が渡す）
5. アイコンは `Icon`（形は `icons.ts`）。絵文字・記号文字で代用しない
6. 新しくボタン・入力欄・チップを書かない。既存の atom を使う（生の `<button>` などは atoms の外では書けない）

molecules は動きも持つ（開閉・選択など）。organisms にはカスタムイベントで伝える
（`MultiSelect` → `multiselect-change`、`Lightbox` ← `lightbox-open`、`EmbedFrame` → `embed-expand`、`EmbedViewer` ← `embed-viewer-open`）。

全画面表示（`EmbedViewer`）は、操作を上端（閉じる・新しいタブ）と下端（前後の矢印・位置）に分け、
前後の矢印は親指の届く下端に置く。端末の「戻る」で閉じられるよう、開くときに履歴を 1 つ積む。

## 10. 検証

- **ガード**（`npm test`）: `src/styles/design-guards.test.ts` が次を検査する。例外はファイルと理由を `EXCEPTIONS` に書く
  - atoms の外で生の `<button>` `<select>` `<input>` `<textarea>` を書いていない
  - tokens.css の外で寸法（px・rem・em）・色（#hex・rgb・hsl・色名）・`@media` の幅を書いていない
  - 使っている `var(--…)` がすべて定義されている
  - 文字・余白・高さ・角丸の段階と下限
  - この文書の表の値が tokens.css と一致する
- **実描画**（`npm run measure:styles -- <ラベル>`）: ブラウザで全要素の computed style を集計し、
  画面に実在する文字サイズ・角丸・余白・色・操作部品の高さの種類と件数を `reports/` に出す。
  静的な検査は「書かれているか」しか分からないので、見た目を変えたら両方を見る。
