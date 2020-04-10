import ts from '@rollup/plugin-typescript'
import babel from 'rollup-plugin-babel'
import { terser } from 'rollup-plugin-terser'

export default [{
  input: 'src/index.ts',

  output: [{
    format: 'es',
    file: 'dist/index.js',
  }, {
    format: 'cjs',
    file: 'dist/index.common.js',
  }],

  plugins: [
    ts(),
    babel(),
  ],
}, {
  input: 'src/index.ts',

  output: {
    format: 'umd',
    name: 'appeared',
    file: 'dist/index.umd.js',
  },

  plugins: [
    ts(),
    babel(),
    terser(),
  ],
}]
