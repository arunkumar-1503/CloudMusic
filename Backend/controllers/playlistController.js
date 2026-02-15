import Playlist from '../models/Playlist.js';
import Song from '../models/Song.js';
import ApiError from '../utils/ApiError.js';
import ApiResponse from '../utils/ApiResponse.js';

// @desc    Create a playlist
// @route   POST /api/playlists
// @access  Private
export const createPlaylist = async (req, res, next) => {
  try {
    const { name, description, isPublic, coverImage } = req.body;

    const playlist = await Playlist.create({
      name,
      description,
      owner: req.user._id,
      isPublic: isPublic !== undefined ? isPublic : true,
      coverImage
    });

    // Add playlist to user's playlists
    await User.findByIdAndUpdate(req.user._id, {
      $push: { playlists: playlist._id }
    });

    res.status(201).json(
      new ApiResponse(201, { playlist }, 'Playlist created successfully')
    );
  } catch (error) {
    next(error);
  }
};

// @desc    Get user's playlists
// @route   GET /api/playlists/my
// @access  Private
export const getMyPlaylists = async (req, res, next) => {
  try {
    const playlists = await Playlist.find({ owner: req.user._id })
      .populate('songs')
      .sort({ createdAt: -1 });

    res.status(200).json(
      new ApiResponse(200, { playlists }, 'Playlists retrieved')
    );
  } catch (error) {
    next(error);
  }
};

// @desc    Get playlist by ID
// @route   GET /api/playlists/:id
// @access  Public (if public) / Private
export const getPlaylist = async (req, res, next) => {
  try {
    const playlist = await Playlist.findById(req.params.id)
      .populate('owner', 'username profilePicture')
      .populate('songs');

    if (!playlist) {
      throw new ApiError(404, 'Playlist not found');
    }

    // Check if playlist is public or user is owner
    if (!playlist.isPublic && playlist.owner._id.toString() !== req.user?._id?.toString()) {
      throw new ApiError(403, 'Not authorized to access this playlist');
    }

    res.status(200).json(
      new ApiResponse(200, { playlist }, 'Playlist retrieved')
    );
  } catch (error) {
    next(error);
  }
};

// @desc    Add song to playlist
// @route   PUT /api/playlists/:id/add-song
// @access  Private
export const addSongToPlaylist = async (req, res, next) => {
  try {
    const { songId } = req.body;
    
    if (!songId) {
      throw new ApiError(400, 'Song ID is required');
    }

    const playlist = await Playlist.findById(req.params.id);
    const song = await Song.findById(songId);

    if (!playlist) {
      throw new ApiError(404, 'Playlist not found');
    }
    if (!song) {
      throw new ApiError(404, 'Song not found');
    }

    // Check ownership
    if (playlist.owner.toString() !== req.user._id.toString()) {
      throw new ApiError(403, 'Not authorized to modify this playlist');
    }

    // Check if song already in playlist
    if (playlist.songs.includes(songId)) {
      throw new ApiError(400, 'Song already in playlist');
    }

    playlist.songs.push(songId);
    await playlist.save();

    res.status(200).json(
      new ApiResponse(200, { playlist }, 'Song added to playlist')
    );
  } catch (error) {
    next(error);
  }
};

// @desc    Remove song from playlist
// @route   PUT /api/playlists/:id/remove-song
// @access  Private
export const removeSongFromPlaylist = async (req, res, next) => {
  try {
    const { songId } = req.body;
    
    if (!songId) {
      throw new ApiError(400, 'Song ID is required');
    }

    const playlist = await Playlist.findById(req.params.id);

    if (!playlist) {
      throw new ApiError(404, 'Playlist not found');
    }

    // Check ownership
    if (playlist.owner.toString() !== req.user._id.toString()) {
      throw new ApiError(403, 'Not authorized to modify this playlist');
    }

    playlist.songs.pull(songId);
    await playlist.save();

    res.status(200).json(
      new ApiResponse(200, { playlist }, 'Song removed from playlist')
    );
  } catch (error) {
    next(error);
  }
};

// @desc    Delete playlist
// @route   DELETE /api/playlists/:id
// @access  Private
export const deletePlaylist = async (req, res, next) => {
  try {
    const playlist = await Playlist.findById(req.params.id);

    if (!playlist) {
      throw new ApiError(404, 'Playlist not found');
    }

    // Check ownership
    if (playlist.owner.toString() !== req.user._id.toString()) {
      throw new ApiError(403, 'Not authorized to delete this playlist');
    }

    // Remove from user's playlists
    await User.findByIdAndUpdate(req.user._id, {
      $pull: { playlists: playlist._id }
    });

    await playlist.remove();

    res.status(200).json(
      new ApiResponse(200, null, 'Playlist deleted successfully')
    );
  } catch (error) {
    next(error);
  }
};