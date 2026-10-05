// フィルターに表示するタグの視覚的な意味色を一元管理する。
// 色そのものは src/styles/tokens.css の --color-tag-* が唯一の定義元。

export type TagTone =
  | 'neutral'
  | 'red'
  | 'blue'
  | 'violet'
  | 'emerald'
  | 'orange'
  | 'pink'
  | 'cyan'
  | 'amber'
  | 'indigo';

export const TAG_TONES: Readonly<Record<string, TagTone>> = {
  VALORANT: 'red',
  サイト: 'blue',
  動画: 'violet',
  写真: 'emerald',
  イラスト: 'amber',
  猫: 'orange',
  マンガ: 'pink',
  AI: 'cyan',
  ジェネラティブアート: 'indigo',
  ロゴ: 'neutral',
  オリジナル: 'blue',
  空: 'cyan',
  スノボ: 'cyan',
};

export function tagTone(tag: string): TagTone {
  return TAG_TONES[tag] ?? 'neutral';
}
