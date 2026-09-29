// PWA・ホーム画面のアイコンをビルド時に書き出す（/icons/<name>.png）。
import type { APIRoute, GetStaticPaths } from 'astro';
import { APP_ICONS, renderAppIcon, type AppIcon } from '../../lib/app-icons';

export const getStaticPaths = (() =>
  APP_ICONS.map((icon) => ({ params: { name: icon.name }, props: { icon } }))) satisfies GetStaticPaths;

export const GET: APIRoute<{ icon: AppIcon }> = async ({ props }) =>
  new Response(new Uint8Array(await renderAppIcon(props.icon)), { headers: { 'Content-Type': 'image/png' } });
