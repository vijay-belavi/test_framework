/**
 * Press the Android back button.
 * @param {WebdriverIO.Browser} driver
 */
async function pressBackKey(driver) {
    try {
        console.log("🔙 Pressing the Android back key...");
        await driver.back();
        console.log("✅ Back key pressed successfully.");
    } catch (error) {
        console.error("❌ Failed to press back key:", error.message);
    }
}

module.exports = { pressBackKey };
