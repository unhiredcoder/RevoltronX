import mongoose from 'mongoose';

const BlogSchema = new mongoose.Schema({
  title: String,
  content: String,
  tags: [String],
  status: {
    type: String,
    enum: ['draft', 'published'],
    default: 'draft',
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
});

const Blog = mongoose.model('Blog', BlogSchema);
export default Blog;
