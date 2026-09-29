import sharp from 'sharp';
import { describe, expect, it } from 'vitest';
import { APP_ICONS, renderAppIcon } from './app-icons';

describe('PWA アイコン', () => {
  it('必要な大きさ（192 / 512 と maskable 512）がそろっている', () => {
    const sizes = APP_ICONS.map((icon) => `${icon.size}:${icon.purpose}`);
    expect(sizes).toEqual(expect.arrayContaining(['192:any', '512:any', '512:maskable']));
  });

  it.each(APP_ICONS)('$name は $size px の正方形の PNG で、四隅は地の色（透明ではない）', async (icon) => {
    const png = await renderAppIcon(icon);
    const { width, height, format } = await sharp(png).metadata();
    expect([format, width, height]).toEqual(['png', icon.size, icon.size]);
    const { data, info } = await sharp(png).raw().toBuffer({ resolveWithObject: true });
    const alphaAt = (x: number, y: number) => data[(y * info.width + x) * info.channels + 3];
    expect(alphaAt(0, 0)).toBe(255);
    expect(alphaAt(icon.size - 1, icon.size - 1)).toBe(255);
  });

  it('maskable は中身を中央に寄せる（端から 10% は地の色だけ）', async () => {
    const icon = APP_ICONS.find((i) => i.purpose === 'maskable')!;
    const { data, info } = await sharp(await renderAppIcon(icon)).raw().toBuffer({ resolveWithObject: true });
    const edge = Math.floor(icon.size * 0.1);
    const corner = data.subarray(0, info.channels).join();
    for (let x = 0; x < icon.size; x += 8) {
      for (const y of [0, edge - 1, icon.size - edge, icon.size - 1]) {
        const i = (y * info.width + x) * info.channels;
        expect(data.subarray(i, i + info.channels).join()).toBe(corner);
      }
    }
  });
});
