const htmlToDocx = require('html-to-docx');

async function convertToDocx(html) {
  try {
    const buffer = await htmlToDocx(html, {
      margins: {
        top: 2.54,
        right: 2.54,
        bottom: 2.54,
        left: 2.54
      }
    });
    return buffer;
  } catch (error) {
    throw new Error('Failed to convert HTML to DOCX');
  }
}

module.exports = {
  convertToDocx
};
