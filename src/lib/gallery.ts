// ギャラリーの並び替え・絞り込みの規則。
// サーバー側（タグ一覧の生成）とクライアント側（操作時の再描画）の両方がここを参照する。

export const SORT_OPTIONS = [
  { value: 'custom', label: 'カスタム順' },
  { value: 'date-desc', label: '日付 (新しい順)' },
  { value: 'date-asc', label: '日付 (古い順)' },
  { value: 'title-asc', label: 'タイトル (あ-ん)' },
  { value: 'title-desc', label: 'タイトル (ん-あ)' },
  { value: 'category', label: 'カテゴリ' },
] as const;

export type SortKey = (typeof SORT_OPTIONS)[number]['value'];

export const DEFAULT_SORT: SortKey = 'custom';

export function isSortKey(value: string): value is SortKey {
  return SORT_OPTIONS.some((option) => option.value === value);
}

/** 並び替えに必要な最小限の情報 */
export interface SortableItem {
  /** `src/data/image.ts` 上の位置（カスタム順の基準） */
  index: number;
  title: string;
  /** YYYY-MM-DD */
  date: string;
  tags: readonly string[];
}

const byDateDesc = (a: SortableItem, b: SortableItem) =>
  Date.parse(b.date) - Date.parse(a.date);

const comparators: Record<SortKey, (a: SortableItem, b: SortableItem) => number> = {
  custom: (a, b) => a.index - b.index,
  'date-desc': byDateDesc,
  'date-asc': (a, b) => -byDateDesc(a, b),
  'title-asc': (a, b) => a.title.localeCompare(b.title),
  'title-desc': (a, b) => b.title.localeCompare(a.title),
  // 先頭タグをカテゴリとみなし、同じカテゴリ内は新しい順
  category: (a, b) =>
    (a.tags[0] ?? '').localeCompare(b.tags[0] ?? '') || byDateDesc(a, b),
};

/** 元の配列を変えずに並び替えた新しい配列を返す */
export function sortItems<T extends SortableItem>(items: readonly T[], key: SortKey): T[] {
  return [...items].sort(comparators[key]);
}

/** 選択タグをすべて持つか（AND 検索）。未選択なら常に true */
export function matchesAllTags(itemTags: readonly string[], selected: readonly string[]): boolean {
  return selected.every((tag) => itemTags.includes(tag));
}

/** タグを使用数の多い順に返す。同数なら初出順 */
export function tagsByUsage(items: readonly { tags: readonly string[] }[]): string[] {
  const counts = new Map<string, number>();
  for (const tag of items.flatMap((item) => item.tags)) {
    counts.set(tag, (counts.get(tag) ?? 0) + 1);
  }
  return [...counts.keys()].sort((a, b) => counts.get(b)! - counts.get(a)!);
}


/**
 * 作品データには保持するが、フィルター候補には出さない詳細メタデータタグ。
 * VALORANT クリップの map / agent / 武器・プレイ属性を対象にする。
 */
export const HIDDEN_FILTER_TAGS = new Set([
  '6kills',
  'ascent',
  'astra',
  'bind',
  'breeze',
  'bucky',
  'bundit',
  'chamber',
  'classic',
  'clove',
  'clutch',
  'corrode',
  'cypher',
  'fracture',
  'ghost',
  'guardian',
  'haven',
  'icebox',
  'jett',
  'lotus',
  'omen',
  'onemagazine',
  'op',
  'pearl',
  'smooth',
  'spectre',
  'split',
  'summit',
  'sunset',
  'vandal',
  'viper',
  'waylay',
] as const);

/** フィルターUIに表示するタグだけを使用数順で返す */
export function filterTagsByUsage(items: readonly { tags: readonly string[] }[]): string[] {
  return tagsByUsage(items).filter((tag) => !HIDDEN_FILTER_TAGS.has(tag as never));
}

/** 拡大表示の下に出す説明。省略時、Web サイトは alt（何ができるサイトかの説明文）を使う */
export function workDescription(work: { type: string; alt: string; description?: string }): string | undefined {
  return work.description ?? (work.type === 'site' ? work.alt : undefined);
}

/** link 先が展示中の Web サイトなら、そのサイトのタイトルを返す（リンクの文言に使う） */
export function linkedSiteTitle(
  link: string,
  works: readonly { type: string; title: string; url?: string }[],
): string | undefined {
  return works.find((work) => work.type === 'site' && work.url === link)?.title;
}
