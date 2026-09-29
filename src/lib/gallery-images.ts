// ビルド時に作品データへ表示用の情報（縮小画像・寸法・代表色）を付け足す。
// astro:assets と sharp を使うためサーバー（ビルド）側専用。

import path from 'node:path';
import type { ImageMetadata } from 'astro';
import { getImage } from 'astro:assets';
import sharp from 'sharp';
import { images, type ImageData, type ImageWork, type SiteWork, type VideoWork } from '../data/image';
import { SITE_FRAME, SITE_SPAN, VIDEO_SPAN } from './gallery-grid';

/** 作品の画像（image.ts の src）と、Web サイトの画面写真（image.ts の poster）の置き場所 */
const GALLERY_DIR = 'src/assets/gallery';
const SITES_DIR = 'src/assets/sites';
const assets = {
  ...import.meta.glob<ImageMetadata>('../assets/gallery/*', { eager: true, import: 'default' }),
  ...import.meta.glob<ImageMetadata>('../assets/sites/*', { eager: true, import: 'default' }),
};

/** 一覧用の縮小幅。1列の表示幅（約190〜390px）× 画素密度1〜3 を覆う */
const THUMB_WIDTHS = [320, 480, 640, 960, 1280];
/** モーダル用の最大幅 */
const FULL_WIDTH = 2048;
const FORMAT = 'webp';

/** YouTube サムネイル（mqdefault 320x180 / maxresdefault 1280x720、どちらも 16:9） */
const YOUTUBE_THUMB = { width: 1280, height: 720 };

/** 作品データに、表示に必要な寸法・縮小画像などを足したもの */
export type GalleryEntry = ImageData & {
  /** image.ts 上の位置（カスタム順） */
  index: number;
  width: number;
  height: number;
  /** 何列ぶんの幅を使うか */
  span: number;
  /** 一覧用の画像（Web サイトは読み込み中に見せる画面写真） */
  thumb?: { src: string; srcset: string };
  /** モーダル・全画面表示で見せる大きい画像 */
  full?: string;
  /** 読み込み前に敷く代表色（#rrggbb）。不明なら undefined */
  color?: string;
};

/**
 * 寸法と代表色を原本ファイルから読む。
 * ImageMetadata のプロパティを読むと Astro が原本を dist/ に残すため、ここでは使わない
 */
async function inspect(dir: string, file: string): Promise<{ width: number; height: number; color: string }> {
  const image = sharp(path.join(process.cwd(), dir, file));
  const [{ width, height }, { dominant }] = await Promise.all([image.metadata(), image.stats()]);
  if (!width || !height) throw new Error(`${dir}/${file} の寸法を読めません`);
  const color = `#${[dominant.r, dominant.g, dominant.b].map((c) => c.toString(16).padStart(2, '0')).join('')}`;
  return { width, height, color };
}

/** 原本から一覧用（srcset）と大きい画像（WebP）を作り、寸法と代表色を添える */
async function optimize(dir: string, file: string) {
  const meta = assets[`../${path.relative('src', dir)}/${file}`];
  if (!meta) throw new Error(`src/data/image.ts: ${dir}/${file} が見つかりません`);

  const { width, height, color } = await inspect(dir, file);
  const widths = [...new Set(THUMB_WIDTHS.filter((w) => w < width).concat(Math.min(width, THUMB_WIDTHS.at(-1)!)))];
  const [thumb, full] = await Promise.all([
    getImage({ src: meta, widths, width: Math.min(width, 640), format: FORMAT }),
    getImage({ src: meta, width: Math.min(width, FULL_WIDTH), format: FORMAT, quality: 85 }),
  ]);
  return { width, height, color, thumb: { src: thumb.src, srcset: thumb.srcSet.attribute }, full: full.src };
}

async function prepareImage(image: ImageWork, index: number): Promise<GalleryEntry> {
  return { ...image, index, span: 1, ...(await optimize(GALLERY_DIR, image.src)) };
}

/** 枠は SITE_FRAME で固定し、画面写真は枠いっぱいに敷く（寸法は枠のものを使う） */
async function prepareSite(site: SiteWork, index: number): Promise<GalleryEntry> {
  const entry = { ...site, index, ...SITE_FRAME, span: SITE_SPAN };
  if (!site.poster) return entry;
  const { thumb, full, color } = await optimize(SITES_DIR, site.poster);
  return { ...entry, thumb, full, color };
}

function prepareVideo(video: VideoWork, index: number): GalleryEntry {
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

function prepare(item: ImageData, index: number): GalleryEntry | Promise<GalleryEntry> {
  switch (item.type) {
    case 'image':
      return prepareImage(item, index);
    case 'video':
      return prepareVideo(item, index);
    case 'site':
      return prepareSite(item, index);
  }
}

export async function getGalleryEntries(): Promise<GalleryEntry[]> {
  return Promise.all(images.map(prepare));
}
