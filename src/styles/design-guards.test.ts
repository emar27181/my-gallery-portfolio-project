// DESIGN.md の規約を機械的に守らせるガード。
// 例外は EXCEPTIONS に「ファイル: 理由」で書く。理由の書けない例外は作らない。

import { readdirSync, readFileSync, statSync } from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';

const ROOT = process.cwd();
const TOKENS_FILE = 'src/styles/tokens.css';
const ATOMS_DIR = 'src/components/atoms/';

/** 規約の例外。キーはリポジトリ相対パス、値は理由 */
const EXCEPTIONS: Record<string, string> = {};

function walk(dir: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    const full = path.join(dir, name);
    return statSync(full).isDirectory() ? walk(full) : [path.relative(ROOT, full)];
  });
}

const sourceFiles = walk(path.join(ROOT, 'src')).filter(
  (file) => /\.(astro|css|ts)$/.test(file) && !file.endsWith('.test.ts') && !(file in EXCEPTIONS),
);
const read = (file: string) => readFileSync(path.join(ROOT, file), 'utf8');

/** CSS として解釈される部分（.css 全体、.astro の <style> と style="…"） */
function cssOf(file: string): string {
  const text = read(file);
  if (file.endsWith('.css')) return text;
  if (!file.endsWith('.astro')) return '';
  const blocks = [...text.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/g)].map((m) => m[1]);
  const inline = [...text.matchAll(/\sstyle="([^"]*)"/g)].map((m) => m[1]);
  return [...blocks, ...inline].join('\n');
}

/** 行番号つきで一致箇所を返す（失敗時にどこを直せばよいか分かるように） */
function findAll(text: string, pattern: RegExp): string[] {
  return text
    .split('\n')
    .flatMap((line, i) => (pattern.test(line) ? [`${i + 1}: ${line.trim()}`] : []));
}

function violations(files: string[], extract: (file: string) => string, pattern: RegExp): Record<string, string[]> {
  const result: Record<string, string[]> = {};
  for (const file of files) {
    const hits = findAll(extract(file), pattern);
    if (hits.length > 0) result[file] = hits;
  }
  return result;
}

// ---- tokens.css の読み取り --------------------------------------------------------

const tokensCss = read(TOKENS_FILE);
/** :root で定義したトークン（ダーク・動きを減らす設定の上書きは含めない） */
const rootBlock = tokensCss.slice(tokensCss.indexOf(':root {'), tokensCss.indexOf('}', tokensCss.indexOf(':root {')));
const tokens = new Map(
  [...rootBlock.matchAll(/(--[\w-]+):\s*([^;]+);/g)].map((m) => [m[1], m[2].replace(/\s+/g, ' ').trim()]),
);
const px = (value: string | undefined) => Number(value?.match(/^(\d+)px$/)?.[1]);
const tokensWithPrefix = (prefix: string) => [...tokens].filter(([name]) => name.startsWith(prefix));

describe('部品の使い方', () => {
  it('生の <button> <select> <input> <textarea> は atoms の中だけで書く', () => {
    const outsideAtoms = sourceFiles.filter((file) => !file.startsWith(ATOMS_DIR));
    const found = violations(
      outsideAtoms,
      read,
      /<(button|select|input|textarea)[\s>]|createElement\(\s*["'](button|select|input|textarea)["']/,
    );
    expect(found).toEqual({});
  });
});

describe('ハードコーディングしない', () => {
  const styleFiles = sourceFiles.filter((file) => file !== TOKENS_FILE && /\.(astro|css)$/.test(file));

  it('寸法（px・rem・em）はトークンから取り、直接書かない', () => {
    expect(violations(styleFiles, cssOf, /(?<![\w-])\d*\.?\d+(px|rem|em)\b/)).toEqual({});
  });

  it('色（#hex・rgb・hsl・色名）はトークンから取り、直接書かない', () => {
    const colorLiteral = /#[0-9a-fA-F]{3,8}\b|\b(rgba?|hsla?)\(|:\s*(white|black|red|blue|green|gray|grey)\b/;
    expect(violations(styleFiles, cssOf, colorLiteral)).toEqual({});
  });

  it('不透明度（opacity の数値）はトークンから取り、直接書かない（0 と 1 は除く）', () => {
    expect(violations(styleFiles, cssOf, /opacity:\s*(0?\.\d+|0\.\d+)/)).toEqual({});
  });

  it('画面幅の切り替え（@media の幅）は書かない。列数は src/lib/gallery-grid.ts から生成する', () => {
    expect(violations(styleFiles, cssOf, /@media[^{]*\b(min|max)-width/)).toEqual({});
  });

  it('使っている var(--…) はすべて tokens.css か部品内のローカル変数で定義されている', () => {
    const local = /^--(tile|item|gallery)-/;
    const used = new Set(
      styleFiles.flatMap((file) => [...cssOf(file).matchAll(/var\((--[\w-]+)/g)].map((m) => m[1])),
    );
    const undefinedTokens = [...used].filter((name) => !tokens.has(name) && !local.test(name));
    expect(undefinedTokens).toEqual([]);
  });
});

describe('スケール（段階）を固定する', () => {
  it('文字サイズは 5 段階（12 / 14 / 16 / 20 / 24）で、12px を下回らない', () => {
    const sizes = tokensWithPrefix('--font-size-').map(([, v]) => px(v));
    expect(sizes).toEqual([12, 14, 16, 20, 24]);
    expect(Math.min(...sizes)).toBeGreaterThanOrEqual(12);
  });

  it('入力欄の文字（title）は 16px（iOS Safari の自動拡大を防ぐ）', () => {
    expect(px(tokens.get('--font-size-title'))).toBe(16);
  });

  it('余白は 2 / 4 / 6 / 8 / 10 / 12 / 16 / 20 / 24 / 40 の中から選ぶ', () => {
    const spaces = tokensWithPrefix('--space-').map(([name, v]) => {
      expect(name, '名前は値と一致させる').toBe(`--space-${px(v)}`);
      return px(v);
    });
    expect(spaces).toEqual([2, 4, 6, 8, 10, 12, 16, 20, 24, 40]);
  });

  it('操作部品の高さは 2 段階だけ（md 44px / sm 24px）', () => {
    expect(tokensWithPrefix('--control-height-').map(([name, v]) => [name, px(v)])).toEqual([
      ['--control-height-md', 44],
      ['--control-height-sm', 24],
    ]);
  });

  it('角の丸みは役割（card / control / pill）で選ぶ', () => {
    expect(tokensWithPrefix('--radius-').map(([name]) => name)).toEqual([
      '--radius-card',
      '--radius-control',
      '--radius-pill',
    ]);
  });
});

describe('DESIGN.md と実装が食い違わない', () => {
  const design = read('DESIGN.md');
  const rows = [...design.matchAll(/^\|\s*`(--[\w-]+)`\s*\|\s*`?([^|`]+?)`?\s*\|/gm)].map((m) => [m[1], m[2].trim()]);

  it('DESIGN.md の表にトークンが載っている', () => {
    expect(rows.length).toBeGreaterThan(20);
  });

  it('DESIGN.md の表の値は tokens.css と一致する', () => {
    const mismatches = rows.filter(([name, value]) => tokens.get(name) !== value);
    expect(mismatches).toEqual([]);
  });
});
