# PinyinFormat
A tiny library used to format Pinyin.

- Node and browser supported.
- Well tested.

Format pinyin in 3 styles.
- TONE (e.g., guó, xióng, xiǎo )
- TONE2 (e.g., guo2, xiong2, xiao3 )
- TO3NE (e.g., guo2, xio2ng, xia3o )

## Usage
- install

```bash
npm install pinyin-format
```

- import
```ts
import { pinyinFormat } from 'pinyin-format';
```

- example
```ts
pinyinFormat("lü4"); //lǜ
```

## API

- **pinyinFormat**

> `pinyinFormat(pinyin[, style = 'tone'])`, format pinyin (string or string array) to another style.

```ts
import {pinyinFormat, PinyinStyle} from 'pinyin-format';

// format to TONE style
pinyinFormat("lü4"); // lǜ

// format to TONE2 style
pinyinFormat('guó', PinyinStyle.TONE2); // guo2

// format to TO3NE style
pinyinFormat('rén', PinyinStyle.TO3NE); // re3n

// format pinyin array
pinyinFormat(['xiang4', 'xiong2', 'qi1', 'xiao3']); // ['xiàng',	'xióng', 	'qī',	'xiǎo']
```

## LICENSE

MIT@[cxxxxxn](https://github.com/cxxxxxn)