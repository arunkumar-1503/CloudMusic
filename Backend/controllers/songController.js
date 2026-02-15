import Song from '../models/Song.js';
import User from '../models/User.js';
import ApiError from '../utils/ApiError.js';
import ApiResponse from '../utils/ApiResponse.js';
import cloudinary from '../config/cloudinary.js';

// @desc    Upload a song
// @route   POST /api/songs/upload
// @access  Private
export const uploadSong = async (req, res, next) => {
  try {
    const { title, album, genre, lyrics } = req.body;
    const audioFile = req.files?.audio?.[0];
    const imageFile = req.files?.coverImage?.[0];

    if (!audioFile) {
      throw new ApiError(400, 'Audio file is required');
    }

    // Get audio duration (simplified - in production use audio metadata library)
    const audioDuration = 180; // Default 3 minutes - replace with actual extraction

    // Create song
    const song = await Song.create({
      title: title || audioFile.originalname.replace('.mp3', ''),
      artist: req.user._id,
      artistName: req.user.username,
      album: album || 'Single',
      genre: genre || 'other',
      duration: audioDuration,
      audioUrl: audioFile.path,
      audioPublicId: audioFile.filename,
      coverImage: imageFile?.path || 'default-album.jpg',
      coverImagePublicId: imageFile?.filename,
      lyrics
    });

    // Update user role to artist if not already
    if (req.user.role === 'user') {
      await User.findByIdAndUpdate(req.user._id, { role: 'artist' });
    }

    res.status(201).json(
      new ApiResponse(201, { song }, 'Song uploaded successfully')
    );
  } catch (error) {
    // Clean up uploaded files on error
    if (req.files?.audio?.[0]) {
      await cloudinary.uploader.destroy(req.files.audio[0].filename);
    }
    if (req.files?.coverImage?.[0]) {
      await cloudinary.uploader.destroy(req.files.coverImage[0].filename);
    }
    next(error);
  }
};

// @desc    Get all songs with pagination and filtering
// @route   GET /api/songs
// @access  Public
export const getSongs = async (req, res, next) => {
  try {
    const {
      page = 1,
      limit = 20,
      genre,
      artist,
      sortBy = 'createdAt',
      sortOrder = 'desc',
      search
    } = req.query;

    // Build query
    const query = {};
    
    if (genre) query.genre = genre;
    if (artist) query.artist = artist;
    
    if (search) {
      query.$text = { $search: search };
    }

    // Build sort
    const sort = {};
    sort[sortBy] = sortOrder === 'desc' ? -1 : 1;

    // Execute query with pagination
    const skip = (page - 1) * limit;
    
    const songs = await Song.find(query)
      .populate('artist', 'username profilePicture')
      .sort(sort)
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Song.countDocuments(query);

    res.status(200).json(
      new ApiResponse(200, {
        songs,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total,
          pages: Math.ceil(total / limit)
        }
      }, 'Songs retrieved successfully')
    );
  } catch (error) {
    next(error);
  }
};

// @desc    Get single song
// @route   GET /api/songs/:id
// @access  Public
export const getSong = async (req, res, next) => {
  try {
    const song = await Song.findById(req.params.id)
      .populate('artist', 'username profilePicture');

    if (!song) {
      throw new ApiError(404, 'Song not found');
    }

    // Increment play count
    song.plays += 1;
    await song.save();

    res.status(200).json(
      new ApiResponse(200, { song }, 'Song retrieved successfully')
    );
  } catch (error) {
    next(error);
  }
};

// @desc    Like/Unlike a song
// @route   PUT /api/songs/:id/like
// @access  Private
export const toggleLike = async (req, res, next) => {
  try {
    const songId = req.params.id;
    const userId = req.user._id;

    const song = await Song.findById(songId);
    if (!song) {
      throw new ApiError(404, 'Song not found');
    }

    const user = await User.findById(userId);
    const isLiked = user.likedSongs.includes(songId);

    if (isLiked) {
      // Unlike
      user.likedSongs.pull(songId);
      song.likes -= 1;
    } else {
      // Like
      user.likedSongs.push(songId);
      song.likes += 1;
    }

    await Promise.all([user.save(), song.save()]);

    res.status(200).json(
      new ApiResponse(200, { 
        liked: !isLiked, 
        likes: song.likes 
      }, isLiked ? 'Song unliked' : 'Song liked')
    );
  } catch (error) {
    next(error);
  }
};

// @desc    Get user's liked songs
// @route   GET /api/songs/liked
// @access  Private
export const getLikedSongs = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id)
      .populate({
        path: 'likedSongs',
        populate: { path: 'artist', select: 'username profilePicture' }
      });

    res.status(200).json(
      new ApiResponse(200, { songs: user.likedSongs }, 'Liked songs retrieved')
    );
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a song
// @route   DELETE /api/songs/:id
// @access  Private (Artist/Admin only)
export const deleteSong = async (req, res, next) => {
  try {
    const song = await Song.findById(req.params.id);

    if (!song) {
      throw new ApiError(404, 'Song not found');
    }

    // Check ownership or admin
    if (song.artist.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      throw new ApiError(403, 'Not authorized to delete this song');
    }

    // Delete from Cloudinary
    await cloudinary.uploader.destroy(song.audioPublicId, { resource_type: 'video' });
    if (song.coverImagePublicId) {
      await cloudinary.uploader.destroy(song.coverImagePublicId);
    }

    // Remove from users' liked songs
    await User.updateMany(
      { likedSongs: song._id },
      { $pull: { likedSongs: song._id } }
    );

    // Remove from playlists
    await Playlist.updateMany(
      { songs: song._id },
      { $pull: { songs: song._id } }
    );

    await song.remove();

    res.status(200).json(
      new ApiResponse(200, null, 'Song deleted successfully')
    );
  } catch (error) {
    next(error);
  }
};