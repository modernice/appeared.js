import ts from '@rollup/plugin-typescript'
import babel from 'rollup-plugin-babel'
import { terser } from 'rollup-plugin-terser'

export default [{
  input: 'src/index.ts',

  output: [{
    format: 'es',
    file: 'dist/appeared.js',
  }, {
    format: 'cjs',
    file: 'dist/appeared.common.js',
  }],

  plugins: [
    ts(),
    babel({
      extensions: ['.ts'],
      presets: [['@babel/preset-env', {
        targets: {
          browsers: '> 5%, last 2 versions, not ie 11, not dead',
        },
      }]]
    }),
  ],
}, {
  input: 'src/index.ts',

  output: {
    format: 'umd',
    name: 'appeared',
    file: 'dist/appeared.umd.js',
  },

  plugins: [
    ts(),
    babel({
      extensions: ['.ts'],
      presets: [['@babel/preset-env', {
        targets: {
          browsers: '> 5%, last 2 versions, not ie 11, not dead',
        },
      }]]
    }),
    terser(),
  ],
}, {
  input: 'src/index.ts',

  output: [{
    format: 'es',
    file: 'dist/appeared.ie11.js',
  }, {
    format: 'cjs',
    file: 'dist/appeared.ie11.common.js',
  }],

  plugins: [
    ts(),
    babel({
      extensions: ['.ts'],
      presets: [['@babel/preset-env', {
        targets: {
          browsers: '> 1%, last 2 versions, not dead, ie 11',
        },
      }]]
    }),
  ],
}, {
  input: 'src/index.ts',

  output: {
    format: 'umd',
    name: 'appeared',
    file: 'dist/appeared.ie11.umd.js',
  },

  plugins: [
    ts(),
    babel({
      extensions: ['.ts'],
      presets: [['@babel/preset-env', {
        targets: {
          browsers: '> 1%, last 2 versions, not dead, ie 11',
        },
      }]]
    }),
    terser(),
  ],
}]
