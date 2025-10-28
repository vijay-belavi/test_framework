/**
 * Check if Android keyboard is displayed.
 * If yes → close it.
 * If no → log message.
 * @param {WebdriverIO.Browser} driver
 */
async function handleKeyboard(driver) {
    try {
        // Check if the keyboard is visible
        const isKeyboardShown = await driver.isKeyboardShown();

        if (isKeyboardShown) {
            console.log("⌨️ Keyboard is visible — closing it...");
            await driver.hideKeyboard();
            console.log("✅ Keyboard closed successfully.");
        } else {
            console.log("ℹ️ Keyboard already closed.");
        }

    } catch (error) {
        console.error("❌ Failed to check/close keyboard:", error.message);
    }
}

module.exports = { handleKeyboard };