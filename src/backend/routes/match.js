/**
 * @author Huy Le (huyisme-005)
 * @brief This file is responsible for the matching route of clothes.
 */
const express = require('express');
const multer = require('multer');
const axios = require('axios');
const router = express.Router();

// Configure multer for file uploads (memory storage)
const storage = multer.memoryStorage();
const upload = multer({ storage });

/**
 * @route POST /api/match-wardrobe
 * @desc Match uploaded wardrobe image to secondhand items in the selected region
 * @access Public (authentication can be added as needed)
 */
router.post('/match-wardrobe', upload.single('image'), async (req, res) => {
  try {
    const { country, city } = req.body;
    if (!req.file || !country || !city) {
      return res.status(400).json({ error: 'Missing image, country, or city' });
    }

    // Forward the image and region info to the Python service
    const formData = new FormData();
    formData.append('image', req.file.buffer, req.file.originalname);
    formData.append('country', country);
    formData.append('city', city);

    const response = await axios.post('http://127.0.0.1:8000/match', formData, {
      headers: formData.getHeaders(),
      maxContentLength: Infinity,
      maxBodyLength: Infinity
    });

    res.json(response.data);
  } catch (error) {
    console.error('Error matching wardrobe:', error.message);
    res.status(500).json({ error: 'Failed to match wardrobe items' });
  }
});

module.exports = router; 