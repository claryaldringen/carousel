import babel from '@rollup/plugin-babel'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import postcss from 'rollup-plugin-postcss'

import pkg from './package.json'

export default [
  {
    input: 'src/components/index.js',
    output: [
      {
        file: pkg.main,
        format: 'cjs',
        sourcemap: true
      },
      {
        file: pkg.module,
        format: 'esm',
        sourcemap: true
      }
    ],
    plugins: [
      postcss(),
      resolve(),
      babel({
        presets: ['@babel/preset-react']
      }),
      commonjs()
    ]
  }
]
