const path = require('path');
const { readExcelSheet, getSingleRow, getMultipleRows } = require('../../helpers/excelHelper');

describe('Excel Data Read Test', () => {
    it('should fetch single and multiple row data', async () => {
        const filePath = path.join(__dirname, '../data/testData.xlsx');
        const sheetName = 'Sheet1';

        const data = readExcelSheet(filePath, sheetName);

        // --- Fetch single row ---
        const row1 = getSingleRow(data, 0);
        console.log('Single Row:', row1);
        // Example output: { TestCase: 'TC001', Username: 'user1', Password: 'pass1', Amount: 5000 }

        // --- Fetch multiple rows ---
        const multipleRows = getMultipleRows(data, 0, 2);
        console.log('Multiple Rows:', multipleRows);
        // Example output: [ {…}, {…}, {…} ]

        // Use data dynamically in your tests
        await browser.url('https://example.com');
        await $('#username').setValue(row1.Username);
        await $('#password').setValue(row1.Password);
        await $('#loginBtn').click();
    });
});