const puppeteer = require('puppeteer');

(async () => {
  try {
    const browser = await puppeteer.launch({
      headless: false
    });
    const page = await browser.newPage();

    // Navigates to Whatsapp
    await page.goto('https://web.whatsapp.com/', {
      waitUntil: 'load'
    });
    await delay(30000);

    // Click on contact you want to send message
    const contactName = "Contact Name";
    await page.click(`span[title='${contactName}']`);
    await page.waitForSelector("._2vbn4");

    // Find the message bar and focused on it
    await page.focus("div[data-tab='10']");

    // Sending Messages
    const amountOfMessages = 100;

    for (let i = 0; i < amountOfMessages; i++) {
      await page.evaluate(() => {
        const message = "Message";
        document.execCommand("insertText", false, message);
      });
      await page.click("span[data-testid='send']");
      await delay(1000);
    }
  } catch (err) {
    console.log("🚀 ~ file: index.js ~ line 47 ~ err", err)
  }

})();

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}