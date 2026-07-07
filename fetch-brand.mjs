import puppeteer from 'puppeteer';
import { writeFileSync } from 'fs';

const URL = 'https://brand.optimizely.com/document/152#/-/overview';
const OUT = 'brand-context.html';

const browser = await puppeteer.launch({ headless: false });
const page = await browser.newPage();

await page.goto(URL);

console.log('Log in if prompted, then wait for the page to fully load.');
console.log('Press Enter here once the content is visible...');
await new Promise(resolve => process.stdin.once('data', resolve));

const html = await page.content();
writeFileSync(OUT, html, 'utf8');
console.log(`Saved to ${OUT} (${(html.length / 1024).toFixed(1)} KB)`);

await browser.close();
process.exit(0);
