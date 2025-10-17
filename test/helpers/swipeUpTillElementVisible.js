async function swipeUpTillElementVisible(browser, xpath, maxSwipes = 10) {
    let swipes = 0;

    while (swipes < maxSwipes) {
        const elems = await browser.$$(xpath);
        if (elems.length > 0 && await elems[0].isDisplayed()) {
            return elems[0];
        }

        // Get screen size
        const { width, height } = await browser.getWindowRect();
        const startX = Math.floor(width / 2);
        const startY = Math.floor(height * 0.8);
        const endY = Math.floor(height * 0.2);

        // Perform swipe using pointer actions
        await browser.performActions([{
            type: 'pointer',
            id: 'finger1',
            parameters: { pointerType: 'touch' },
            actions: [
                { type: 'pointerMove', duration: 0, x: startX, y: startY },
                { type: 'pointerDown', button: 0 },
                { type: 'pause', duration: 500 },
                { type: 'pointerMove', duration: 800, x: startX, y: endY },
                { type: 'pointerUp', button: 0 }
            ]
        }]);

        // Release actions safely
        await browser.releaseActions().catch(() => {});

        // Small pause to allow UI to render
        await browser.pause(500);

        swipes++;
    }

    throw new Error(`Element ${xpath} not found after ${maxSwipes} swipes`);
}

module.exports = { swipeUpTillElementVisible };