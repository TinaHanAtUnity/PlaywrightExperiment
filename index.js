"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const puppeteer_1 = require("puppeteer");
const http_1 = require("http");
const fs_1 = require("fs");
const js = fs_1.readFileSync("../../../webview/unity-ads-webview/build/src/ts/BrowserBundle.js").toString();
const html = fs_1.readFileSync("../../../webview/unity-ads-webview/output").toString();
const content = fs_1.readFileSync("../tmp/test-vast.xml").toString();
const valid_1 = fs_1.readFileSync("../tmp/valid_1.xml").toString();
const valid_2 = fs_1.readFileSync("../tmp/valid_2.xml").toString();
const server = http_1.createServer((req, res) => {
    if (req.url === '/') {
        res.writeHead(200, {
            'Content-Type': 'text/html',
        });
        res.end(html);
    }
    else if (req.url === '/bundle.js') {
        res.writeHead(200, {
            'Content-Type': 'text/javascript',
        });
        res.end(js);
    }
    else if (req.url === '/vast') {
        res.writeHead(200, {
            'Content-Type': 'programmatic/vast',
        });
        res.end(content);
    }
});
server.listen(9999);
function sleep(time_ms) {
    return new Promise(r => setTimeout(r, time_ms));
}
(async () => {
    const browser = await puppeteer_1.launch({ headless: false, devtools: true });
    const page = await browser.newPage();
    await page.exposeFunction('content', async () => {
        return encodeURIComponent(content);
    });
    await page.exposeFunction('raduVast', async () => {
    return [
        content
    ];
    })
    await page.goto('http://localhost:9999');
    await sleep(2000);
    //await browser.close();
    //server.close();
})();
//# sourceMappingURL=index.js.map
