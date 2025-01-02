const { convertToDocx } = require('../libs/htmlToDocx');

module.exports = async (req, res) => {
  try {
    const { html } = req.body;
    const docx = await convertToDocx(html);
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
    res.setHeader('Content-Disposition', 'attachment; filename=cv.docx');
    res.send(docx);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
