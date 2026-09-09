const { chromium } = require('@playwright/test');
const fs = require('fs');
const path = require('path');

(async () => {
  console.log('Launching Playwright Chromium browser...');
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  console.log('Navigating to https://nforceone.com/...');
  await page.goto('https://nforceone.com/', { waitUntil: 'domcontentloaded', timeout: 30000 });

  // Take screenshot
  const screenshotPath = path.join(__dirname, 'nforceone_live.png');
  await page.screenshot({ path: screenshotPath, fullPage: true });
  console.log(`Saved screenshot to ${screenshotPath}`);

  // Extract CSS, colors, fonts, computed styles, links, and structure
  const brandData = await page.evaluate(() => {
    const getStyle = (el, prop) => el ? window.getComputedStyle(el).getPropertyValue(prop) : null;

    const body = document.body;
    const h1 = document.querySelector('h1, h2, .elementor-heading-title');
    const button = document.querySelector('a.elementor-button, button, .vamtam-btn-bg-color, .elementor-button-link');
    const header = document.querySelector('header');
    const footer = document.querySelector('footer');
    const logoImg = document.querySelector('header img, .elementor-widget-theme-site-logo img');

    const fonts = new Set();
    document.querySelectorAll('*').forEach(el => {
      const f = window.getComputedStyle(el).fontFamily;
      if (f) fonts.add(f.split(',')[0].replace(/["']/g, '').trim());
    });

    const colors = new Set();
    const bgColors = new Set();
    document.querySelectorAll('h1, h2, h3, h4, p, a, button, section, div, header, footer').forEach(el => {
      const style = window.getComputedStyle(el);
      if (style.color) colors.add(style.color);
      if (style.backgroundColor && style.backgroundColor !== 'rgba(0, 0, 0, 0)' && style.backgroundColor !== 'transparent') {
        bgColors.add(style.backgroundColor);
      }
    });

    // Helper to RGB to Hex
    const rgbToHex = (rgbStr) => {
      if (!rgbStr) return null;
      const match = rgbStr.match(/\d+/g);
      if (!match || match.length < 3) return rgbStr;
      const r = parseInt(match[0]).toString(16).padStart(2, '0');
      const g = parseInt(match[1]).toString(16).padStart(2, '0');
      const b = parseInt(match[2]).toString(16).padStart(2, '0');
      return `#${r}${g}${b}`.toUpperCase();
    };

    return {
      title: document.title,
      bodyBg: getStyle(body, 'background-color'),
      bodyBgHex: rgbToHex(getStyle(body, 'background-color')),
      bodyFontFamily: getStyle(body, 'font-family'),
      bodyFontSize: getStyle(body, 'font-size'),
      bodyColor: getStyle(body, 'color'),
      bodyColorHex: rgbToHex(getStyle(body, 'color')),
      headingFontFamily: getStyle(h1, 'font-family'),
      headingColor: getStyle(h1, 'color'),
      headingColorHex: rgbToHex(getStyle(h1, 'color')),
      buttonBg: getStyle(button, 'background-color'),
      buttonBgHex: rgbToHex(getStyle(button, 'background-color')),
      buttonTextColor: getStyle(button, 'color'),
      buttonTextColorHex: rgbToHex(getStyle(button, 'color')),
      buttonBorderRadius: getStyle(button, 'border-radius'),
      headerBg: getStyle(header, 'background-color'),
      headerBgHex: rgbToHex(getStyle(header, 'background-color')),
      footerBg: getStyle(footer, 'background-color'),
      footerBgHex: rgbToHex(getStyle(footer, 'background-color')),
      logoSrc: logoImg ? logoImg.src : null,
      allFontFamilies: Array.from(fonts).slice(0, 15),
      sampledTextColorsHex: Array.from(colors).map(rgbToHex).filter((v, i, a) => a.indexOf(v) === i).slice(0, 15),
      sampledBgColorsHex: Array.from(bgColors).map(rgbToHex).filter((v, i, a) => a.indexOf(v) === i).slice(0, 15)
    };
  });

  console.log('Brand Data Extracted:');
  console.log(JSON.stringify(brandData, null, 2));

  const outputPath = path.join(__dirname, 'brand_data.json');
  fs.writeFileSync(outputPath, JSON.stringify(brandData, null, 2));

  await browser.close();
})();
