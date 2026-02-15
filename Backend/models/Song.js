import mongoose from 'mongoose';

const songSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Song title is required'],
      trim: true,
      maxlength: [100, 'Title cannot exceed 100 characters']
    },
    artist: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    artistName: {
      type: String,
      required: true
    },
    album: {
      type: String,
      trim: true,
      default: 'Single'
    },
    genre: {
      type: String,
      enum: ['pop', 'rock', 'jazz', 'classical', 'hiphop', 'electronic', 'rnb', 'country', 'other'],
      default: 'other'
    },
    duration: {
      type: Number, // in seconds
      required: true
    },
    audioUrl: {
      type: String,
      required: true
    },
    audioPublicId: {
      type: String, // Cloudinary public ID
      required: true
    },
    coverImage: {
      type: String,
      default: 'default-album.jpg'
    },
    coverImagePublicId: {
      type: String
    },
    plays: {
      type: Number,
      default: 0
    },
    likes: {
      type: Number,
      default: 0
    },
    lyrics: {
      type: String,
      trim: true
    },
    releaseDate: {
      type: Date,
      default: Date.now
    }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// Indexes for search and sorting
songSchema.index({ title: 'text', artistName: 'text', album: 'text' });
songSchema.index({ createdAt: -1 });
songSchema.index({ likes: -1 });
songSchema.index({ plays: -1 });
songSchema.index({ genre: 1 });

// Virtual for formatted duration
songSchema.virtual('durationFormatted').get(function() {
  const minutes = Math.floor(this.duration / 60);
  const seconds = this.duration % 60;
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
});

const Song = mongoose.model('Song', songSchema);

export default Song;