import babel from 'rollup-plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import external from 'rollup-plugin-peer-deps-external';
import postcss from 'rollup-plugin-postcss';
import {terser} from 'rollup-plugin-terser';

export default [
    {
        input: './src/components/Web3Modal/index.js',
        output: [
            {
                file: 'dist/index.js',
                format: 'cjs',
            },
            {
                file: 'dist/index.es.js',
                format: 'es',
                exports: 'named',
            }
        ],
        plugins: [
            postcss({
                config: {
                  path: "./postcss.config.js",
                },
                extensions: [".css"],
                minimize: true,
                inject: {
                  insertAt: "top",
                },
            }),
            babel(
                {
                    exclude: 'nude_modules/**',
                    presets: ['@babel/preset-react']
                }
            ),
            external(),
            resolve({
                // use "module" field for ES6 module if possible
                module: true, // Default: true
           
                // use "jsnext:main" if possible
                // – see https://github.com/rollup/rollup/wiki/jsnext:main
                jsnext: true,  // Default: false
           
                // use "main" field or index.js, even if it's not an ES6 module
                // (needs to be converted from CommonJS to ES6
                // – see https://github.com/rollup/rollup-plugin-commonjs
                main: true,  // Default: true
           
                // use this fields to resolve a main field
                mainFields: ["es2015", "module", "main"],  // Default: undefined
           
                // some package.json files have a `browser` field which
                // specifies alternative files to load for people bundling
                // for the browser. If that's you, use this option, otherwise
                // pkg.browser will be ignored
                browser: true,  // Default: false
           
                // not all files you want to resolve are .js files
                extensions: [ '.js', '.jsx', '.json','.css' ],  // Default: ['.js']
           
                // whether to prefer built-in modules (e.g. `fs`, `path`) or
                // local ones with the same names
                preferBuiltins: false,  // Default: true
           
                // Lock the module search in this path (like a chroot). Module defined
                // outside this path will be marked as external
                jail: '/my/jail/path', // Default: '/'
                
                // Set to an array of strings and/or regexps to lock the module search
                // to modules that match at least one entry. Modules not matching any
                // entry will be marked as external
                only: [ 'some_module', /^@some_scope\/.*$/ ], // Default: null
           
                // If true, inspect resolved files to check that they are
                // ES2015 modules
                modulesOnly: true, // Default: false
           
                // Any additional options that should be passed through
                // to node-resolve
                customResolveOptions: {
                  moduleDirectory: 'js_modules'
                }
              }),
              terser(),
        ],
        mainFields : [ "browser", "module", "main" ],
    },
]