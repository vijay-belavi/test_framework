const XLSX = require('xlsx');

/**
 * Reads an Excel sheet and returns data as JSON (array of objects)
 * @param {string} filePath - Path to the Excel file
 * @param {string} sheetName - Sheet name to read
 */
function readExcelSheet(filePath, sheetName) {
    const workbook = XLSX.readFile(filePath);
    const sheet = workbook.Sheets[sheetName];
    if (!sheet) throw new Error(`Sheet "${sheetName}" not found in ${filePath}`);

    const data = XLSX.utils.sheet_to_json(sheet, { defval: '' });
    return data;
}

/**
 * Fetch a single row of data (by index or key)
 * @param {Array} sheetData - Data from readExcelSheet
 * @param {number} rowIndex - Row number (0-based)
 */
function getSingleRow(sheetData, rowIndex = 0) {
    if (rowIndex >= sheetData.length) throw new Error(`Row ${rowIndex} not found`);
    return sheetData[rowIndex]; // Returns {key: value, key2: value2}
}

/**
 * Fetch multiple rows of data (as array of key-value objects)
 * @param {Array} sheetData - Data from readExcelSheet
 * @param {number} startIndex - Starting row index
 * @param {number} endIndex - Ending row index (inclusive)
 */
function getMultipleRows(sheetData, startIndex, endIndex) {
    return sheetData.slice(startIndex, endIndex + 1);
}

module.exports = {
    readExcelSheet,
    getSingleRow,
    getMultipleRows
};