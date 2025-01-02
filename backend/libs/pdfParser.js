const pdfParse = require('pdf-parse');
const tesseract = require('tesseract.js');

async function extractTextFromPDF(pdfBuffer) {
  try {
    // Try pdf-parse first
    const result = await pdfParse(pdfBuffer);
    if (result.text.trim()) {
      return result.text;
    }
    
    // Fallback to OCR if no text found
    const { data: { text } } = await tesseract.recognize(pdfBuffer);
    return text;
  } catch (error) {
    throw new Error('Failed to extract text from PDF');
  }
}
