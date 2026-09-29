// PWA・ホーム画面のアイコン。ローディング画面のサインのアニメーションの最後のコマ（描き終わった形）から、
// ビルド時に正方形の PNG を作る。色は tokens.css から取る。

import path from 'node:path';
import sharp from 'sharp';
import { resolveToken } from './design-tokens';

const SIGN_ANIMATION = path.join(process.cwd(), 'src/assets/brand/mov-sign-unscreen.gif');

export interface AppIcon {
  /** 出力するファイル名（/icons/<name>.png） */
  name: string;
  size: number;
  /** 余白の割合（片側）。maskable は端が切り取られるため、中身を中央 80% の円に収める */
  padding: number;
  purpose: 'any' | 'maskable';
}

export const APP_ICONS: readonly AppIcon[] = [
  { name: 'icon-192', size: 192, padding: 0.12, purpose: 'any' },
  { name: 'icon-512', size: 512, padding: 0.12, purpose: 'any' },
  { name: 'maskable-512', size: 512, padding: 0.22, purpose: 'maskable' },
  { name: 'apple-touch-icon', size: 180, padding: 0.12, purpose: 'any' },
];

/** アイコンの地の色（ライトの面の色） */
export const appIconBackground = () => resolveToken('--color-surface');

export async function renderAppIcon({ size, padding }: AppIcon): Promise<Buffer> {
  const gif = sharp(SIGN_ANIMATION, { animated: true });
  const { pages = 1 } = await gif.metadata();
  const inner = Math.round(size * (1 - padding * 2));
  const sign = await sharp(SIGN_ANIMATION, { page: pages - 1 })
    .trim()
    .resize(inner, inner, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();
  return sharp({ create: { width: size, height: size, channels: 4, background: appIconBackground() } })
    .composite([{ input: sign, gravity: 'center' }])
    .png()
    .toBuffer();
}
