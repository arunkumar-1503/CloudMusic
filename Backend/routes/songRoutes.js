import express from 'express';
import {
  uploadSong,
  getSongs,
  getSong,
  toggleLike,
  getLikedSongs,
  deleteSong
} from '../controllers/songController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';
import { uploadAudio, uploadImage, handleUploadError } from '../middleware/uploadMiddleware.js';

const router = express.Router();

// Public routes
router.get('/', getSongs);
router.get('/:id', getSong);

// Protected routes
router.use(protect);

router.get('/liked', getLikedSongs);
router.put('/:id/like', toggleLike);

// Artist/Admin routes
router.post('/upload', 
  authorize('artist', 'admin'),
  uploadAudio.fields([
    { name: 'audio', maxCount: 1 },
    { name: 'coverImage', maxCount: 1 }
  ]),
  handleUploadError,
  uploadSong
);

router.delete('/:id', 
  authorize('artist', 'admin'),
  deleteSong
);

export default router;