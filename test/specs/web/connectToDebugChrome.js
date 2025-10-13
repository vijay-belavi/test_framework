const { Builder } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

(async function connectToDebugChrome() {
  try {
    const options = new chrome.Options();
    options.options_['debuggerAddress'] = '127.0.0.1:9222'; // connect to existing Chrome

    const driver = await new Builder()
      .forBrowser('chrome')
      .setChromeOptions(options)
      .build();

    await driver.get('https://www.google.com');
    console.log('Connected to existing Chrome session!');

    // // Do your actions here — you’ll stay logged in.
    // await driver.sleep(5000);
    // await driver.quit();
  } catch (err) {
    console.error(err);
  }
})();