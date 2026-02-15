import express from 'express';
import {
  createPlaylist,
  getMyPlaylists,
  getPlaylist,
  addSongToPlaylist,
  removeSongFromPlaylist,
  deletePlaylist
} from '../controllers/playlistController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(protect);

router.post('/', createPlaylist);
router.get('/my', getMyPlaylists);
router.get('/:id', getPlaylist);
router.put('/:id/add-song', addSongToPlaylist);
router.put('/:id/remove-song', removeSongFromPlaylist);
router.delete('/:id', deletePlaylist);

export default router;