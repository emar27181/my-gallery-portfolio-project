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
    tags: ['illust', 'cat', 'character'],
    date: '2024-12-01',
    type: 'image'
  },
  {
    src: '/images/image_cat_ann2.jpg',
    alt: 'Cat Ann Illustration 2',
    title: 'Ann the Cat 2',
    tags: ['illust', 'cat', 'character'],
    date: '2024-12-02',
    type: 'image'
  },
  {
    src: '/images/image_cat_ann3.jpg',
    alt: 'Cat Ann Illustration 3',
    title: 'Ann the Cat 3',
    tags: ['illust', 'cat', 'character'],
    date: '2024-12-03',
    type: 'image'
  },
  {
    src: '/images/image_cat_ann4.jpg',
    alt: 'Cat Ann Illustration 4',
    title: 'Ann the Cat 4',
    tags: ['illust', 'cat', 'character'],
    date: '2024-12-04',
    type: 'image'
  },
  {
    src: '/images/image_cat_mona1.jpg',
    alt: 'Cat Mona Illustration',
    title: 'Mona the Cat',
    tags: ['illust', 'cat', 'character'],
    date: '2024-11-30',
    type: 'image'
  },
  
  // Character Illustrations
  {
    src: '/images/image_girl.jpg',
    alt: 'Girl Character Illustration',
    title: 'Girl Character',
    tags: ['illust', 'character', 'girl'],
    date: '2024-11-25',
    type: 'image'
  },
  {
    src: '/images/image_girl_kisapiyo.jpg',
    alt: 'Kisapiyo Girl Illustration',
    title: 'Kisapiyo Girl',
    tags: ['illust', 'character', 'girl'],
    date: '2024-11-24',
    type: 'image'
  },
  {
    src: '/images/image_illust_dragon.jpg',
    alt: 'Dragon Illustration',
    title: 'Dragon Fantasy',
    tags: ['illust', 'fantasy', 'dragon'],
    date: '2024-11-20',
    type: 'image'
  },
  {
    src: '/images/image_illust_girl2.jpg',
    alt: 'Girl Character 2',
    title: 'Girl Character 2',
    tags: ['illust', 'character', 'girl'],
    date: '2024-11-19',
    type: 'image'
  },
  {
    src: '/images/image_illust_girl3.jpg',
    alt: 'Girl Character 3',
    title: 'Girl Character 3',
    tags: ['illust', 'character', 'girl'],
    date: '2024-11-18',
    type: 'image'
  },
  {
    src: '/images/image_illust_girl4.jpg',
    alt: 'Girl Character 4',
    title: 'Girl Character 4',
    tags: ['illust', 'character', 'girl'],
    date: '2024-11-17',
    type: 'image'
  },
  {
    src: '/images/image_illust_girl5.jpg',
    alt: 'Girl Character 5',
    title: 'Girl Character 5',
    tags: ['illust', 'character', 'girl'],
    date: '2024-11-16',
    type: 'image'
  },
  {
    src: '/images/image_illust_girl_raden.jpg',
    alt: 'Raden Girl Illustration',
    title: 'Raden Girl',
    tags: ['illust', 'character', 'girl'],
    date: '2024-11-15',
    type: 'image'
  },
  
  // Manga/Anime Fan Art
  {
    src: '/images/image_manga_deku.jpg',
    alt: 'Deku Fan Art',
    title: 'Deku from My Hero Academia',
    tags: ['manga', 'fanart', 'deku', 'mha'],
    date: '2024-11-10',
    type: 'image'
  },
  {
    src: '/images/image_manga_gojo.jpg',
    alt: 'Gojo Fan Art',
    title: 'Gojo from Jujutsu Kaisen',
    tags: ['manga', 'fanart', 'gojo', 'jjk'],
    date: '2024-11-09',
    type: 'image'
  },
  {
    src: '/images/image_manga_horks.jpg',
    alt: 'Horks Fan Art',
    title: 'Horks Character',
    tags: ['manga', 'fanart'],
    date: '2024-11-08',
    type: 'image'
  },
  {
    src: '/images/image_manga_itadori.jpg',
    alt: 'Itadori Fan Art',
    title: 'Itadori from Jujutsu Kaisen',
    tags: ['manga', 'fanart', 'itadori', 'jjk'],
    date: '2024-11-07',
    type: 'image'
  },
  {
    src: '/images/image_manga_nagi.jpg',
    alt: 'Nagi Fan Art',
    title: 'Nagi Character',
    tags: ['manga', 'fanart', 'nagi'],
    date: '2024-11-06',
    type: 'image'
  },
  {
    src: '/images/image_manga_shigaraki.jpg',
    alt: 'Shigaraki Fan Art',
    title: 'Shigaraki from My Hero Academia',
    tags: ['manga', 'fanart', 'shigaraki', 'mha'],
    date: '2024-11-05',
    type: 'image'
  },
  
  // Game/Gaming Related
  {
    src: '/images/image_valo_omen1.jpg',
    alt: 'Omen Valorant Art',
    title: 'Omen from Valorant',
    tags: ['game', 'valorant', 'omen'],
    date: '2024-11-01',
    type: 'image'
  },
  {
    src: '/images/image_icon_astra.jpg',
    alt: 'Astra Icon',
    title: 'Astra Character Icon',
    tags: ['game', 'valorant', 'icon'],
    date: '2024-10-30',
    type: 'image'
  },
  {
    src: '/images/image_icon_omen.png',
    alt: 'Omen Icon',
    title: 'Omen Character Icon',
    tags: ['game', 'valorant', 'icon'],
    date: '2024-10-29',
    type: 'image'
  },
  
  // Hand Studies
  {
    src: '/images/image_hand1.jpg',
    alt: 'Hand Study 1',
    title: 'Hand Study Practice 1',
    tags: ['study', 'anatomy', 'hand'],
    date: '2024-10-20',
    type: 'image'
  },
  {
    src: '/images/image_hand2.jpg',
    alt: 'Hand Study 2',
    title: 'Hand Study Practice 2',
    tags: ['study', 'anatomy', 'hand'],
    date: '2024-10-19',
    type: 'image'
  },
  {
    src: '/images/image_hand3.jpg',
    alt: 'Hand Study 3',
    title: 'Hand Study Practice 3',
    tags: ['study', 'anatomy', 'hand'],
    date: '2024-10-18',
    type: 'image'
  },
  {
    src: '/images/image_hand4.jpg',
    alt: 'Hand Study 4',
    title: 'Hand Study Practice 4',
    tags: ['study', 'anatomy', 'hand'],
    date: '2024-10-17',
    type: 'image'
  },
  {
    src: '/images/image_hand5.jpg',
    alt: 'Hand Study 5',
    title: 'Hand Study Practice 5',
    tags: ['study', 'anatomy', 'hand'],
    date: '2024-10-16',
    type: 'image'
  },
  {
    src: '/images/image_hand6.jpg',
    alt: 'Hand Study 6',
    title: 'Hand Study Practice 6',
    tags: ['study', 'anatomy', 'hand'],
    date: '2024-10-15',
    type: 'image'
  },
  {
    src: '/images/image_hand7.jpg',
    alt: 'Hand Study 7',
    title: 'Hand Study Practice 7',
    tags: ['study', 'anatomy', 'hand'],
    date: '2024-10-14',
    type: 'image'
  },
  
  // Photography
  {
    src: '/images/image_photo_cat_nora.jpg',
    alt: 'Cat Nora Photo',
    title: 'Nora the Cat',
    tags: ['photo', 'cat', 'pet'],
    date: '2024-10-10',
    type: 'image'
  },
  {
    src: '/images/image_photo_shoes.jpg',
    alt: 'Shoes Photography',
    title: 'Shoe Collection',
    tags: ['photo', 'fashion', 'shoes'],
    date: '2024-10-09',
    type: 'image'
  },
  {
    src: '/images/image_photo_sky1.jpg',
    alt: 'Sky Photo 1',
    title: 'Beautiful Sky 1',
    tags: ['photo', 'nature', 'sky'],
    date: '2024-10-08',
    type: 'image'
  },
  {
    src: '/images/image_photo_sky2.jpg',
    alt: 'Sky Photo 2',
    title: 'Beautiful Sky 2',
    tags: ['photo', 'nature', 'sky'],
    date: '2024-10-07',
    type: 'image'
  },
  {
    src: '/images/image_photo_sky3.jpg',
    alt: 'Sky Photo 3',
    title: 'Beautiful Sky 3',
    tags: ['photo', 'nature', 'sky'],
    date: '2024-10-06',
    type: 'image'
  },
  {
    src: '/images/image_photo_sky4.jpg',
    alt: 'Sky Photo 4',
    title: 'Beautiful Sky 4',
    tags: ['photo', 'nature', 'sky'],
    date: '2024-10-05',
    type: 'image'
  },
  {
    src: '/images/image_photo_sky5.jpg',
    alt: 'Sky Photo 5',
    title: 'Beautiful Sky 5',
    tags: ['photo', 'nature', 'sky'],
    date: '2024-10-04',
    type: 'image'
  },
  {
    src: '/images/image_photo_sky6.jpg',
    alt: 'Sky Photo 6',
    title: 'Beautiful Sky 6',
    tags: ['photo', 'nature', 'sky'],
    date: '2024-10-03',
    type: 'image'
  },
  {
    src: '/images/image_photo_sky7.jpg',
    alt: 'Sky Photo 7',
    title: 'Beautiful Sky 7',
    tags: ['photo', 'nature', 'sky'],
    date: '2024-10-02',
    type: 'image'
  },
  
  // Logos and Generated Art
  {
    src: '/images/image_logo_shandy.jpg',
    alt: 'Shandy Logo',
    title: 'Shandy Brand Logo',
    tags: ['logo', 'design', 'brand'],
    date: '2024-09-30',
    type: 'image'
  },
  {
    src: '/images/image_logo_ylab.jpg',
    alt: 'Y-Lab Logo',
    title: 'Y-Lab Brand Logo',
    tags: ['logo', 'design', 'brand'],
    date: '2024-09-29',
    type: 'image'
  },
  {
    src: '/images/image_gen1.jpg',
    alt: 'Generated Art 1',
    title: 'AI Generated Art 1',
    tags: ['ai', 'generated', 'experimental'],
    date: '2024-09-25',
    type: 'image'
  },
  {
    src: '/images/image_gen2.jpg',
    alt: 'Generated Art 2',
    title: 'AI Generated Art 2',
    tags: ['ai', 'generated', 'experimental'],
    date: '2024-09-24',
    type: 'image'
  },
  
  // Research
  {
    src: '/images/image_research_palette.jpg',
    alt: 'Color Palette Research',
    title: 'Illustration Color Palette Study',
    tags: ['research', 'color', 'study'],
    date: '2024-10-01',
    type: 'image'
  }
];