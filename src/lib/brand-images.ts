// ロゴとローディングアニメーション。表示サイズに合わせてビルド時に縮小・WebP 化する。

import path from 'node:path';
import { getImage } from 'astro:assets';
import sharp from 'sharp';
import logoBlack from '../assets/brand/ema_sign_logo_black.png';
import logoWhite from '../assets/brand/ema_sign_logo_white.png';
import signAnimation from '../assets/brand/mov-sign-unscreen.gif';

/** ナビゲーションのロゴは 1.5rem（24px）表示。画素密度 4 まで覆う */
const NAV_LOGO_WIDTH = 96;
/** タブのアイコン */
const TAB_ICON_WIDTH = 64;

/** 寸法は原本から読む（ImageMetadata のプロパティを読むと原本が dist/ に残るため） */
async function animationMetadata() {
  const source = path.join(process.cwd(), 'src/assets/brand/mov-sign-unscreen.gif');
  const { width, pageHeight, height, delay, pages = 1 } = await sharp(source).metadata();
  const durationMs = delay?.reduce((total, frameDelay) => total + frameDelay, 0) ?? 0;
  return { width: width!, height: pageHeight ?? height!, durationMs, pages };
}

async function animationFinalFrame(page: number): Promise<string> {
  const source = path.join(process.cwd(), 'src/assets/brand/mov-sign-unscreen.gif');
  const buffer = await sharp(source, { page }).webp().toBuffer();
  return `data:image/webp;base64,${buffer.toString('base64')}`;
}

export async function getBrandImages() {
  const [navLight, navDark, tabIcon, loading, animation] = await Promise.all([
    getImage({ src: logoBlack, width: NAV_LOGO_WIDTH, format: 'webp' }),
    getImage({ src: logoWhite, width: NAV_LOGO_WIDTH, format: 'webp' }),
    getImage({ src: logoWhite, width: TAB_ICON_WIDTH, format: 'png' }),
    // アニメーションは Astro の sharp 設定（pages: -1）で全コマが保たれる
    getImage({ src: signAnimation, format: 'webp' }),
    animationMetadata(),
  ]);
  const finalFrame = await animationFinalFrame(animation.pages - 1);
  return {
    /** ライトテーマ用（黒）とダークテーマ用（白）のナビゲーションロゴ */
    navLogo: { light: navLight.src, dark: navDark.src },
    tabIcon: tabIcon.src,
    loading: { src: loading.src, finalFrame, width: animation.width, height: animation.height, durationMs: animation.durationMs },
  };
}
