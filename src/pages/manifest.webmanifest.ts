// PWA のマニフェスト。アイコンは src/lib/app-icons.ts、色は tokens.css から取る。
import type { APIRoute } from 'astro';
import { APP_ICONS, appIconBackground } from '../lib/app-icons';
import { SITE_NAME, SITE_SHORT_NAME } from '../lib/site';

export const GET: APIRoute = () =>
  new Response(
    JSON.stringify({
      name: SITE_NAME,
      short_name: SITE_SHORT_NAME,
      lang: 'ja',
      start_url: '/',
      scope: '/',
      display: 'standalone',
      background_color: appIconBackground(),
      theme_color: appIconBackground(),
      icons: APP_ICONS.filter((icon) => icon.name !== 'apple-touch-icon').map((icon) => ({
        src: `/icons/${icon.name}.png`,
        sizes: `${icon.size}x${icon.size}`,
        type: 'image/png',
        purpose: icon.purpose,
      })),
    }),
    { headers: { 'Content-Type': 'application/manifest+json' } },
  );
