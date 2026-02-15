import mongoose from 'mongoose';
import User from './User.js';
const playlistSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Playlist name is required'],
      trim: true,
      maxlength: [100, 'Name cannot exceed 100 characters']
    },
    description: {
      type: String,
      trim: true,
      maxlength: [500, 'Description cannot exceed 500 characters']
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    songs: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Song'
    }],
    coverImage: {
      type: String,
      default: 'default-playlist.jpg'
    },
    isPublic: {
      type: Boolean,
      default: true
    },
    likes: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// Indexes
playlistSchema.index({ owner: 1 });
playlistSchema.index({ createdAt: -1 });
playlistSchema.index({ isPublic: 1 });

// Virtual for song count
playlistSchema.virtual('songCount').get(function() {
  return this.songs.length;
});

// Virtual for total duration (requires population)
playlistSchema.virtual('totalDuration').get(function() {
  if (!this.songs || !Array.isArray(this.songs)) return 0;
  
  return this.songs.reduce((total, song) => {
    return total + (song.duration || 0);
  }, 0);
});

// Middleware to update playlist when songs are added/removed
playlistSchema.pre('save', function(next) {
  // Update likes count if needed
  if (this.isModified('likes') && this.likes < 0) {
    this.likes = 0;
  }
  next();
});

const Playlist = mongoose.model('Playlist', playlistSchema);

export default Playlist;