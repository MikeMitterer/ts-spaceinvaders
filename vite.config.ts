// Was wird benötigt:
//     yarn add --dev vite-plugin-node-polyfills

import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue2'
import { ViteEjsPlugin } from "vite-plugin-ejs";
import { nodePolyfills } from 'vite-plugin-node-polyfills'
import { format } from 'date-fns'
import * as path from "path"

// @ts-ignore
import pkg from './package.json';

const date = format(Date.now(), 'yyyy.MM.dd HH:mm');
const devMode = process.env.NODE_ENV !== 'production';

const packageName = pkg.name.split('/')
const fileName = packageName.length > 1 ? packageName[1] : packageName[0];

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
    // Load env file based on `mode` in the current working directory.
    // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
    const env = loadEnv(mode, process.cwd(), '');
    const srcFolder = path.resolve(__dirname, "src");
    console.log(`Mode: ${mode}, Command: ${command}, Filename: ${fileName}, srcFolder: ${srcFolder}`)

    const define: Record<string, any> = {
        //     // global: 'globalThis',
        //     // globalThis.Buffer = Buffer,

        'process.env.DIRNAME': JSON.stringify(__dirname),

        'process.env.VUE_APP_VERSION': JSON.stringify(pkg.version),
        'process.env.VUE_APP_DEV_MODE': devMode,
        'process.env.VUE_APP_PUBLISHED': JSON.stringify(date),

        // If you want to expose all env variables, which is not recommended
        // 'process.env': env
    };

    for( const key in env ) {
        // console.log(`Env: ${key} = ${env[key]}`);
        if ( key.startsWith('VUE_APP_') ) {
            define[`process.env.${key}`] = JSON.stringify(env[key]);
        }
    }

    return {
        // rollupOptions: {
        //     plugins: [
        //         rollupNodePolyFill()
        //     ]
        // },
        define,
        resolve: {
            alias: {
                // Bei den Scripts läuft zusätzlich noch 'resolve-tspaths' (build:types) um die Pfade aufzulösen
                //     https://www.npmjs.com/package/resolve-tspaths
                "@": path.resolve(__dirname, "./src"),
                process: "process/browser", // yarn add process
                path: "path-browserify",
                crypto: "crypto-browserify",
                stream: "stream-browserify",
                zlib: "browserify-zlib",
                util: "util", // yarn add util
            },
        },
        plugins: [
            // vplugin.pluginVueEnv({
            //
            // }, {
            //     fileRegexp: /\.(ts|vue|html)/i,
            //     debug: true }),

            // https://www.npmjs.com/package/@vitejs/plugin-vue2
            vue(),

            // https://www.npmjs.com/package/vite-plugin-node-polyfills
            nodePolyfills({
                globals: {
                    Buffer: true, // can also be 'build', 'dev', or false
                    global: true,
                    process: true,
                },
                // Whether to polyfill `node:` protocol imports.
                protocolImports: true,
            }),

            // Or With Vite Config
            ViteEjsPlugin((viteConfig) => {
                // viteConfig is the current viteResolved config.
                return {
                    root: viteConfig.root,
                    BASE_URL: "/",
                    VUE_APP_TITLE: JSON.stringify(env.VUE_APP_TITLE),
                    VUE_APP_DEV_MODE: devMode
                }
            }),
        ],
        // optimizeDeps: {
        //     esbuildOptions: {
        //         // Node.js global to browser globalThis
        //         define: {
        //             global: 'globalThis'
        //         },
        //         // Enable esbuild polyfill plugins
        //         plugins: [
        //             NodeGlobalsPolyfillPlugin({
        //                 buffer: true,
        //                 process: true,
        //             }),
        //             NodeModulesPolyfillPlugin()
        //         ]
        //     }
        // },
    };
});

