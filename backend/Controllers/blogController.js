import Blog from '../models/blog.js';

export const saveDraft = async (req, res) => {
  const { id, title, content, tags } = req.body;
  try {
    let blog;
    if (id) {
      blog = await Blog.findByIdAndUpdate(
        id,
        { title, content, tags, status: 'draft', updated_at: new Date() },
        { new: true }
      );
    } else {
      blog = await Blog.create({ title, content, tags, status: 'draft' });
    }
    res.json(blog);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const publishBlog = async (req, res) => {
  const { id, title, content, tags } = req.body;
  try {
    let blog;
    if (id) {
      blog = await Blog.findByIdAndUpdate(
        id,
        { title, content, tags, status: 'published', updated_at: new Date() },
        { new: true }
      );
    } else {
      blog = await Blog.create({ title, content, tags, status: 'published' });
    }

    res.status(200).json({ success: true, blog });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ updated_at: -1 });
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    res.json(blog);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteBlog = async (req, res) => {
  try {
    await Blog.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
