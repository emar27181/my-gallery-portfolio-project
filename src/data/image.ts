export interface ImageData {
  src: string;
  alt: string;
  title: string;
  tags: string[];
  date: string;
  type: 'image' | 'video';
}

export const images: ImageData[] = [
  // Cat Illustrations
  {
    src: '/images/image_cat_ann1.jpg',
    alt: 'Cat Ann Illustration 1',
    title: 'Ann the Cat 1',
    tags: ['猫', 'イラスト'],
    date: '2024-12-01',
    type: 'image'
  },
  {
    src: '/images/image_cat_ann2.jpg',
    alt: 'Cat Ann Illustration 2',
    title: 'Ann the Cat 2',
    tags: ['猫', 'イラスト'],
    date: '2024-12-02',
    type: 'image'
  },
  {
    src: '/images/image_cat_ann3.jpg',
    alt: 'Cat Ann Illustration 3',
    title: 'Ann the Cat 3',
    tags: ['猫', 'イラスト'],
    date: '2024-12-03',
    type: 'image'
  },
  {
    src: '/images/image_cat_ann4.jpg',
    alt: 'Cat Ann Illustration 4',
    title: 'Ann the Cat 4',
    tags: ['猫', 'イラスト'],
    date: '2024-12-04',
    type: 'image'
  },
  {
    src: '/images/image_cat_mona1.jpg',
    alt: 'Cat Mona Illustration',
    title: 'Mona the Cat',
    tags: ['猫', 'イラスト'],
    date: '2024-11-30',
    type: 'image'
  },

  // Character Illustrations
  {
    src: '/images/image_girl.jpg',
    alt: 'Girl Character Illustration',
    title: 'Girl Character',
    tags: ['イラスト'],
    date: '2024-11-25',
    type: 'image'
  },
  {
    src: '/images/image_girl_kisapiyo.jpg',
    alt: 'Kisapiyo Girl Illustration',
    title: 'Kisapiyo Girl',
    tags: ['イラスト'],
    date: '2024-11-24',
    type: 'image'
  },
  {
    src: '/images/image_illust_dragon.jpg',
    alt: 'Dragon Illustration',
    title: 'Dragon Fantasy',
    tags: ['イラスト'],
    date: '2024-11-20',
    type: 'image'
  },
  {
    src: '/images/image_illust_girl2.jpg',
    alt: 'Girl Character 2',
    title: 'Girl Character 2',
    tags: ['イラスト'],
    date: '2024-11-19',
    type: 'image'
  },
  {
    src: '/images/image_illust_girl3.jpg',
    alt: 'Girl Character 3',
    title: 'Girl Character 3',
    tags: ['イラスト'],
    date: '2024-11-18',
    type: 'image'
  },
  {
    src: '/images/image_illust_girl4.jpg',
    alt: 'Girl Character 4',
    title: 'Girl Character 4',
    tags: ['イラスト'],
    date: '2024-11-17',
    type: 'image'
  },
  {
    src: '/images/image_illust_girl5.jpg',
    alt: 'Girl Character 5',
    title: 'Girl Character 5',
    tags: ['イラスト'],
    date: '2024-11-16',
    type: 'image'
  },
  {
    src: '/images/image_illust_girl_raden.jpg',
    alt: 'Raden Girl Illustration',
    title: 'Raden Girl',
    tags: ['イラスト'],
    date: '2024-11-15',
    type: 'image'
  },

  // Manga/Anime Fan Art
  {
    src: '/images/image_manga_deku.jpg',
    alt: 'Deku Fan Art',
    title: 'Deku from My Hero Academia',
    tags: ['マンガ'],
    date: '2024-11-10',
    type: 'image'
  },
  {
    src: '/images/image_manga_gojo.jpg',
    alt: 'Gojo Fan Art',
    title: 'Gojo from Jujutsu Kaisen',
    tags: ['マンガ'],
    date: '2024-11-09',
    type: 'image'
  },
  {
    src: '/images/image_manga_horks.jpg',
    alt: 'Horks Fan Art',
    title: 'Horks Character',
    tags: ['マンガ'],
    date: '2024-11-08',
    type: 'image'
  },
  {
    src: '/images/image_manga_itadori.jpg',
    alt: 'Itadori Fan Art',
    title: 'Itadori from Jujutsu Kaisen',
    tags: ['マンガ'],
    date: '2024-11-07',
    type: 'image'
  },
  {
    src: '/images/image_manga_nagi.jpg',
    alt: 'Nagi Fan Art',
    title: 'Nagi Character',
    tags: ['マンガ'],
    date: '2024-11-06',
    type: 'image'
  },
  {
    src: '/images/image_manga_shigaraki.jpg',
    alt: 'Shigaraki Fan Art',
    title: 'Shigaraki from My Hero Academia',
    tags: ['マンガ'],
    date: '2024-11-05',
    type: 'image'
  },
  {
    src: '/images/image_icon_astra.jpg',
    alt: 'Astra Icon',
    title: 'Astra Character Icon',
    tags: ['イラスト'],
    date: '2024-10-30',
    type: 'image'
  },
  {
    src: '/images/image_icon_omen.png',
    alt: 'Omen Icon',
    title: 'Omen Character Icon',
    tags: ['イラスト'],
    date: '2024-10-29',
    type: 'image'
  },

  // Hand Studies
  {
    src: '/images/image_hand1.jpg',
    alt: 'Hand Study 1',
    title: 'Hand Study Practice 1',
    tags: ['イラスト'],
    date: '2024-10-20',
    type: 'image'
  },
  {
    src: '/images/image_hand2.jpg',
    alt: 'Hand Study 2',
    title: 'Hand Study Practice 2',
    tags: ['イラスト'],
    date: '2024-10-19',
    type: 'image'
  },
  {
    src: '/images/image_hand3.jpg',
    alt: 'Hand Study 3',
    title: 'Hand Study Practice 3',
    tags: ['イラスト'],
    date: '2024-10-18',
    type: 'image'
  },
  {
    src: '/images/image_hand4.jpg',
    alt: 'Hand Study 4',
    title: 'Hand Study Practice 4',
    tags: ['イラスト'],
    date: '2024-10-17',
    type: 'image'
  },
  {
    src: '/images/image_hand5.jpg',
    alt: 'Hand Study 5',
    title: 'Hand Study Practice 5',
    tags: ['イラスト'],
    date: '2024-10-16',
    type: 'image'
  },
  {
    src: '/images/image_hand6.jpg',
    alt: 'Hand Study 6',
    title: 'Hand Study Practice 6',
    tags: ['イラスト'],
    date: '2024-10-15',
    type: 'image'
  },
  {
    src: '/images/image_hand7.jpg',
    alt: 'Hand Study 7',
    title: 'Hand Study Practice 7',
    tags: ['イラスト'],
    date: '2024-10-14',
    type: 'image'
  },

  // Photography
  {
    src: '/images/image_photo_cat_nora.jpg',
    alt: 'Cat Nora Photo',
    title: 'Nora the Cat',
    tags: ['猫', '写真'],
    date: '2024-10-10',
    type: 'image'
  },
  {
    src: '/images/image_photo_shoes.jpg',
    alt: 'Shoes Photography',
    title: 'Shoe Collection',
    tags: ['写真'],
    date: '2024-10-09',
    type: 'image'
  },
  {
    src: '/images/image_photo_sky1.jpg',
    alt: 'Sky Photo 1',
    title: 'Beautiful Sky 1',
    tags: ['空', '写真'],
    date: '2024-10-08',
    type: 'image'
  },
  {
    src: '/images/image_photo_sky2.jpg',
    alt: 'Sky Photo 2',
    title: 'Beautiful Sky 2',
    tags: ['空', '写真'],
    date: '2024-10-07',
    type: 'image'
  },
  {
    src: '/images/image_photo_sky3.jpg',
    alt: 'Sky Photo 3',
    title: 'Beautiful Sky 3',
    tags: ['空', '写真'],
    date: '2024-10-06',
    type: 'image'
  },
  {
    src: '/images/image_photo_sky4.jpg',
    alt: 'Sky Photo 4',
    title: 'Beautiful Sky 4',
    tags: ['空', '写真'],
    date: '2024-10-05',
    type: 'image'
  },
  {
    src: '/images/image_photo_sky5.jpg',
    alt: 'Sky Photo 5',
    title: 'Beautiful Sky 5',
    tags: ['空', '写真'],
    date: '2024-10-06',
    type: 'image'
  },
  {
    src: '/images/image_photo_sky6.jpg',
    alt: 'Sky Photo 6',
    title: 'Beautiful Sky 6',
    tags: ['空', '写真'],
    date: '2024-10-03',
    type: 'image'
  },
  {
    src: '/images/image_photo_sky7.jpg',
    alt: 'Sky Photo 7',
    title: 'Beautiful Sky 7',
    tags: ['空', '写真'],
    date: '2024-10-02',
    type: 'image'
  },

  // Logos and Generated Art
  {
    src: '/images/image_logo_shandy.jpg',
    alt: 'Shandy Logo',
    title: 'Shandy Brand Logo',
    tags: ['ジェネラティブアート', 'イラスト'],
    date: '2024-09-30',
    type: 'image'
  },
  {
    src: '/images/image_logo_ylab.jpg',
    alt: 'Y-Lab Logo',
    title: 'Y-Lab Brand Logo',
    tags: ['ジェネラティブアート', 'イラスト'],
    date: '2024-09-29',
    type: 'image'
  },
  {
    src: '/images/image_gen1.jpg',
    alt: 'Generated Art 1',
    title: 'AI Generated Art 1',
    tags: ['AI', 'ジェネラティブアート'],
    date: '2024-09-25',
    type: 'image'
  },
  {
    src: '/images/image_gen2.jpg',
    alt: 'Generated Art 2',
    title: 'AI Generated Art 2',
    tags: ['AI', 'ジェネラティブアート'],
    date: '2024-09-24',
    type: 'image'
  },

  // Research
];