import { FormatFunc, PinyinStyle } from './interface';

//ref: https://zhuanlan.zhihu.com/p/22555852
// four tones
const toneMarks = ['\u0304', '\u0301', '\u030c', '\u0300'];
// initials
const initialConsonants = [
  'b',
  'p',
  'm',
  'f',
  'd',
  't',
  'n',
  'l',
  'g',
  'k',
  'h',
  'j',
  'q',
  'x',
  'zh',
  'ch',
  'sh',
  'r',
  'z',
  'c',
  's',
  'y',
  'w',
];
// finals
const finals = [
  'a',
  'o',
  'e',
  'i',
  'u',
  'ü',
  'er',
  'ai',
  'uai',
  'ei',
  'ao',
  'iao',
  'ou',
  'ia',
  'ie',
  'ua',
  'uo',
  'üe',
  'ui',
  'iu', // uei -> ui, iou -> iu
  'ue', // j,q,x,y(üe -> ue)
  'an',
  'ian',
  'uan',
  'üan',
  'en',
  'in',
  'un',
  'ün', // uen -> un
  'ang',
  'iang',
  'uang',
  'eng',
  'ueng',
  'ing',
  'ong',
  'iong',
];

const specialCases = ['ng', 'm', 'n'];
const getInitialAndFinal = (pinyin): { initial: string; final: string } | null => {
  let initial = '';
  let i = 0;
  for (i = 0; i < pinyin.length; i += 1) {
    const char = pinyin[i];

    if (initialConsonants.includes(char)) {
      initial += char;
    } else {
      break;
    }
  }
  const final = pinyin.slice(i);
  if (finals.includes(final)) {
    return { initial, final };
  }
  return null;
};

const getTone = (pinyin: string): number => {
  // search tone number
  const matches = pinyin.match(/[a-zü](\d)/i);
  if (matches) return +matches[1];
  // search tone mark
  for (let i = 0; i < toneMarks.length; i += 1) {
    if (pinyin.normalize('NFD').match(toneMarks[i])) return i + 1;
  }
  // 5th tone as default
  return 5;
};

const removeTone = (pinyin: string): string => {
  pinyin = pinyin.normalize('NFD').replace(/\u0304|\u0301|\u030c|\u0300/, '');
  return pinyin.normalize('NFC').replace(/[1-5]/, '');
};

const format = (pinyin: string, style: PinyinStyle): string => {
  const oldPinyin = pinyin;
  pinyin = pinyin.trim();
  if (!pinyin.length) return oldPinyin;

  pinyin = pinyin.toLocaleLowerCase();
  const tone = getTone(pinyin);
  pinyin = removeTone(pinyin);
  pinyin = pinyin.replace('v', 'ü');

  const deconstruct = getInitialAndFinal(pinyin);
  if (!deconstruct && !specialCases.includes(pinyin)) {
    console.error('The pinyin input is not grammatical');
    return oldPinyin;
  }
  if (style === PinyinStyle.TONE2) {
    return pinyin + tone;
  } else {
    let vowelIndex = pinyin.search(/[aeo]/);
    if (vowelIndex === -1) {
      vowelIndex = Math.max(pinyin.lastIndexOf('i'), pinyin.lastIndexOf('u'), pinyin.lastIndexOf('ü'));
    }
    if (vowelIndex === -1) {
      //special cases
      vowelIndex = 0;
    }
    if (style === PinyinStyle.TONE) {
      if (tone === 5) return pinyin;
      return pinyin.replace(pinyin[vowelIndex], pinyin[vowelIndex] + toneMarks[tone - 1]).normalize('NFC');
    } else {
      // to3ne
      return pinyin.replace(pinyin[vowelIndex], pinyin[vowelIndex] + tone);
    }
  }
};

export const pinyinFormat: FormatFunc = (pinyin, style = PinyinStyle.TONE) => {
  if (typeof pinyin === 'object') {
    return pinyin.map((value) => format(value, style));
  } else {
    return format(pinyin, style);
  }
};
