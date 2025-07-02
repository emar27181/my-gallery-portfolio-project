export interface ImageData {
  src: string;
  alt: string;
  title: string;
  tags: string[];
  date: string;
  type: 'image' | 'video';
}

export const images: ImageData[] = [
  {
    src: '/images/image_cat_ann1.jpg',
    alt: 'Cat Illustration 1',
    title: 'Ann the Cat',
    tags: ['illust', 'cat'],
    date: '2024-12-01',
    type: 'image'
  },
  {
    src: '/images/image_valo_omen1.jpg',
    alt: 'Omen Play Clip',
    title: 'Omen Ace on Bind',
    tags: ['game', 'valorant', 'omen'],
    date: '2024-11-01',
    type: 'video'
  },
  {
    src: '/images/image_research_palette.jpg',
    alt: 'Color Palette Study',
    title: 'Illustration Color Recommendation',
    tags: ['research'],
    date: '2024-10-01',
    type: 'image'
  },
  {
    src: '/images/sample1.jpg',
    alt: 'Sample Image 1',
    title: 'Portfolio Sample 1',
    tags: ['illust', 'design'],
    date: '2024-09-15',
    type: 'image'
  },
  {
    src: '/images/sample2.jpg',
    alt: 'Sample Image 2',
    title: 'Portfolio Sample 2',
    tags: ['game', 'ui'],
    date: '2024-09-10',
    type: 'image'
  },
  {
    src: '/images/sample3.jpg',
    alt: 'Sample Image 3',
    title: 'Portfolio Sample 3',
    tags: ['research', 'data'],
    date: '2024-09-05',
    type: 'image'
  }
];