// ビルド時（Node）に src/styles/tokens.css の値を読む。
// マニフェストやアイコンの色など、CSS の外で色が要るときもトークンを唯一の定義元にするため。

import { readFileSync } from 'node:fs';
import path from 'node:path';

const TOKENS_FILE = path.join(process.cwd(), 'src/styles/tokens.css');

/** :root で定義したトークン（名前 → 値） */
export function readRootTokens(css = readFileSync(TOKENS_FILE, 'utf8')): Map<string, string> {
  const start = css.indexOf(':root {');
  const block = css.slice(start, css.indexOf('\n}', start));
  return new Map([...block.matchAll(/(--[\w-]+):\s*([^;]+);/g)].map((m) => [m[1], m[2].trim()]));
}

/** var(--x) をたどって実際の値にする（例: --color-bg → #f9fafb） */
export function resolveToken(name: string, tokens = readRootTokens()): string {
  const seen = new Set<string>();
  let value = tokens.get(name);
  while (value?.startsWith('var(')) {
    const ref = value.match(/^var\((--[\w-]+)\)$/)?.[1];
    if (!ref || seen.has(ref)) break;
    seen.add(ref);
    value = tokens.get(ref);
  }
  if (!value) throw new Error(`tokens.css に ${name} がありません`);
  return value;
}
