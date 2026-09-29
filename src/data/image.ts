interface WorkBase {
  alt: string;
  title: string;
  tags: string[];
  /** YYYY-MM-DD */
  date: string;
}

export interface ImageWork extends WorkBase {
  type: 'image';
  /** src/assets/gallery/ 内のファイル名 */
  src: string;
}

export interface VideoWork extends WorkBase {
  type: 'video';
  /** サムネイルの URL */
  src: string;
  /** YouTube の動画 ID */
  videoId: string;
}

/** Web サイト。ギャラリー内の iframe でそのまま操作できる */
export interface SiteWork extends WorkBase {
  type: 'site';
  /** 埋め込む URL（https） */
  url: string;
}

export type ImageData = ImageWork | VideoWork | SiteWork;

export const images: ImageData[] = [
  // Cat Illustrations
  {
    src: 'image_cat_ann1.jpg',
    alt: 'Cat Ann Illustration 1',
    title: 'Ann the Cat 1',
    tags: ['猫', 'イラスト'],
    date: '2024-12-01',
    type: 'image'
  },
  {
    src: 'image_cat_ann2.jpg',
    alt: 'Cat Ann Illustration 2',
    title: 'Ann the Cat 2',
    tags: ['猫', 'イラスト'],
    date: '2024-12-02',
    type: 'image'
  },
  {
    src: 'image_cat_ann3.jpg',
    alt: 'Cat Ann Illustration 3',
    title: 'Ann the Cat 3',
    tags: ['猫', 'イラスト'],
    date: '2024-12-03',
    type: 'image'
  },
  {
    src: 'image_cat_ann6.jpg',
    alt: 'Cat Ann Illustration 6',
    title: 'Ann the Cat 6',
    tags: ['猫', 'イラスト'],
    date: '2024-12-06',
    type: 'image'
  },
  {
    src: 'image_cat_ann4.jpg',
    alt: 'Cat Ann Illustration 4',
    title: 'Ann the Cat 4',
    tags: ['猫', 'イラスト'],
    date: '2024-12-04',
    type: 'image'
  },
  {
    src: 'image_cat_ann5.jpg',
    alt: 'Cat Ann Illustration 5',
    title: 'Ann the Cat 5',
    tags: ['猫', 'イラスト', 'オリジナル'],
    date: '2024-12-05',
    type: 'image'
  },

  {
    src: 'image_cat_mona1.jpg',
    alt: 'Cat Mona Illustration',
    title: 'Mona the Cat',
    tags: ['猫', 'イラスト'],
    date: '2024-11-30',
    type: 'image'
  },

  // Character Illustrations
  {
    src: 'image_girl.jpg',
    alt: 'Girl Character Illustration',
    title: 'Girl Character',
    tags: ['イラスト', 'オリジナル'],
    date: '2024-11-25',
    type: 'image'
  },
  {
    src: 'image_girl_kisapiyo.jpg',
    alt: 'Kisapiyo Girl Illustration',
    title: 'Kisapiyo Girl',
    tags: ['イラスト'],
    date: '2024-11-24',
    type: 'image'
  },
  {
    src: 'image_illust_dragon.jpg',
    alt: 'Dragon Illustration',
    title: 'Dragon Fantasy',
    tags: ['イラスト', 'オリジナル'],
    date: '2024-11-20',
    type: 'image'
  },
  {
    src: 'image_illust_sea.jpg',
    alt: 'Sea Illustration',
    title: 'Sea Scene',
    tags: ['イラスト', 'オリジナル'],
    date: '2024-12-25',
    type: 'image'
  },
  {
    src: 'image_illust_splatoon.png',
    alt: 'Splatoon Illustration',
    title: 'Splatoon Character',
    tags: ['イラスト'],
    date: '2024-12-26',
    type: 'image'
  },
  {
    src: 'image_illust_girl2.jpg',
    alt: 'Girl Character 2',
    title: 'Girl Character 2',
    tags: ['イラスト'],
    date: '2024-11-19',
    type: 'image'
  },
  {
    src: 'image_illust_girl3.jpg',
    alt: 'Girl Character 3',
    title: 'Girl Character 3',
    tags: ['イラスト'],
    date: '2024-11-18',
    type: 'image'
  },
  {
    src: 'image_illust_girl4.jpg',
    alt: 'Girl Character 4',
    title: 'Girl Character 4',
    tags: ['イラスト'],
    date: '2024-11-17',
    type: 'image'
  },
  {
    src: 'image_illust_girl5.jpg',
    alt: 'Girl Character 5',
    title: 'Girl Character 5',
    tags: ['イラスト'],
    date: '2024-11-16',
    type: 'image'
  },
  {
    src: 'image_illust_girl6.jpg',
    alt: 'Girl Character 6',
    title: 'Girl Character 6',
    tags: ['イラスト'],
    date: '2024-11-15',
    type: 'image'
  },
  {
    src: 'image_illust_girl_miku.png',
    alt: 'Hatsune Miku Illustration',
    title: 'Hatsune Miku',
    tags: ['イラスト', 'マンガ'],
    date: '2024-11-14',
    type: 'image'
  },
  {
    src: 'image_illust_girl_raden.jpg',
    alt: 'Raden Girl Illustration',
    title: 'Raden Girl',
    tags: ['イラスト'],
    date: '2024-11-15',
    type: 'image'
  },

  // Manga/Anime Fan Art
  {
    src: 'image_manga_deku.jpg',
    alt: 'Deku Fan Art',
    title: 'Deku from My Hero Academia',
    tags: ['マンガ'],
    date: '2024-11-10',
    type: 'image'
  },
  {
    src: 'image_manga_gojo.jpg',
    alt: 'Gojo Fan Art',
    title: 'Gojo from Jujutsu Kaisen',
    tags: ['マンガ'],
    date: '2024-11-09',
    type: 'image'
  },
  {
    src: 'image_manga_horks.jpg',
    alt: 'Horks Fan Art',
    title: 'Horks Character',
    tags: ['マンガ'],
    date: '2024-11-08',
    type: 'image'
  },
  {
    src: 'image_manga_horks_2.jpg',
    alt: 'Horks Fan Art 2',
    title: 'Horks Character 2',
    tags: ['マンガ'],
    date: '2024-11-08',
    type: 'image'
  },
  {
    src: 'image_manga_illust_mizuhara.jpg',
    alt: 'Mizuhara Illustration',
    title: 'Mizuhara Character',
    tags: ['マンガ', 'イラスト'],
    date: '2024-12-27',
    type: 'image'
  },
  {
    src: 'image_manga_illust_ruka.jpg',
    alt: 'Ruka Illustration',
    title: 'Ruka Character',
    tags: ['マンガ', 'イラスト'],
    date: '2024-12-28',
    type: 'image'
  },
  {
    src: 'image_manga_illust_sterpratinum.jpg',
    alt: 'Star Platinum Illustration',
    title: 'Star Platinum Character',
    tags: ['マンガ', 'イラスト'],
    date: '2024-12-29',
    type: 'image'
  },
  {
    src: 'image_manga_illust_takagi.jpg',
    alt: 'Takagi Illustration',
    title: 'Takagi Character',
    tags: ['マンガ', 'イラスト'],
    date: '2024-12-30',
    type: 'image'
  },
  {
    src: 'image_manga_illust_tamaki.jpg',
    alt: 'Tamaki Illustration',
    title: 'Tamaki Character',
    tags: ['マンガ', 'イラスト'],
    date: '2024-12-31',
    type: 'image'
  },
  {
    src: 'image_manga_illust_zeno.jpg',
    alt: 'Zeno Illustration',
    title: 'Zeno Character',
    tags: ['マンガ', 'イラスト'],
    date: '2025-01-01',
    type: 'image'
  },
  {
    src: 'image_manga_itadori.jpg',
    alt: 'Itadori Fan Art',
    title: 'Itadori from Jujutsu Kaisen',
    tags: ['マンガ'],
    date: '2024-11-07',
    type: 'image'
  },
  {
    src: 'image_manga_nagi.jpg',
    alt: 'Nagi Fan Art',
    title: 'Nagi Character',
    tags: ['マンガ'],
    date: '2024-11-06',
    type: 'image'
  },
  {
    src: 'image_manga_shigaraki.jpg',
    alt: 'Shigaraki Fan Art',
    title: 'Shigaraki from My Hero Academia',
    tags: ['マンガ'],
    date: '2024-11-05',
    type: 'image'
  },
  {
    src: 'image_icon_astra.jpg',
    alt: 'Astra Icon',
    title: 'Astra Character Icon',
    tags: ['イラスト', 'VALORANT', 'オリジナル'],
    date: '2024-10-30',
    type: 'image'
  },
  {
    src: 'image_icon_omen.png',
    alt: 'Omen Icon',
    title: 'Omen Character Icon',
    tags: ['イラスト', 'VALORANT', '猫', 'オリジナル'],
    date: '2024-10-29',
    type: 'image'
  },

  // Hand Studies
  {
    src: 'image_hand1.jpg',
    alt: 'Hand Study 1',
    title: 'Hand Study Practice 1',
    tags: ['イラスト'],
    date: '2024-10-20',
    type: 'image'
  },
  {
    src: 'image_hand2.jpg',
    alt: 'Hand Study 2',
    title: 'Hand Study Practice 2',
    tags: ['イラスト'],
    date: '2024-10-19',
    type: 'image'
  },
  {
    src: 'image_hand3.jpg',
    alt: 'Hand Study 3',
    title: 'Hand Study Practice 3',
    tags: ['イラスト'],
    date: '2024-10-18',
    type: 'image'
  },
  {
    src: 'image_hand4.jpg',
    alt: 'Hand Study 4',
    title: 'Hand Study Practice 4',
    tags: ['イラスト'],
    date: '2024-10-17',
    type: 'image'
  },
  {
    src: 'image_hand5.jpg',
    alt: 'Hand Study 5',
    title: 'Hand Study Practice 5',
    tags: ['イラスト'],
    date: '2024-10-16',
    type: 'image'
  },
  {
    src: 'image_hand6.jpg',
    alt: 'Hand Study 6',
    title: 'Hand Study Practice 6',
    tags: ['イラスト'],
    date: '2024-10-15',
    type: 'image'
  },
  {
    src: 'image_hand7.jpg',
    alt: 'Hand Study 7',
    title: 'Hand Study Practice 7',
    tags: ['イラスト'],
    date: '2024-10-14',
    type: 'image'
  },

  // Photography
  {
    src: 'image_photo_cat_nora.jpg',
    alt: 'Cat Nora Photo',
    title: 'Nora the Cat',
    tags: ['猫', '写真'],
    date: '2024-10-10',
    type: 'image'
  },
  {
    src: 'image_photo_misc4.jpg',
    alt: 'Misc Photo 4',
    title: 'Misc Photo 4',
    tags: ['写真'],
    date: '2025-01-02',
    type: 'image'
  },
  {
    src: 'image_photo_misc6.jpg',
    alt: 'Misc Photo 6',
    title: 'Misc Photo 6',
    tags: ['写真'],
    date: '2025-01-03',
    type: 'image'
  },
  {
    src: 'image_photo_shoes.jpg',
    alt: 'Shoes Photography',
    title: 'Shoe Collection',
    tags: ['写真'],
    date: '2024-10-09',
    type: 'image'
  },
  {
    src: 'image_photo_sky1.jpg',
    alt: 'Sky Photo 1',
    title: 'Beautiful Sky 1',
    tags: ['空', '写真'],
    date: '2024-10-08',
    type: 'image'
  },
  {
    src: 'image_photo_sky2.jpg',
    alt: 'Sky Photo 2',
    title: 'Beautiful Sky 2',
    tags: ['空', '写真'],
    date: '2024-10-07',
    type: 'image'
  },
  {
    src: 'image_photo_sky3.jpg',
    alt: 'Sky Photo 3',
    title: 'Beautiful Sky 3',
    tags: ['空', '写真'],
    date: '2024-10-06',
    type: 'image'
  },
  {
    src: 'image_photo_sky4.jpg',
    alt: 'Sky Photo 4',
    title: 'Beautiful Sky 4',
    tags: ['空', '写真'],
    date: '2024-10-05',
    type: 'image'
  },
  {
    src: 'image_photo_sky5.jpg',
    alt: 'Sky Photo 5',
    title: 'Beautiful Sky 5',
    tags: ['空', '写真'],
    date: '2024-10-06',
    type: 'image'
  },
  {
    src: 'image_photo_sky6.jpg',
    alt: 'Sky Photo 6',
    title: 'Beautiful Sky 6',
    tags: ['空', '写真'],
    date: '2024-10-03',
    type: 'image'
  },
  {
    src: 'image_photo_sky7.jpg',
    alt: 'Sky Photo 7',
    title: 'Beautiful Sky 7',
    tags: ['空', '写真'],
    date: '2024-10-02',
    type: 'image'
  },

  // Logos and Generated Art
  {
    src: 'image_logo_ylab.jpg',
    alt: 'Y-Lab Logo',
    title: 'Y-Lab Brand Logo',
    tags: ['ロゴ', 'イラスト', 'オリジナル'],
    date: '2024-09-29',
    type: 'image'
  },
  {
    src: 'image_logo_shandy.jpg',
    alt: 'Shandy Logo',
    title: 'Shandy Brand Logo',
    tags: ['ロゴ', 'イラスト', 'オリジナル'],
    date: '2024-09-30',
    type: 'image'
  },
  {
    src: 'image_logo_shandy_t-shirt_head.jpg',
    alt: 'Shandy T-shirt Design Head',
    title: 'Shandy T-shirt Head Design',
    tags: ['ロゴ', 'イラスト', 'オリジナル'],
    date: '2024-09-28',
    type: 'image'
  },
  {
    src: 'image_logo_shandy_t-shirt_tail.jpg',
    alt: 'Shandy T-shirt Design Tail',
    title: 'Shandy T-shirt Tail Design',
    tags: ['ロゴ', 'イラスト', 'オリジナル'],
    date: '2024-09-27',
    type: 'image'
  },
  {
    src: 'image_gen1.jpg',
    alt: 'Generated Art 1',
    title: 'AI Generated Art 1',
    tags: ['ジェネラティブアート'],
    date: '2024-09-25',
    type: 'image'
  },
  {
    src: 'image_gen2.jpg',
    alt: 'Generated Art 2',
    title: 'AI Generated Art 2',
    tags: ['ジェネラティブアート'],
    date: '2024-09-24',
    type: 'image'
  },

  // Web Sites（出典: https://emar27181-portfolio.netlify.app/ の制作物。日付は各リポジトリの最終更新日）
  {
    url: 'https://emar27181-portfolio.netlify.app/',
    alt: '経歴などをまとめたポートフォリオサイトです．',
    title: 'ポートフォリオ',
    tags: ['サイト', 'オリジナル'],
    date: '2026-09-16',
    type: 'site'
  },
  {
    url: 'https://flex-railway-map.netlify.app/',
    alt: '情報が多すぎる路線図を必要な路線だけに絞って見やすく表示できるサービスです．',
    title: 'Flex Railway Map',
    tags: ['サイト', 'オリジナル'],
    date: '2026-09-29',
    type: 'site'
  },
  {
    url: 'https://memorio3.netlify.app/',
    alt: '日々の出来事を記録し、振り返るための個人用ログです．',
    title: 'Memorio',
    tags: ['サイト', 'オリジナル'],
    date: '2026-09-29',
    type: 'site'
  },
  {
    url: 'https://music-atlas.netlify.app/',
    alt: '聴いている音楽の統計をまとめたサイトです．カラオケ向きの曲の分析や、聴いている曲の分布をプロットで確認できます．',
    title: 'Music Atlas',
    tags: ['サイト', 'オリジナル'],
    date: '2026-09-28',
    type: 'site'
  },
  {
    url: 'https://waste-tax.netlify.app/onboarding',
    alt: '研修で作成したサイトを普段から利用できるように模倣・再構成したサイトです．',
    title: 'TAKUS',
    tags: ['サイト', 'オリジナル'],
    date: '2026-09-28',
    type: 'site'
  },
  {
    url: 'https://throw-frow-darts.netlify.app/',
    alt: '自宅でのダーツの記録を、音とデザインでゲームのように楽しく記録できるアプリです．',
    title: 'ThrowFlowDarts',
    tags: ['サイト', 'オリジナル'],
    date: '2026-08-11',
    type: 'site'
  },
  {
    url: 'https://way-point-map.netlify.app/',
    alt: 'ゴルフ場をマップ上で1球あたりの単価などで比較できるサイトです．フィルタリングやヒートマップにも対応しています．',
    title: 'Way Point Map',
    tags: ['サイト', 'オリジナル'],
    date: '2026-07-20',
    type: 'site'
  },
  {
    url: 'https://window-brain.netlify.app/',
    alt: '使っていないモニターに時計・BGM・天気などのウィジェットを自由に配置できるサイトです．',
    title: 'Window Brain',
    tags: ['サイト', 'オリジナル'],
    date: '2026-07-05',
    type: 'site'
  },
  {
    url: 'https://nodoame27181.netlify.app/',
    alt: 'ゲームアカウントに関する情報やプレイ実績をまとめたポートフォリオサイトです．',
    title: 'ゲーム用ポートフォリオ',
    tags: ['サイト', 'オリジナル'],
    date: '2026-07-05',
    type: 'site'
  },
  {
    url: 'https://valorant-point-viewer.netlify.app/',
    alt: 'VALORANT の各マップの定点動画をマップ上で確認できるサイトです．',
    title: 'VALORANT Point Viewer',
    tags: ['サイト', 'VALORANT', 'オリジナル'],
    date: '2026-05-17',
    type: 'site'
  },
  {
    url: 'https://card-pocket.netlify.app/',
    alt: '持ち運びの面倒な会員証をデジタルで管理するサービスのデモサイトです．',
    title: 'Card Pocket（デモ）',
    tags: ['サイト', 'オリジナル'],
    date: '2026-03-19',
    type: 'site'
  },
  {
    url: 'https://color-recommend.netlify.app/',
    alt: '研究内容であるイラスト制作における色の推薦のデモです．',
    title: '色相・トーン推薦アプリ',
    tags: ['サイト', 'オリジナル'],
    date: '2026-02-07',
    type: 'site'
  },
  {
    url: 'https://mahjong-yaku-visualizer.netlify.app/',
    alt: '麻雀の役を視覚的に確認できるサイトです．',
    title: '麻雀役ビジュアライザー',
    tags: ['サイト', 'オリジナル'],
    date: '2026-01-16',
    type: 'site'
  },

  // YouTube Videos
  {
    src: 'https://img.youtube.com/vi/oos2PYWiRGM/maxresdefault.jpg',
    alt: 'YouTube Video 1',
    title: 'YouTube Video 1',
    tags: ['動画', 'VALORANT'],
    date: '2024-12-08',
    type: 'video',
    videoId: 'oos2PYWiRGM'
  },
  {
    src: 'https://img.youtube.com/vi/ERb40ovB060/maxresdefault.jpg',
    alt: 'YouTube Video 2',
    title: 'YouTube Video 2',
    tags: ['動画', 'VALORANT'],
    date: '2024-12-07',
    type: 'video',
    videoId: 'ERb40ovB060'
  },
  {
    src: 'https://img.youtube.com/vi/KTwFA1jQgFY/maxresdefault.jpg',
    alt: 'YouTube Video 3',
    title: 'YouTube Video 3',
    tags: ['動画', 'VALORANT'],
    date: '2024-12-06',
    type: 'video',
    videoId: 'KTwFA1jQgFY'
  },
  {
    src: 'https://img.youtube.com/vi/1-tDSvjpxn4/maxresdefault.jpg',
    alt: 'YouTube Video 4',
    title: 'YouTube Video 4',
    tags: ['動画', '猫', 'イラスト', 'オリジナル'],
    date: '2024-12-05',
    type: 'video',
    videoId: '1-tDSvjpxn4'
  },
  {
    src: 'https://img.youtube.com/vi/pqynYQGtxUM/maxresdefault.jpg',
    alt: 'YouTube Video 5',
    title: 'YouTube Video 5',
    tags: ['動画', 'VALORANT'],
    date: '2024-12-05',
    type: 'video',
    videoId: 'pqynYQGtxUM'
  },
  {
    src: 'https://img.youtube.com/vi/j3tKqZ3v0A0/maxresdefault.jpg',
    alt: 'YouTube Video 6',
    title: 'YouTube Video 6',
    tags: ['動画', 'VALORANT'],
    date: '2024-12-05',
    type: 'video',
    videoId: 'j3tKqZ3v0A0'
  },
  {
    src: 'https://img.youtube.com/vi/MPVyQnYQ6wo/maxresdefault.jpg',
    alt: 'YouTube Video 7',
    title: 'YouTube Video 7',
    tags: ['動画', 'VALORANT'],
    date: '2024-12-05',
    type: 'video',
    videoId: 'MPVyQnYQ6wo'
  },
  {
    src: 'https://img.youtube.com/vi/xGOPNPI7R18/maxresdefault.jpg',
    alt: 'YouTube Video 8',
    title: 'YouTube Video 8',
    tags: ['動画', 'スノボ'],
    date: '2025-01-08',
    type: 'video',
    videoId: 'xGOPNPI7R18'
  },
  {
    src: 'https://img.youtube.com/vi/geEyOgN0SxU/maxresdefault.jpg',
    alt: 'YouTube Video 9',
    title: 'YouTube Video 9',
    tags: ['動画', 'スノボ'],
    date: '2025-01-09',
    type: 'video',
    videoId: 'geEyOgN0SxU'
  },
  {
    src: 'https://img.youtube.com/vi/V_hx-ft8w88/maxresdefault.jpg',
    alt: 'YouTube Video 10',
    title: 'YouTube Video 10',
    tags: ['動画', 'VALORANT'],
    date: '2025-01-10',
    type: 'video',
    videoId: 'V_hx-ft8w88'
  },
  {
    src: 'https://img.youtube.com/vi/5IET-4mL9pA/maxresdefault.jpg',
    alt: 'YouTube Video 11',
    title: 'YouTube Video 11',
    tags: ['動画', 'VALORANT'],
    date: '2025-01-11',
    type: 'video',
    videoId: '5IET-4mL9pA'
  },
];