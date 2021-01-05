const { chromium } = require('playwright');
const { webkit } = require('playwright');
const { firefox } = require('playwright');
const crypto = require('crypto');
const fs = require("fs");
const comet = fs.readFileSync("./creatives/comet_campaign").toString();
const vast = fs.readFileSync("./creatives/vast").toString();
const banner = fs.readFileSync("./creatives/banner_html").toString();
const static_interstial = fs.readFileSync("./creatives/static_interstitial_html").toString();
const mraid_html = fs.readFileSync("./creatives/mraid_html").toString();
const mraid_playable = fs.readFileSync("./creatives/mraid_playable").toString();
const comet_playable = fs.readFileSync("./creatives/comet_playable").toString();

(async () => {
  const browser = await firefox.launch({ headless: false });
  const page = await browser.newPage();
  //const creative = { contentType: 'programmatic/mraid', adTag: mraid_html };
  const creative = { contentType: 'programmatic/vast', adTag: vast };
  //const creative = { contentType: 'comet/campaign', adTag: comet };
  //const creative = { contentType: 'programmatic/mraid-playable', adTag: mraid_playable };
  //const creative = { contentType: 'comet/playable', adTag: comet_playable };
  await page.exposeFunction('crGetCreative', () => {
    return creative;
  });
  await page.exposeFunction('crCreativeLoaded', () => {
    new Promise(r => setTimeout(r, 2000)).then(() => {
        console.log('Hello');
        page.screenshot({ path: `example.png` });
    });
  });
  await page.goto('http://localhost:8000/build/browser/');
  //await browser.close();
})();
