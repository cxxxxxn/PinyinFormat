export enum PinyinStyle {
  'TONE' = 'tone',
  'TONE2' = 'tone2',
  'TO3NE' = 'to3ne',
}

export interface FormatFunc {
  (pinyin: string, style?: PinyinStyle): string;
  (pinyin: string[], style?: PinyinStyle): string[];
}
