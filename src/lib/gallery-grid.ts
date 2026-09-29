// ギャラリーの列数・間隔の定義元。
// CSS（列数の CSS 変数）と画像の sizes 属性はここから生成し、配置スクリプトは CSS 変数を読む。

/** アイテム間と左右の余白（px）。CLAUDE.md「画像間隔は4pxの統一スペーシング」 */
export const GALLERY_GAP = 4;

/** 動画が使う列数（列数が少なければ列数に切り詰める） */
export const VIDEO_SPAN = 2;

/** Web サイトが使う列数。中で操作できるよう大きく取る（タブレット・モバイルでは全幅） */
export const SITE_SPAN = 3;

/** Web サイトの枠の縦横比（幅 16 : 高さ 10、一般的なノート PC の画面に近い） */
export const SITE_FRAME = { width: 1600, height: 1000 } as const;

/** 画面幅ごとの列数。maxWidth の昇順。CLAUDE.md「デスクトップ5列、タブレット3列、モバイル2列」 */
export const GALLERY_BREAKPOINTS = [
  { maxWidth: 768, columns: 2 },
  { maxWidth: 1024, columns: 3 },
  { maxWidth: Infinity, columns: 5 },
] as const;

export function columnsFor(viewportWidth: number): number {
  return GALLERY_BREAKPOINTS.find((bp) => viewportWidth <= bp.maxWidth)!.columns;
}

/** span 列ぶんの画像の表示幅を、画面幅に対する割合で表した sizes 属性 */
export function gallerySizes(span = 1): string {
  const vw = (columns: number) => `${Math.ceil((Math.min(span, columns) / columns) * 100)}vw`;
  return GALLERY_BREAKPOINTS.map((bp) =>
    bp.maxWidth === Infinity ? vw(bp.columns) : `(max-width: ${bp.maxWidth}px) ${vw(bp.columns)}`,
  ).join(', ');
}

/** 列数と間隔を CSS 変数として出力する（media query は広い画面から順に上書き） */
export function galleryGridCss(selector: string): string {
  const [widest, ...narrower] = [...GALLERY_BREAKPOINTS].reverse();
  return [
    `${selector}{--gallery-columns:${widest.columns};--gallery-gap:${GALLERY_GAP}px}`,
    ...narrower.map((bp) => `@media (max-width:${bp.maxWidth}px){${selector}{--gallery-columns:${bp.columns}}}`),
  ].join('\n');
}

/**
 * 初期表示に入る画像の読み込み・デコードが済んだときに document へ送るイベント。
 * 送信済みかどうかは #gallery の data-ready 属性でも分かる（ローディング画面が後から見に来ても取りこぼさない）
 */
export const GALLERY_READY_EVENT = 'gallery:ready';
