import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from '../config/cloudinary.js';
import ApiError from '../utils/ApiError.js';

// Configure Cloudinary storage for audio files
const audioStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'music-cloud/audio',
    resource_type: 'video', // Cloudinary treats audio as video
    format: 'mp3',
    allowed_formats: ['mp3', 'wav', 'aac', 'flac'],
    public_id: (req, file) => {
      const timestamp = Date.now();
      const originalname = file.originalname.replace(/\.[^/.]+$/, "");
      return `audio_${timestamp}_${originalname}`;
    }
  }
});

// Configure Cloudinary storage for images
const imageStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'music-cloud/images',
    allowed_formats: ['jpg', 'jpeg', 'png', 'webp', 'gif'],
    transformation: [{ width: 500, height: 500, crop: 'limit' }],
    public_id: (req, file) => {
      const timestamp = Date.now();
      const originalname = file.originalname.replace(/\.[^/.]+$/, "");
      return `image_${timestamp}_${originalname}`;
    }
  }
});

// File filter for audio
const audioFilter = (req, file, cb) => {
  const allowedTypes = ['audio/mpeg', 'audio/wav', 'audio/aac', 'audio/flac'];
  
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new ApiError(400, 'Invalid file type. Only MP3, WAV, AAC, FLAC are allowed'), false);
  }
};

// File filter for images
const imageFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
  
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new ApiError(400, 'Invalid file type. Only JPEG, PNG, WebP, GIF are allowed'), false);
  }
};

// File size limits (10MB for audio, 5MB for images)
const limits = {
  fileSize: {
    audio: 10 * 1024 * 1024, // 10MB
    image: 5 * 1024 * 1024   // 5MB
  }
};

// Create multer instances
export const uploadAudio = multer({
  storage: audioStorage,
  fileFilter: audioFilter,
  limits: { fileSize: limits.fileSize.audio }
});

export const uploadImage = multer({
  storage: imageStorage,
  fileFilter: imageFilter,
  limits: { fileSize: limits.fileSize.image }
});

// Middleware to handle upload errors
export const handleUploadError = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return next(new ApiError(400, 'File too large'));
    }
    return next(new ApiError(400, err.message));
  }
  next(err);
};