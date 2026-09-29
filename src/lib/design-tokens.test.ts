import { describe, expect, it } from 'vitest';
import { readRootTokens, resolveToken } from './design-tokens';

describe('resolveToken', () => {
  const tokens = readRootTokens(`:root {\n  --a: #111111;\n  --b: var(--a);\n  --c: var(--b);\n}`);

  it('var() をたどって値を返す', () => {
    expect(resolveToken('--c', tokens)).toBe('#111111');
  });

  it('無いトークンはエラー', () => {
    expect(() => resolveToken('--zzz', tokens)).toThrow();
  });

  it('実際の tokens.css からも読める', () => {
    expect(resolveToken('--color-surface')).toMatch(/^#[0-9a-f]{6}$/i);
  });
});
