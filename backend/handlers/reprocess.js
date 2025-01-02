const { processText } = require('../libs/textApi');

module.exports = async (req, res) => {
  try {
    const { template, prompt, text } = req.body;
    const processedText = await processText(template, prompt, text);
    res.json({ processedText });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
