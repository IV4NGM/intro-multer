const { Router } = require('express');
const fs = require('fs').promises;
const path = require('path');

const router = Router();

router.delete('/:filename', async (req, res) => {
  const filenameToDelete = req.params.filename;
  const filePath = path.join('uploads', filenameToDelete);

  try {
    // Check if the file exists
    await fs.access(filePath, fs.constants.F_OK);

    // If the file exists, delete it
    await fs.unlink(filePath);

    res.status(200).json({ message: 'File deleted successfully!' });
  } catch (error) {
    // Handle errors (e.g., file not found)
    res.status(404).json({ error: 'File not found or could not be deleted.' });
  }
})

module.exports = router;