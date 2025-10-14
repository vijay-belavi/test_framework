const Tesseract = require('tesseract.js');
const fs = require('fs');
const path = require('path');

describe('Extract Text from Multiple Screenshots', () => {
    it('should extract text from multiple images', async () => {
        const screenshotsDir = './screenshots/web/';
        const files = fs.readdirSync(screenshotsDir)
                        .filter(file => file.endsWith('.png')); // get only PNG files

        for (let i = 0; i < files.length; i++) {
            const filePath = path.join(screenshotsDir, files[i]);
            const { data: { text } } = await Tesseract.recognize(filePath, 'eng');
            console.log(`Extracted text from ${files[i]}:`, text.trim());
        }
    });
});