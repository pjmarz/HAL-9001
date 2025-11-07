const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Bottle = require('../models/Bottle');
const { analyzeBottleImage } = require('../services/openaiService');

const router = express.Router();

// Configure multer for file uploads
const uploadDir = path.join(__dirname, '../../uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'bottle-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|webp/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (extname && mimetype) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed (jpeg, jpg, png, gif, webp)'));
    }
  }
});

/**
 * POST /api/bottles/identify
 * Upload an image and analyze it with OpenAI
 */
router.post('/identify', upload.single('image'), async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: { message: 'No image file provided' } });
    }

    const imagePath = req.file.path;
    
    try {
      // Analyze the image
      const bottleData = await analyzeBottleImage(imagePath);
      
      // Store image URL (relative path)
      bottleData.image_url = `/uploads/${req.file.filename}`;

      // Clean up: delete the temporary file after analysis
      // (In production, you might want to keep it or upload to cloud storage)
      // fs.unlinkSync(imagePath);

      res.json({
        success: true,
        data: bottleData
      });
    } catch (analysisError) {
      // Clean up file on error
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
      throw analysisError;
    }
  } catch (error) {
    next(error);
  }
});

/**
 * POST /api/bottles
 * Add a new bottle to the database
 */
router.post('/', async (req, res, next) => {
  try {
    const { name, maker, abv, msrp, image_url } = req.body;

    // Validation
    if (!name || !maker) {
      return res.status(400).json({
        error: { message: 'Name and maker are required fields' }
      });
    }

    const bottleData = {
      name: name.trim(),
      maker: maker.trim(),
      abv: abv ? parseFloat(abv) : null,
      msrp: msrp ? parseFloat(msrp) : null,
      image_url: image_url || null
    };

    const bottle = await Bottle.create(bottleData);
    res.status(201).json({
      success: true,
      data: bottle
    });
  } catch (error) {
    next(error);
  }
});

/**
 * GET /api/bottles
 * Get all bottles
 */
router.get('/', async (req, res, next) => {
  try {
    const bottles = await Bottle.getAll();
    res.json({
      success: true,
      data: bottles,
      count: bottles.length
    });
  } catch (error) {
    next(error);
  }
});

/**
 * GET /api/bottles/:id
 * Get a specific bottle by ID
 */
router.get('/:id', async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({
        error: { message: 'Invalid bottle ID' }
      });
    }

    const bottle = await Bottle.getById(id);
    res.json({
      success: true,
      data: bottle
    });
  } catch (error) {
    if (error.message === 'Bottle not found') {
      return res.status(404).json({
        error: { message: 'Bottle not found' }
      });
    }
    next(error);
  }
});

/**
 * DELETE /api/bottles/:id
 * Remove a bottle from the database
 */
router.delete('/:id', async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({
        error: { message: 'Invalid bottle ID' }
      });
    }

    const result = await Bottle.delete(id);
    res.json({
      success: true,
      data: result,
      message: 'Bottle successfully removed'
    });
  } catch (error) {
    if (error.message === 'Bottle not found') {
      return res.status(404).json({
        error: { message: 'Bottle not found' }
      });
    }
    next(error);
  }
});

module.exports = router;

