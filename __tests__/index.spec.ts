import { pinyinFormat } from '../src';
import { PinyinStyle } from '../src/interface';

describe('pinyin format core', () => {
  test('export', () => {
    expect(pinyinFormat).toBeInstanceOf(Function);
  });

  test('tone', () => {
    expect(pinyinFormat('lü4')).toEqual('lǜ');
  });

  test('tone2', () => {
    expect(pinyinFormat('guó', PinyinStyle.TONE2)).toEqual('guo2');
  });

  test('to3ne', () => {
    expect(pinyinFormat('rén', PinyinStyle.TO3NE)).toEqual('re2n');
  });

  test('xue', () => {
    expect(pinyinFormat('xue2')).toEqual('xué');
  });

  test('ma', () => {
    expect(pinyinFormat('ma', PinyinStyle.TONE2)).toEqual('ma5');
  });

  test('ma', () => {
    expect(pinyinFormat('ma', PinyinStyle.TONE)).toEqual('ma');
  });

  test('ng', () => {
    expect(pinyinFormat('ng2')).toEqual('ńg');
  });

  test('arr', () => {
    expect(pinyinFormat(['xiang4', 'xiong2', 'qi1', 'xiao3'])).toEqual(['xiàng', 'xióng', 'qī', 'xiǎo']);
  });

  test('wrong case', () => {
    expect(pinyinFormat('mm')).toEqual('mm');
  });

  test('empty case', () => {
    expect(pinyinFormat(' ')).toEqual(' ');
  });
});
