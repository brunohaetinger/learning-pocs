import puppeteer from 'puppeteer';

// Get DY information about itsa4 brazilian stock
(async () => {
  const browser = await puppeteer.launch({executablePath: "/usr/bin/chromium", defaultViewport: {height: 1920, width: 1080}, headless: false});
  const page = await browser.newPage();
  await page.goto('https://statusinvest.com.br/acoes/itsa4', {waitUntil: 'networkidle2'});
  await page.screenshot({path: 'itsa4.png'});
  await page.waitForNetworkIdle();
  await page.screenshot({path: 'itsa4_2.png'});
  const data = await page.evaluate(()=>{
    const dy = document.querySelector('.indicator-today-container > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > strong:nth-child(1)').innerText;

    return {
      dy,
    }
  })
  console.log(data);
  
  await browser.close();
})();
