const express = require('express');
const multer = require('multer');
const pdfParse = require('pdf-parse');
const mammoth = require('mammoth');
const xlsx = require('xlsx');
const Project = require('../models/project');

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

const parseFile = async (file) => {
  const { buffer, mimetype } = file;
  if (mimetype === 'application/pdf') {
    const data = await pdfParse(buffer);
    return data.text;
  } else if (mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
    const result = await mammoth.extractRawText({ buffer });
    return result.value;
  } else if (mimetype === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
    const workbook = xlsx.read(buffer, { type: 'buffer' });
    let text = '';
    workbook.SheetNames.forEach((sheet) => {
      text += xlsx.utils.sheet_to_csv(workbook.Sheets[sheet]);
    });
    return text;
  }
  return null;
};

router.post('/upload', upload.single('file'), async (req, res) => {
  const { projectId, title } = req.body;
  const fileContent = await parseFile(req.file);
  if (fileContent) {
    await Project.updateOne(
      { _id: projectId },
      {
        $push: {
          knowledgebase: {
            title,
            content: fileContent,
            type: req.file.mimetype,
            file: { data: req.file.buffer, contentType: req.file.mimetype },
          },
        },
      }
    );
    res.send({ success: true });
  } else {
    res.status(400).send({ error: 'Unsupported file type or parsing failed' });
  }
});

module.exports = router;