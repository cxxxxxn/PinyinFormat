import { uglify } from 'rollup-plugin-uglify';
import resolve from 'rollup-plugin-node-resolve';
import typescript from 'rollup-plugin-typescript';

module.exports = [
  {
    input: 'src/index.ts',
    output: {
      file: 'dist/pinyin-format.min.js',
      name: 'pinyin-format',
      format: 'umd',
    },
    plugins: [
      resolve(),
      typescript(),
      uglify(),
    ],
  }
];