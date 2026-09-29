// Pinterest 型のメイソンリー配置。各アイテムを「いちばん短い列」に置いていく。
// 高さは縦横比から決まるので、画像の読み込みを待たずに配置を確定できる。

export interface MasonryItem {
  /** 高さ / 幅 */
  aspect: number;
  /** 何列ぶんの幅を使うか（列数を超える場合は列数に切り詰める） */
  span: number;
}

export interface MasonryOptions {
  containerWidth: number;
  columns: number;
  gap: number;
}

export interface Placement {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface MasonryLayout {
  placements: Placement[];
  /** コンテナに必要な高さ（最後の間隔は含まない） */
  height: number;
}

export function layoutMasonry(items: readonly MasonryItem[], options: MasonryOptions): MasonryLayout {
  const columns = Math.max(1, Math.floor(options.columns));
  const { gap } = options;
  const columnWidth = (options.containerWidth - gap * (columns - 1)) / columns;
  // 各列の「次に置ける y 座標」
  const bottoms = new Array<number>(columns).fill(0);

  const placements = items.map(({ aspect, span: requested }) => {
    const span = Math.min(Math.max(1, Math.floor(requested)), columns);

    // span 列ぶんが空く位置のうち、もっとも上に置ける開始列を選ぶ（同じなら左）
    let bestColumn = 0;
    let bestY = Infinity;
    for (let column = 0; column + span <= columns; column++) {
      const y = Math.max(...bottoms.slice(column, column + span));
      if (y < bestY) {
        bestY = y;
        bestColumn = column;
      }
    }

    const width = columnWidth * span + gap * (span - 1);
    const height = width * aspect;
    for (let column = bestColumn; column < bestColumn + span; column++) {
      bottoms[column] = bestY + height + gap;
    }
    return { x: bestColumn * (columnWidth + gap), y: bestY, width, height };
  });

  return { placements, height: Math.max(0, Math.max(...bottoms) - gap) };
}
