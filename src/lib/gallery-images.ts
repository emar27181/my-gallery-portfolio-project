// ビルド時に作品データへ表示用の情報（縮小画像・寸法・代表色）を付け足す。
// astro:assets と sharp を使うためサーバー（ビルド）側専用。

import path from 'node:path';
import type { ImageMetadata } from 'astro';
import { getImage } from 'astro:assets';
import sharp from 'sharp';
import { images, type ImageData } from '../data/image';
import { VIDEO_SPAN } from './gallery-grid';

const ASSET_DIR = 'src/assets/gallery';
const files = import.meta.glob<ImageMetadata>('../assets/gallery/*', { eager: true, import: 'default' });

/** 一覧用の縮小幅。1列の表示幅（約190〜390px）× 画素密度1〜3 を覆う */
const THUMB_WIDTHS = [320, 480, 640, 960, 1280];
/** モーダル用の最大幅 */
const FULL_WIDTH = 2048;
const FORMAT = 'webp';

/** YouTube サムネイル（mqdefault 320x180 / maxresdefault 1280x720、どちらも 16:9） */
const YOUTUBE_THUMB = { width: 1280, height: 720 };

export interface GalleryEntry extends ImageData {
  /** image.ts 上の位置（カスタム順） */
  index: number;
  width: number;
  height: number;
  /** 何列ぶんの幅を使うか */
  span: number;
  thumb: { src: string; srcset: string };
  /** モーダルで表示する大きい画像 */
  full: string;
  /** 読み込み前に敷く代表色（#rrggbb）。不明なら undefined */
  color?: string;
}

/**
 * 寸法と代表色を原本ファイルから読む。
 * ImageMetadata のプロパティを読むと Astro が原本を dist/ に残すため、ここでは使わない
 */
async function inspect(file: string): Promise<{ width: number; height: number; color: string }> {
  const image = sharp(path.join(process.cwd(), ASSET_DIR, file));
  const [{ width, height }, { dominant }] = await Promise.all([image.metadata(), image.stats()]);
  if (!width || !height) throw new Error(`${ASSET_DIR}/${file} の寸法を読めません`);
  const color = `#${[dominant.r, dominant.g, dominant.b].map((c) => c.toString(16).padStart(2, '0')).join('')}`;
  return { width, height, color };
}

async function prepareImage(image: ImageData, index: number): Promise<GalleryEntry> {
  const meta = files[`../assets/gallery/${image.src}`];
  if (!meta) throw new Error(`src/data/image.ts: ${ASSET_DIR}/${image.src} が見つかりません`);

  const { width, height, color } = await inspect(image.src);
  const widths = [...new Set(THUMB_WIDTHS.filter((w) => w < width).concat(Math.min(width, THUMB_WIDTHS.at(-1)!)))];
  const [thumb, full] = await Promise.all([
    getImage({ src: meta, widths, width: Math.min(width, 640), format: FORMAT }),
    getImage({ src: meta, width: Math.min(width, FULL_WIDTH), format: FORMAT, quality: 85 }),
  ]);

  return {
    ...image,
    index,
    width,
    height,
    span: 1,
    thumb: { src: thumb.src, srcset: thumb.srcSet.attribute },
    full: full.src,
    color,
  };
}

function prepareVideo(video: ImageData, index: number): GalleryEntry {
  const base = `https://img.youtube.com/vi/${video.videoId}`;
  return {
    ...video,
    index,
    ...YOUTUBE_THUMB,
    span: VIDEO_SPAN,
    thumb: { src: `${base}/maxresdefault.jpg`, srcset: `${base}/mqdefault.jpg 320w, ${base}/maxresdefault.jpg 1280w` },
    full: `${base}/maxresdefault.jpg`,
  };
}

export async function getGalleryEntries(): Promise<GalleryEntry[]> {
  return Promise.all(
    images.map((item, index) => (item.type === 'video' ? prepareVideo(item, index) : prepareImage(item, index))),
  );
}
