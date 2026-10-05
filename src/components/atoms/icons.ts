// UI アイコンの唯一の定義元。
// Lucide の一般的な 24x24 / stroke ベースのアイコンに統一する。
// https://lucide.dev/icons/

export const ICONS = {
  // Lucide: Sun
  sun: [
    'M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0z',
    'M12 2v2',
    'M12 20v2',
    'm4.93 4.93 1.41 1.41',
    'm17.66 17.66 1.41 1.41',
    'M2 12h2',
    'M20 12h2',
    'm6.34 17.66-1.41 1.41',
    'm19.07 4.93-1.41 1.41',
  ],
  // Lucide: Moon
  moon: ['M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9'],
  // Lucide: Menu
  menu: ['M4 12h16', 'M4 6h16', 'M4 18h16'],
  // Lucide: X
  close: ['M18 6 6 18', 'm6 6 12 12'],
  // Lucide: ExternalLink
  external: ['M15 3h6v6', 'M10 14 21 3', 'M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6'],
  // Lucide: ArrowUpDown
  sort: ['m3 16 4 4 4-4', 'M7 20V4', 'm21 8-4-4-4 4', 'M17 4v16'],
  // Lucide: ChevronDown
  chevronDown: ['m6 9 6 6 6-6'],
  // Lucide: ChevronLeft
  chevronLeft: ['m15 18-6-6 6-6'],
  // Lucide: ChevronRight
  chevronRight: ['m9 18 6-6-6-6'],
  // Lucide: Maximize2
  expand: ['M15 3h6v6', 'm21 3-7 7', 'm3 21 7-7', 'M9 21H3v-6'],
  // Lucide: Play
  play: ['M6 3l14 9-14 9V3z'],
} as const;

export type IconName = keyof typeof ICONS;
