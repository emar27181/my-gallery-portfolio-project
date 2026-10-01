# 作品データの編集マニュアル

ギャラリーに載せる作品（画像・動画・Web サイト）は **`src/data/image.ts` の `images` 配列だけ** で管理している。
このファイルは、ChatGPT などの AI にそのまま貼り付けて作品データを編集してもらうための説明書。
AI に渡すときは「このマニュアル」と「`src/data/image.ts` の全文（または編集したい部分）」を一緒に貼る。

---

## 1. AI への依頼の仕方（コピーして使う）

```text
次のマニュアルに従って、src/data/image.ts の images 配列を編集してください。
- 出力は変更後の該当部分（オブジェクト単位）と、どこに挿入・置換するかの説明だけにしてください。
- マニュアルにないプロパティを増やさないでください。
- タグは「4. タグ」の一覧から選んでください。新しいタグが必要なら理由を添えて提案だけしてください。

やりたいこと: （例）猫のイラストを 2 枚追加。ファイル名は image_cat_mike1.jpg と image_cat_mike2.jpg、描いた日は 2026-10-01

--- マニュアル ---
（このファイルの内容を貼る）

--- 現在の src/data/image.ts ---
（ファイルの内容を貼る）
```

---

## 2. 作品の種類と書き方

どの種類にも共通で、次の 5 つが必須。

| プロパティ | 型 | 意味 |
|---|---|---|
| `type` | `'image'` / `'video'` / `'site'` | 作品の種類。これで必要なプロパティが決まる |
| `title` | 文字列 | 作品名。「タイトル (あ-ん)」の並び替えに使う |
| `alt` | 文字列 | 画像の代替テキスト（読み上げ用）。何が写っているかを 1 文で |
| `tags` | 文字列の配列（1 つ以上） | 絞り込みに使う。**先頭のタグが「カテゴリ」** として並び替えに使われる |
| `date` | `'YYYY-MM-DD'` | 制作日・撮影日。「日付」の並び替えに使う |
| `visible` | boolean（省略可） | `false` のときデータは残すがギャラリーには表示しない。省略時は表示 |

### 画像（`type: 'image'`）

```ts
{
  src: 'image_cat_mike1.jpg',
  alt: '三毛猫のイラスト',
  title: 'Mike the Cat 1',
  tags: ['猫', 'イラスト'],
  date: '2026-10-01',
  type: 'image'
},
```

- `src` は **`src/assets/gallery/` に置いた画像のファイル名**（フォルダ名は書かない）
- 画像ファイルは人が `src/assets/gallery/` に置く（AI はファイルを置けない）
- 縮小・WebP 化・寸法と代表色の取得はビルド時に自動。サイズ調整は不要
- ファイル名は既存に合わせて `image_<種類>_<名前><番号>.jpg`（例 `image_cat_ann1.jpg`、`image_photo_sky1.jpg`）

### 動画（`type: 'video'`、YouTube）

```ts
{
  src: 'https://img.youtube.com/vi/5IET-4mL9pA/maxresdefault.jpg',
  videoId: '5IET-4mL9pA',
  alt: 'VALORANT のプレイ動画',
  title: 'VALORANT クリップ',
  tags: ['動画', 'VALORANT'],
  date: '2025-01-11',
  type: 'video'
},
```

- `videoId` は YouTube の URL の `v=` の後ろ（`https://www.youtube.com/watch?v=5IET-4mL9pA` なら `5IET-4mL9pA`）
- `src` は `https://img.youtube.com/vi/<videoId>/maxresdefault.jpg`（videoId から機械的に作る）
- 一覧では 2 列ぶんの大きさで表示され、クリックでその場で再生する

### Web サイト（`type: 'site'`）

```ts
{
  url: 'https://example.netlify.app/',
  poster: 'example.png',
  alt: 'このサイトで何ができるかの説明です．',
  title: 'Example',
  tags: ['サイト', 'オリジナル'],
  date: '2026-01-01',
  type: 'site'
},
```

- `url` は `https://` で始まり、他のサイトと重複しない
- `poster`（省略可）は **`src/assets/sites/` に置いたサイトの画面写真のファイル名**。
  サイトが読み込まれるまでの間に表示する。省略するとタイトルを表示する
- 埋め込み（iframe）を拒否しているサイトは枠内に表示されない（「新しいタブで開く」では見られる）
- 試作の展示のため、**配列の末尾（`// Web Sites` の下）にまとめて置く**

---

## 3. 並び順

- 配列の順序がそのまま既定の並び順（「カスタム順」）。上にあるほど先に表示される
- カスタム順では、通常作品 → VALORANT以外の動画 → デモサイト群 → **VALORANT動画群を最後** の順にする
- 画像・動画は種類ごとのコメント（`// Cat Illustrations` など）の下に置く。Web サイトは必ず末尾
- 追加する場所の指定が無ければ、同じ種類・同じタグの作品の直後に置く

---

## 4. タグ

絞り込みは AND 検索（選んだタグをすべて持つ作品だけ表示）。**先頭のタグがカテゴリ** になる。
既存のタグから選ぶ。表記ゆれ（「ねこ」「Cat」など）を作らない。

- VALORANTクリップの `map` / `agent` / 武器・プレイ属性タグは、作品データ上では保持するが **フィルター候補には表示しない**。フィルターには `動画`・`VALORANT` など大分類タグだけを出す。

| タグ | 使う作品 |
|---|---|
| `猫` | 猫のイラスト・写真 |
| `イラスト` | キャラクター・ドラゴン・手の練習などのイラスト |
| `マンガ` | アニメ・マンガのファンアート |
| `写真` | 写真作品 |
| `空` | 空の写真 |
| `AI` | AI で生成した作品 |
| `ジェネラティブアート` | プログラムで生成した作品 |
| `ロゴ` | ロゴ・デザイン |
| `オリジナル` | 二次創作ではないオリジナル作品 |
| `VALORANT` | ゲーム VALORANT に関する作品 |
| `スノボ` | スノーボードの写真・動画 |
| `動画` | YouTube 動画（動画は先頭タグを `動画` にする） |
| `サイト` | 自作の Web サイト（サイトは先頭タグを `サイト` にする） |
| `6kills` | my-net-homepage-project から取り込んだ VALORANT クリップのメタデータ |
| `ascent` | my-net-homepage-project から取り込んだ VALORANT クリップのメタデータ |
| `astra` | my-net-homepage-project から取り込んだ VALORANT クリップのメタデータ |
| `bind` | my-net-homepage-project から取り込んだ VALORANT クリップのメタデータ |
| `breeze` | my-net-homepage-project から取り込んだ VALORANT クリップのメタデータ |
| `bucky` | my-net-homepage-project から取り込んだ VALORANT クリップのメタデータ |
| `bundit` | my-net-homepage-project から取り込んだ VALORANT クリップのメタデータ |
| `chamber` | my-net-homepage-project から取り込んだ VALORANT クリップのメタデータ |
| `classic` | my-net-homepage-project から取り込んだ VALORANT クリップのメタデータ |
| `clove` | my-net-homepage-project から取り込んだ VALORANT クリップのメタデータ |
| `clutch` | my-net-homepage-project から取り込んだ VALORANT クリップのメタデータ |
| `corrode` | my-net-homepage-project から取り込んだ VALORANT クリップのメタデータ |
| `cypher` | my-net-homepage-project から取り込んだ VALORANT クリップのメタデータ |
| `fracture` | my-net-homepage-project から取り込んだ VALORANT クリップのメタデータ |
| `ghost` | my-net-homepage-project から取り込んだ VALORANT クリップのメタデータ |
| `guardian` | my-net-homepage-project から取り込んだ VALORANT クリップのメタデータ |
| `haven` | my-net-homepage-project から取り込んだ VALORANT クリップのメタデータ |
| `icebox` | my-net-homepage-project から取り込んだ VALORANT クリップのメタデータ |
| `jett` | my-net-homepage-project から取り込んだ VALORANT クリップのメタデータ |
| `lotus` | my-net-homepage-project から取り込んだ VALORANT クリップのメタデータ |
| `omen` | my-net-homepage-project から取り込んだ VALORANT クリップのメタデータ |
| `onemagazine` | my-net-homepage-project から取り込んだ VALORANT クリップのメタデータ |
| `op` | my-net-homepage-project から取り込んだ VALORANT クリップのメタデータ |
| `pearl` | my-net-homepage-project から取り込んだ VALORANT クリップのメタデータ |
| `smooth` | my-net-homepage-project から取り込んだ VALORANT クリップのメタデータ |
| `spectre` | my-net-homepage-project から取り込んだ VALORANT クリップのメタデータ |
| `split` | my-net-homepage-project から取り込んだ VALORANT クリップのメタデータ |
| `summit` | my-net-homepage-project から取り込んだ VALORANT クリップのメタデータ |
| `sunset` | my-net-homepage-project から取り込んだ VALORANT クリップのメタデータ |
| `vandal` | my-net-homepage-project から取り込んだ VALORANT クリップのメタデータ |
| `viper` | my-net-homepage-project から取り込んだ VALORANT クリップのメタデータ |
| `waylay` | my-net-homepage-project から取り込んだ VALORANT クリップのメタデータ |

- 例：猫の写真 → `['猫', '写真']`、猫のイラスト → `['猫', 'イラスト']`
- 新しいタグを作るときは、この表にも行を足す（足さないとテストが落ちる）

---

## 5. 守ること

- プロパティ名・書式は既存の作品と同じにする（シングルクォート、各プロパティの末尾にカンマ、`type` は最後）
- 種類に合わないプロパティを書かない（画像に `url`、サイトに `videoId` など）。型チェックで落ちる
- `date` は実在する日付を `YYYY-MM-DD` で
- 画像の `src`・サイトの `poster` に書いたファイルは、実際にフォルダに置く
- 作品を消すときは配列から該当オブジェクトを消す。画像ファイルも不要なら `src/assets/` から消す
- 一時的に表示OFFにしたい作品は削除せず `visible: false` を付ける

---

## 6. 編集後の確認

```bash
npm run verify
```

型チェック・ユニットテスト・ビルド・E2E が通れば OK。作品データについては次を自動で検査している
（`src/lib/gallery.test.ts`「作品データ」）。

- 日付が `YYYY-MM-DD` で解釈できる
- タグが 1 つ以上ある
- 使っているタグがこのマニュアルの「4. タグ」の表に載っている
- 動画に `videoId` がある
- 画像の `src`・サイトの `poster` のファイルが実在する
- サイトの `url` が `https` で重複しない

画面で確かめるときは `npm run dev` で http://localhost:4321 を開く。
