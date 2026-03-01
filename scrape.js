const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  const seeds = [22,23,24,25,26,27,28,29,30,31];
  let grandTotal = 0;

  for (const seed of seeds) {
    const url = `https://YOUR_BASE_URL?seed=${seed}`;  // replace with actual URL
    await page.goto(url);

    const numbers = await page.$$eval("table td", tds =>
      tds.map(td => parseFloat(td.innerText)).filter(n => !isNaN(n))
    );

    const sum = numbers.reduce((a,b) => a+b, 0);
    grandTotal += sum;
  }

  console.log("FINAL TOTAL:", grandTotal);

  await browser.close();
})();
