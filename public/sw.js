if(!self.define){let e,s={};const c=(c,i)=>(c=new URL(c+".js",i).href,s[c]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=c,e.onload=s,document.head.appendChild(e)}else e=c,importScripts(c),s()})).then((()=>{let e=s[c];if(!e)throw new Error(`Module ${c} didn’t register its module`);return e})));self.define=(i,a)=>{const n=e||("document"in self?document.currentScript.src:"")||location.href;if(s[n])return;let t={};const r=e=>c(e,n),d={module:{uri:n},exports:t,require:r};s[n]=Promise.all(i.map((e=>d[e]||r(e)))).then((e=>(a(...e),t)))}}define(["./workbox-50de5c5d"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/app-build-manifest.json",revision:"1a851aec19ba9aaa252de186ec92d128"},{url:"/_next/static/chunks/1404.0479877fc5dc3c29.js",revision:"0479877fc5dc3c29"},{url:"/_next/static/chunks/1418c200-eaa700da5c14dacf.js",revision:"mopp2vlc40Oi95T6H6gpS"},{url:"/_next/static/chunks/1438.785949cbdb4917e7.js",revision:"785949cbdb4917e7"},{url:"/_next/static/chunks/145.a009de1544e5ad8e.js",revision:"a009de1544e5ad8e"},{url:"/_next/static/chunks/1966.cf551d1884e93418.js",revision:"cf551d1884e93418"},{url:"/_next/static/chunks/2209.9f11976787c9c56d.js",revision:"9f11976787c9c56d"},{url:"/_next/static/chunks/2289.1450b75f0dac1234.js",revision:"1450b75f0dac1234"},{url:"/_next/static/chunks/2443530c-e183ea8a2d3f385a.js",revision:"mopp2vlc40Oi95T6H6gpS"},{url:"/_next/static/chunks/2514.6bb5345515a15dc9.js",revision:"6bb5345515a15dc9"},{url:"/_next/static/chunks/2994.47a719cb76a9468e.js",revision:"47a719cb76a9468e"},{url:"/_next/static/chunks/3213.c0694fd93a653b39.js",revision:"c0694fd93a653b39"},{url:"/_next/static/chunks/3222.9b4c5ce518b4ed65.js",revision:"9b4c5ce518b4ed65"},{url:"/_next/static/chunks/3244.61464d16290c3a0e.js",revision:"61464d16290c3a0e"},{url:"/_next/static/chunks/34.8d48181bf369b0f5.js",revision:"8d48181bf369b0f5"},{url:"/_next/static/chunks/3590.7633cba7cce60d42.js",revision:"7633cba7cce60d42"},{url:"/_next/static/chunks/3619-76b6f5a3430ec713.js",revision:"mopp2vlc40Oi95T6H6gpS"},{url:"/_next/static/chunks/3806.7ab7cf692445e342.js",revision:"7ab7cf692445e342"},{url:"/_next/static/chunks/3815.b54a03d32324e2f7.js",revision:"b54a03d32324e2f7"},{url:"/_next/static/chunks/3822.c2e87de5603b5109.js",revision:"c2e87de5603b5109"},{url:"/_next/static/chunks/3873-8d8e69ecff5bf1d3.js",revision:"mopp2vlc40Oi95T6H6gpS"},{url:"/_next/static/chunks/3990.f776d595f4245de1.js",revision:"f776d595f4245de1"},{url:"/_next/static/chunks/4290.957bf6e22d733d2a.js",revision:"957bf6e22d733d2a"},{url:"/_next/static/chunks/4463.720b97ab8aecef95.js",revision:"720b97ab8aecef95"},{url:"/_next/static/chunks/4625.69b18beb7ba595ea.js",revision:"69b18beb7ba595ea"},{url:"/_next/static/chunks/4718.7897198ef6162a67.js",revision:"7897198ef6162a67"},{url:"/_next/static/chunks/4788.158ad06451f1fc62.js",revision:"158ad06451f1fc62"},{url:"/_next/static/chunks/4934.dfcd51dc2dd2f3f3.js",revision:"dfcd51dc2dd2f3f3"},{url:"/_next/static/chunks/4961-f68ddd0ea52fd08c.js",revision:"mopp2vlc40Oi95T6H6gpS"},{url:"/_next/static/chunks/4a89e91e-1aae2bfe6fcb40cf.js",revision:"mopp2vlc40Oi95T6H6gpS"},{url:"/_next/static/chunks/5133-a303cbeb7071f566.js",revision:"mopp2vlc40Oi95T6H6gpS"},{url:"/_next/static/chunks/5183.c0ae3458078d3dd2.js",revision:"c0ae3458078d3dd2"},{url:"/_next/static/chunks/51adac7d-437788ee419e5749.js",revision:"mopp2vlc40Oi95T6H6gpS"},{url:"/_next/static/chunks/5234.6f99beda646c256f.js",revision:"6f99beda646c256f"},{url:"/_next/static/chunks/5340-279bba3ce15e90bb.js",revision:"mopp2vlc40Oi95T6H6gpS"},{url:"/_next/static/chunks/5439.8d2ff6b5e0acbb87.js",revision:"8d2ff6b5e0acbb87"},{url:"/_next/static/chunks/5463.d34a0df595d60959.js",revision:"d34a0df595d60959"},{url:"/_next/static/chunks/5567.af0cd0ae314fc0a3.js",revision:"af0cd0ae314fc0a3"},{url:"/_next/static/chunks/5661.41787665523edb5c.js",revision:"41787665523edb5c"},{url:"/_next/static/chunks/5819.f2ad5e31d41b4f28.js",revision:"f2ad5e31d41b4f28"},{url:"/_next/static/chunks/6020.9cbed6cd51c6fb5c.js",revision:"9cbed6cd51c6fb5c"},{url:"/_next/static/chunks/6116.34bfa51ee771c3bd.js",revision:"34bfa51ee771c3bd"},{url:"/_next/static/chunks/6118.67d6c26e6ebc5421.js",revision:"67d6c26e6ebc5421"},{url:"/_next/static/chunks/6143.9d87f92c67f4c984.js",revision:"9d87f92c67f4c984"},{url:"/_next/static/chunks/6506.fbd3014a355834e1.js",revision:"fbd3014a355834e1"},{url:"/_next/static/chunks/6515-8c018d440e666c03.js",revision:"mopp2vlc40Oi95T6H6gpS"},{url:"/_next/static/chunks/6852.e13a64c65cdb16a5.js",revision:"e13a64c65cdb16a5"},{url:"/_next/static/chunks/6919-52afbebd073787df.js",revision:"mopp2vlc40Oi95T6H6gpS"},{url:"/_next/static/chunks/6980.03827dc82c6aef19.js",revision:"03827dc82c6aef19"},{url:"/_next/static/chunks/6c161120-1fea87f6d7265ba3.js",revision:"mopp2vlc40Oi95T6H6gpS"},{url:"/_next/static/chunks/7041.5e595e40431620e4.js",revision:"5e595e40431620e4"},{url:"/_next/static/chunks/7242.2a929ab445c785f1.js",revision:"2a929ab445c785f1"},{url:"/_next/static/chunks/7260.c541dd5b659cd950.js",revision:"c541dd5b659cd950"},{url:"/_next/static/chunks/7298-8b3b24b295f2d2c2.js",revision:"mopp2vlc40Oi95T6H6gpS"},{url:"/_next/static/chunks/7343.d5e0cda14710c604.js",revision:"d5e0cda14710c604"},{url:"/_next/static/chunks/7466-8b937f129ab42a93.js",revision:"mopp2vlc40Oi95T6H6gpS"},{url:"/_next/static/chunks/7519.8a040bcd95908bd2.js",revision:"8a040bcd95908bd2"},{url:"/_next/static/chunks/7578-4db19d28de1d0624.js",revision:"mopp2vlc40Oi95T6H6gpS"},{url:"/_next/static/chunks/8410-f0ca4cce53062c06.js",revision:"mopp2vlc40Oi95T6H6gpS"},{url:"/_next/static/chunks/8513-0d0cbd18cbc234e9.js",revision:"mopp2vlc40Oi95T6H6gpS"},{url:"/_next/static/chunks/8844.38dd8e39f84a165f.js",revision:"38dd8e39f84a165f"},{url:"/_next/static/chunks/9075.a80434162d9af66b.js",revision:"a80434162d9af66b"},{url:"/_next/static/chunks/9232.7625071c59ffad2d.js",revision:"7625071c59ffad2d"},{url:"/_next/static/chunks/9369.ad6c124f2e2671b9.js",revision:"ad6c124f2e2671b9"},{url:"/_next/static/chunks/95.d643e559304ddf59.js",revision:"d643e559304ddf59"},{url:"/_next/static/chunks/9504.fef71ece53bc1bda.js",revision:"fef71ece53bc1bda"},{url:"/_next/static/chunks/9812-77ed2863cf28cdb3.js",revision:"mopp2vlc40Oi95T6H6gpS"},{url:"/_next/static/chunks/9816.83ddb3b9a720af0e.js",revision:"83ddb3b9a720af0e"},{url:"/_next/static/chunks/9830.73540e33d8e0b03d.js",revision:"73540e33d8e0b03d"},{url:"/_next/static/chunks/a3d8d90f-5ad9c0498f5264dc.js",revision:"mopp2vlc40Oi95T6H6gpS"},{url:"/_next/static/chunks/a65c9164-ca931e63bd6bef22.js",revision:"mopp2vlc40Oi95T6H6gpS"},{url:"/_next/static/chunks/addcd443-e3de464b10ea60b7.js",revision:"mopp2vlc40Oi95T6H6gpS"},{url:"/_next/static/chunks/app/app/%5Bu%5D/followers/layout-21e72f62ca5f8b76.js",revision:"mopp2vlc40Oi95T6H6gpS"},{url:"/_next/static/chunks/app/app/%5Bu%5D/followers/page-5f9a9f22ea029ac3.js",revision:"mopp2vlc40Oi95T6H6gpS"},{url:"/_next/static/chunks/app/app/%5Bu%5D/following/layout-a08444bfac939c7b.js",revision:"mopp2vlc40Oi95T6H6gpS"},{url:"/_next/static/chunks/app/app/%5Bu%5D/following/page-831ca989fa79f645.js",revision:"mopp2vlc40Oi95T6H6gpS"},{url:"/_next/static/chunks/app/app/%5Bu%5D/layout-d6ec430b5725725d.js",revision:"mopp2vlc40Oi95T6H6gpS"},{url:"/_next/static/chunks/app/app/%5Bu%5D/page-d4f1d39297ca9010.js",revision:"mopp2vlc40Oi95T6H6gpS"},{url:"/_next/static/chunks/app/app/home/layout-4557dbd56ded1c1e.js",revision:"mopp2vlc40Oi95T6H6gpS"},{url:"/_next/static/chunks/app/app/home/page-ca36b8f166d402e5.js",revision:"mopp2vlc40Oi95T6H6gpS"},{url:"/_next/static/chunks/app/app/layout-41b211752b5ea336.js",revision:"mopp2vlc40Oi95T6H6gpS"},{url:"/_next/static/chunks/app/app/more/layout-f3e286fadf47df72.js",revision:"mopp2vlc40Oi95T6H6gpS"},{url:"/_next/static/chunks/app/app/more/page-c0ccf57d9d05f4fd.js",revision:"mopp2vlc40Oi95T6H6gpS"},{url:"/_next/static/chunks/app/app/page-0189c964b1d44180.js",revision:"mopp2vlc40Oi95T6H6gpS"},{url:"/_next/static/chunks/app/app/plot/%5Bid%5D/layout-f8bfeb5e62e44b01.js",revision:"mopp2vlc40Oi95T6H6gpS"},{url:"/_next/static/chunks/app/app/plot/%5Bid%5D/page-05478af8633264e4.js",revision:"mopp2vlc40Oi95T6H6gpS"},{url:"/_next/static/chunks/app/app/search/page-49a0800d3c205683.js",revision:"mopp2vlc40Oi95T6H6gpS"},{url:"/_next/static/chunks/app/landing/page-3892f0af34a24119.js",revision:"mopp2vlc40Oi95T6H6gpS"},{url:"/_next/static/chunks/app/layout-71da078e3c6bd6d9.js",revision:"mopp2vlc40Oi95T6H6gpS"},{url:"/_next/static/chunks/bda0794b-8c7a923a69c4225d.js",revision:"mopp2vlc40Oi95T6H6gpS"},{url:"/_next/static/chunks/c0730c88-72eeaab19288e856.js",revision:"mopp2vlc40Oi95T6H6gpS"},{url:"/_next/static/chunks/d24c7ea9-765a6432e38c0542.js",revision:"mopp2vlc40Oi95T6H6gpS"},{url:"/_next/static/chunks/da721926-09fc2c950ca36600.js",revision:"mopp2vlc40Oi95T6H6gpS"},{url:"/_next/static/chunks/main-2eede9f960c0aea3.js",revision:"mopp2vlc40Oi95T6H6gpS"},{url:"/_next/static/chunks/main-app-592e11a49d94e0bb.js",revision:"mopp2vlc40Oi95T6H6gpS"},{url:"/_next/static/chunks/pages/_app-6b94368279a02b5e.js",revision:"mopp2vlc40Oi95T6H6gpS"},{url:"/_next/static/chunks/pages/_error-48231c25f4fdaf06.js",revision:"mopp2vlc40Oi95T6H6gpS"},{url:"/_next/static/chunks/polyfills-c67a75d1b6f99dc8.js",revision:"837c0df77fd5009c9e46d446188ecfd0"},{url:"/_next/static/chunks/webpack-e575fd4a79c63497.js",revision:"mopp2vlc40Oi95T6H6gpS"},{url:"/_next/static/css/7e3de7acac199e75.css",revision:"7e3de7acac199e75"},{url:"/_next/static/css/a643c581df70d0e6.css",revision:"a643c581df70d0e6"},{url:"/_next/static/mopp2vlc40Oi95T6H6gpS/_buildManifest.js",revision:"f0529e304461a93a604e40adcab7290d"},{url:"/_next/static/mopp2vlc40Oi95T6H6gpS/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/favicon.ico",revision:"22f932efcb1f31f50faf4ccb0384fa5b"},{url:"/fonts/Manrope-Bold.ttf",revision:"2af19b388ce4f0e3617fed61faea284e"},{url:"/fonts/Manrope-Medium.ttf",revision:"36bd05140475db525b9617f601c201a6"},{url:"/fonts/SuisseIntl-Bold.ttf",revision:"d1a580023d40c546276decde1c711e60"},{url:"/fonts/SuisseIntl-Light.ttf",revision:"03d5b20d124cd26dc873bd4a8e42313e"},{url:"/fonts/SuisseIntl-Regular.ttf",revision:"88f10bf18a36407ef36bf30bc25a3618"},{url:"/fonts/SuisseIntl-SemiBold.ttf",revision:"653d9381828e9577fb1e417dc047f89d"},{url:"/images/app/empty.png",revision:"213c386b0b65b3b91fd54d3b8307045a"},{url:"/images/app/no-handle.png",revision:"09e5a878464489c97e8726f09db20096"},{url:"/images/icon-192x192.png",revision:"55566ba8a3a0a53a87395a14268adb57"},{url:"/images/icon-256x256.png",revision:"9a94fd1fc73fb9862c0d3e635b417b1f"},{url:"/images/icon-384x384.png",revision:"9c0c153a6d288ffb8fa6772eca2ee427"},{url:"/images/icon-512x512.png",revision:"12a4548a0dcbe21b4d6e60e0c8f44d92"},{url:"/images/icons/icon-discord.svg",revision:"e5ca7e2fc5e4a291ae95ca8a6dc3047b"},{url:"/images/icons/icon-twitter.svg",revision:"61e78e594dafbce6391c46b7d11785c1"},{url:"/images/landing/bg-ellipse-2.png",revision:"528f190ca9ee51a76abc670924beeaa7"},{url:"/images/landing/bg-ellipse-3.png",revision:"2a3ab10d89530dfe3c97cda50b39bae6"},{url:"/images/landing/bg-ellipse.png",revision:"b9ec44b28c6577b98e84b369eeaa1549"},{url:"/images/landing/creator-symbol.png",revision:"30c93a73df1ca06330cab6c9809a8fdb"},{url:"/images/landing/grid-blue.png",revision:"64085eaafeb50cae248e533e74870b51"},{url:"/images/landing/grid-purple.png",revision:"dc31aa644c665916cf7dd02acb95190b"},{url:"/images/landing/grid-red.png",revision:"d526e8e73e5191d24e2a3ebb22ca0f49"},{url:"/images/landing/grid-yellow.png",revision:"73036d6354ec74f0df4ee84a0265741d"},{url:"/images/landing/stats-bg.png",revision:"38784fa95b114881e37caa669435909b"},{url:"/images/landing/stats-object.png",revision:"780ea7200f319d9c7333e1e7fa3bef0e"},{url:"/images/landing/veplotty-symbol.png",revision:"93ecaa434a6a7b096325189a842ec602"},{url:"/images/logo-dark.png",revision:"56ae202b871aac76cc47ea1864be898c"},{url:"/images/logo.png",revision:"b34331137851aba5da49f666e05414d4"},{url:"/images/preview.png",revision:"02fc8c1139c423a6d19a4066ea09bf43"},{url:"/manifest.json",revision:"a02fb9b42d8029b656bfbf07123a31bf"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:c,state:i})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));