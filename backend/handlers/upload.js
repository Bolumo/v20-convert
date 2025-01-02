const { extractTextFromPDF } = require('../libs/pdfParser');

module.exports = async (req, res) => {
  try {
    // PDF handling logic here
    const text = await extractTextFromPDF(req.files.pdf);
    res.json({ text });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
