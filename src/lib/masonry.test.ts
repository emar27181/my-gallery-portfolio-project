import { describe, expect, it } from 'vitest';
import { layoutMasonry } from './masonry';

const options = { containerWidth: 320, columns: 3, gap: 10 }; // 列幅 100

describe('layoutMasonry', () => {
  it('最初の1行は左から順に並ぶ', () => {
    const { placements } = layoutMasonry(
      [{ aspect: 1, span: 1 }, { aspect: 2, span: 1 }, { aspect: 0.5, span: 1 }],
      options,
    );
    expect(placements.map((p) => [p.x, p.y, p.width, p.height])).toEqual([
      [0, 0, 100, 100],
      [110, 0, 100, 200],
      [220, 0, 100, 50],
    ]);
  });

  it('次のアイテムはいちばん短い列に詰める', () => {
    const { placements } = layoutMasonry(
      [{ aspect: 1, span: 1 }, { aspect: 2, span: 1 }, { aspect: 0.5, span: 1 }, { aspect: 1, span: 1 }],
      options,
    );
    // 3列目（高さ50）が最短
    expect(placements[3]).toEqual({ x: 220, y: 60, width: 100, height: 100 });
  });

  it('高さが同じ列が複数あれば左を選ぶ', () => {
    const { placements } = layoutMasonry(
      [{ aspect: 1, span: 1 }, { aspect: 1, span: 1 }, { aspect: 1, span: 1 }, { aspect: 1, span: 1 }],
      options,
    );
    expect(placements[3]).toMatchObject({ x: 0, y: 110 });
  });

  it('複数列にまたがるアイテムは、またがる列のうち最も低い底に揃えて置く', () => {
    const { placements } = layoutMasonry(
      [{ aspect: 1, span: 1 }, { aspect: 2, span: 1 }, { aspect: 0.5, span: 1 }, { aspect: 0.5, span: 2 }],
      options,
    );
    // 列0-1 は max(110, 210) = 210、列1-2 は max(210, 60) = 210 → 同じなので左
    expect(placements[3]).toEqual({ x: 0, y: 210, width: 210, height: 105 });
  });

  it('span が列数を超えたら列数に切り詰める', () => {
    const { placements } = layoutMasonry([{ aspect: 0.5, span: 5 }], options);
    expect(placements[0]).toEqual({ x: 0, y: 0, width: 320, height: 160 });
  });

  it('コンテナの高さは最も低い列の底（最後の間隔を除く）', () => {
    const layout = layoutMasonry([{ aspect: 1, span: 1 }, { aspect: 2, span: 1 }], options);
    expect(layout.height).toBe(200);
  });

  it('1列幅のアイテムは、並べた順に上端が下がっていく（読み順を保つ）', () => {
    const items = Array.from({ length: 50 }, (_, i) => ({ aspect: 0.5 + ((i * 37) % 17) / 10, span: 1 }));
    const { placements } = layoutMasonry(items, { containerWidth: 1000, columns: 5, gap: 4 });
    for (let i = 1; i < placements.length; i++) {
      expect(placements[i].y).toBeGreaterThanOrEqual(placements[i - 1].y);
    }
  });

  it('空なら高さ0', () => {
    expect(layoutMasonry([], options)).toEqual({ placements: [], height: 0 });
  });
});
