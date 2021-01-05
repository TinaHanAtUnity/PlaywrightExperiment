const { chromium } = require('playwright');
const crypto = require('crypto');
const fs = require("fs");
const comet = fs.readFileSync("./creatives/comet_campaign").toString();
const vast = fs.readFileSync("./creatives/vast").toString();
const banner = fs.readFileSync("./creatives/banner_html").toString();
const static_interstial = fs.readFileSync("./creatives/static_interstitial_html").toString();
const mraid_html = fs.readFileSync("./creatives/mraid_html").toString();
const mraid_playable = fs.readFileSync("./creatives/mraid_playable").toString();

(async () => {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();
  const creative = { contentType: 'programmatic/mraid', adTag: mraid_html };
  await page.exposeFunction('crGetCreative', () => {
    return creative;
  });
  await page.exposeFunction('crCreativeLoaded', () => {
    new Promise(r => setTimeout(r, 2000)).then(() => {
        page.screenshot({ path: `example.png` });
    });
  });
  await page.goto('http://localhost:8000/build/browser/');
  //await browser.close();
})();
