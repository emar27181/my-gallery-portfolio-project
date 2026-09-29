import { describe, expect, it } from 'vitest';
import { GALLERY_BREAKPOINTS, columnsFor, galleryGridCss, gallerySizes } from './gallery-grid';

describe('columnsFor', () => {
  it('CLAUDE.md の列数（モバイル2・タブレット3・デスクトップ5）', () => {
    expect(columnsFor(390)).toBe(2);
    expect(columnsFor(768)).toBe(2);
    expect(columnsFor(769)).toBe(3);
    expect(columnsFor(1024)).toBe(3);
    expect(columnsFor(1025)).toBe(5);
  });

  it('breakpoint は昇順で、最後は上限なし', () => {
    const widths = GALLERY_BREAKPOINTS.map((bp) => bp.maxWidth);
    expect([...widths].sort((a, b) => a - b)).toEqual(widths);
    expect(widths.at(-1)).toBe(Infinity);
  });
});

describe('gallerySizes', () => {
  it('1列ぶん', () => {
    expect(gallerySizes()).toBe('(max-width: 768px) 50vw, (max-width: 1024px) 34vw, 20vw');
  });

  it('2列ぶん（モバイルでは全幅）', () => {
    expect(gallerySizes(2)).toBe('(max-width: 768px) 100vw, (max-width: 1024px) 67vw, 40vw');
  });
});

describe('galleryGridCss', () => {
  it('広い画面を既定にし、狭い画面を media query で上書きする', () => {
    expect(galleryGridCss('.g')).toBe(
      [
        '.g{--gallery-columns:5;--gallery-gap:4px}',
        '@media (max-width:1024px){.g{--gallery-columns:3}}',
        '@media (max-width:768px){.g{--gallery-columns:2}}',
      ].join('\n'),
    );
  });
});
