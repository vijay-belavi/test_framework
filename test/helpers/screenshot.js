const path = require('path');

async function takeScreenshot(name = 'screenshot') {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filePath = path.join(__dirname, '../screenshots/failed-test', `${name}-${timestamp}.png`);
    await browser.saveScreenshot(filePath);
    console.log(`📸 Screenshot saved: ${filePath}`);
}

module.exports = { takeScreenshot };