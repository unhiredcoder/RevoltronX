import express from 'express';
import {
  saveDraft,
  publishBlog,
  getAllBlogs,
  getBlogById,
  deleteBlog
} from '../Controllers/blogController.js';

const router = express.Router();

router.post('/save-draft', saveDraft);
router.post('/publish', publishBlog);
router.get('/', getAllBlogs);
router.get('/:id', getBlogById);
router.delete('/:id',deleteBlog);

export default router;
