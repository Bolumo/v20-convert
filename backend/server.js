const express = require('express');
const cors = require('cors');
const uploadHandler = require('./handlers/upload');
const reprocessHandler = require('./handlers/reprocess');
const docxHandler = require('./handlers/docx');
const authMiddleware = require('./handlers/authMiddleware');

const app = express();
app.use(cors());
app.use(express.json());

// Protected routes
app.use(authMiddleware);
app.post('/upload', uploadHandler);
app.post('/reprocess', reprocessHandler);
app.post('/docx', docxHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
