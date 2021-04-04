import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import babel from "@rollup/plugin-babel";
import { terser } from "rollup-plugin-terser";
import { eslint } from 'rollup-plugin-eslint';
import serve from 'rollup-plugin-serve';
import livereload from 'rollup-plugin-livereload';
import packageJson from './package.json';

const commonConfig = {
    input: 'src/Spreadparser.ts',
    output: {
        name: 'Spreadparser',
        sourcemap: true
    },
    plugins: [
        resolve({
            customResolveOptions: {
                moduleDirectory: 'node_modules'
            }
        }),
        babel({
            exclude: 'node_modules/**',
            extensions: ['.js', '.jsx', '.es6', '.es', '.mjs', '.ts'],
            babelHelpers: 'runtime'
        }),
        commonjs({
            extensions: ['.js', '.ts']
        })
    ]
};

// ESM config
const esmConfig = Object.assign({}, commonConfig);
esmConfig.output = Object.assign({}, commonConfig.output, {
    file: packageJson.module,
    format: 'esm'
});

// ESM prod config
const esmProdConfig = Object.assign({}, esmConfig);
esmProdConfig.output = Object.assign({}, esmConfig.output, {
    file: packageJson.module.replace('.mjs', '.min.mjs'),
    sourcemap: false
});
esmProdConfig.plugins = [
    ...esmConfig.plugins,
    terser()
];

// UMD config
const umdConfig = Object.assign({}, commonConfig);
umdConfig.output = Object.assign({}, commonConfig.output, {
    file: packageJson.main,
    format: 'umd'
});
umdConfig.plugins = [
    ...commonConfig.plugins
];

// Production config
const umdProdConfig = Object.assign({}, umdConfig);
umdProdConfig.output = Object.assign({}, umdConfig.output, {
    file: packageJson.main.replace('.js', '.min.js'),
    sourcemap: false
});
umdProdConfig.plugins = [
    ...umdConfig.plugins,
    terser()
];

// UNPKG
const unpkgProdConfig = Object.assign({}, commonConfig);
unpkgProdConfig.input = 'src/Spreadparser.ts';
unpkgProdConfig.output = Object.assign({}, commonConfig.output, {
    file: packageJson.unpkg,
    format: 'iife',
    sourcemap: true
});
unpkgProdConfig.plugins = [
    ...umdConfig.plugins,
    terser()
];

let configurations = [];
if (process.env.SERVE) {
    const serveConfig = Object.assign({}, commonConfig);
    serveConfig.input = 'src/Spreadparser.ts';
    serveConfig.output = Object.assign({}, commonConfig.output, {
        file: packageJson.unpkg,
        format: 'iife'
    });
    serveConfig.plugins = [
        eslint({
            exclude: [
                'node_modules/**',
                'json/**'
            ],
            throwOnError: true
        }),
        ...umdConfig.plugins
    ];
    serveConfig.plugins.push(
        serve({
            open: true,
            contentBase: ['dist'],
            host: 'localhost',
            port: '3030'
        }),
        livereload({
            watch: 'dist',
            verbose: false
        })
    );
    configurations.push(serveConfig);
} else {
    configurations.push(
        unpkgProdConfig,
        esmConfig,
        esmProdConfig,
        umdConfig,
        umdProdConfig
    )
}

export default configurations;
