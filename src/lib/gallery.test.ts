import { existsSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { images } from '../data/image';
import {
  DEFAULT_SORT,
  SORT_OPTIONS,
  isSortKey,
  matchesAllTags,
  sortItems,
  tagsByUsage,
  type SortableItem,
} from './gallery';

const items: SortableItem[] = [
  { index: 0, title: 'Banana', date: '2024-01-02', tags: ['写真'] },
  { index: 1, title: 'Apple', date: '2024-03-01', tags: ['イラスト', '猫'] },
  { index: 2, title: 'Cherry', date: '2023-12-31', tags: ['イラスト'] },
];

const titles = (list: SortableItem[]) => list.map((item) => item.title);

describe('sortItems', () => {
  it('カスタム順はデータの並び順', () => {
    expect(titles(sortItems([...items].reverse(), 'custom'))).toEqual(['Banana', 'Apple', 'Cherry']);
  });

  it('日付順', () => {
    expect(titles(sortItems(items, 'date-desc'))).toEqual(['Apple', 'Banana', 'Cherry']);
    expect(titles(sortItems(items, 'date-asc'))).toEqual(['Cherry', 'Banana', 'Apple']);
  });

  it('タイトル順', () => {
    expect(titles(sortItems(items, 'title-asc'))).toEqual(['Apple', 'Banana', 'Cherry']);
    expect(titles(sortItems(items, 'title-desc'))).toEqual(['Cherry', 'Banana', 'Apple']);
  });

  it('カテゴリ順は先頭タグで分け、同カテゴリ内は新しい順', () => {
    expect(titles(sortItems(items, 'category'))).toEqual(['Apple', 'Cherry', 'Banana']);
  });

  it('元の配列を変更しない', () => {
    const copy = [...items];
    sortItems(items, 'title-desc');
    expect(items).toEqual(copy);
  });
});

describe('matchesAllTags', () => {
  it('未選択なら全件一致', () => {
    expect(matchesAllTags(['猫'], [])).toBe(true);
  });

  it('選択タグをすべて持つときだけ一致（AND）', () => {
    expect(matchesAllTags(['猫', 'イラスト'], ['猫', 'イラスト'])).toBe(true);
    expect(matchesAllTags(['猫', '写真'], ['猫', 'イラスト'])).toBe(false);
  });
});

describe('tagsByUsage', () => {
  it('使用数の多い順、同数は初出順', () => {
    expect(tagsByUsage(items)).toEqual(['イラスト', '写真', '猫']);
  });
});

describe('並び替えの選択肢', () => {
  it('既定値は選択肢に含まれる', () => {
    expect(isSortKey(DEFAULT_SORT)).toBe(true);
    expect(isSortKey('unknown')).toBe(false);
  });

  it('表示ラベルを固定する（CLAUDE.md「日本語ローカライゼーション」）', () => {
    expect(SORT_OPTIONS.map((option) => option.label)).toEqual([
      'カスタム順',
      '日付 (新しい順)',
      '日付 (古い順)',
      'タイトル (あ-ん)',
      'タイトル (ん-あ)',
      'カテゴリ',
    ]);
  });
});

describe('作品データ', () => {
  it('日付は YYYY-MM-DD で解釈できる', () => {
    for (const image of images) {
      expect(image.date, image.src).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(Number.isNaN(Date.parse(image.date)), image.src).toBe(false);
    }
  });

  it('動画には videoId がある', () => {
    for (const image of images.filter((image) => image.type === 'video')) {
      expect(image.videoId, image.src).toBeTruthy();
    }
  });

  it('タグが1つ以上ある（先頭タグをカテゴリとして使う）', () => {
    for (const image of images) {
      expect(image.tags.length, image.src).toBeGreaterThan(0);
    }
  });

  it('画像は src/assets/gallery/ に実在する', () => {
    for (const image of images.filter((image) => image.type === 'image')) {
      expect(existsSync(`src/assets/gallery/${image.src}`), image.src).toBe(true);
    }
  });
});
