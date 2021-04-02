import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from 'rollup-plugin-typescript2';
import {terser} from "rollup-plugin-terser";

// Reference: https://medium.com/@lucksp_22012/3-options-to-compile-typescript-to-js-rollup-tsc-babel-3319977a6946
// this override is needed because Module format cjs does not support top-level await
// eslint-disable-next-line @typescript-eslint/no-var-requires
const packageJson = require('./package.json');

const globals = {
    ...packageJson.devDependencies,
};

export default {
    input: 'src/Spreadparser.ts',
    output: [
        {
            file: packageJson.main,
            format: 'cjs', // commonJS for node
            sourcemap: true,
            exports: 'auto'
        },
        {
            file: packageJson.umd,
            format: 'umd', // UMD for browser, unpkg.com
            name: 'Spreadparser',
            sourcemap: true,
            compact: true,
            plugins: [terser({
                output: {
                    comments: false,
                }
            })]
        },
        {
            file: packageJson.module,
            format: 'esm', // ES Modules for ES6 projects
            sourcemap: true,
        }
    ],
    plugins: [
        peerDepsExternal(),
        resolve(),
        commonjs(),
        typescript({
            tsconfig: './tsconfig.json'
        }),
        commonjs({
            exclude: 'node_modules',
            ignoreGlobal: true,
        }),
    ],
    external: Object.keys(globals),
};

// Other useful plugins you might want to add are:
// @rollup/plugin-images - import image files into your components
// @rollup/plugin-json - import JSON files into your components
// rollup-plugin-terser - minify the Rollup bundle
