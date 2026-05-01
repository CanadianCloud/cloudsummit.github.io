import { renderers } from './renderers.mjs';
import { c as createExports, s as serverEntrypointModule } from './chunks/_@astrojs-ssr-adapter_CwW7XPc_.mjs';
import { manifest } from './manifest_C3Ugx4xl.mjs';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/about-cloud-summit.astro.mjs');
const _page2 = () => import('./pages/api/nomination.astro.mjs');
const _page3 = () => import('./pages/api/votes.astro.mjs');
const _page4 = () => import('./pages/nomination.astro.mjs');
const _page5 = () => import('./pages/our-speakers.astro.mjs');
const _page6 = () => import('./pages/our-sponsors.astro.mjs');
const _page7 = () => import('./pages/our-team.astro.mjs');
const _page8 = () => import('./pages/press-release.astro.mjs');
const _page9 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/about-cloud-summit.astro", _page1],
    ["src/pages/api/nomination.ts", _page2],
    ["src/pages/api/votes.ts", _page3],
    ["src/pages/nomination.astro", _page4],
    ["src/pages/our-speakers.astro", _page5],
    ["src/pages/our-sponsors.astro", _page6],
    ["src/pages/our-team.astro", _page7],
    ["src/pages/press-release.astro", _page8],
    ["src/pages/index.astro", _page9]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    actions: () => import('./noop-entrypoint.mjs'),
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = {
    "middlewareSecret": "2d8cbac4-9aaf-493f-bba8-923ee178ec35",
    "skewProtection": false
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;
const _start = 'start';
if (Object.prototype.hasOwnProperty.call(serverEntrypointModule, _start)) ;

export { __astrojsSsrVirtualEntry as default, pageMap };
