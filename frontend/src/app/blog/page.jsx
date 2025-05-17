'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { BookOpen, FileText, Clock, Tags, Pencil, LoaderCircleIcon, LoaderIcon, Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import moment from 'moment';

export default function BlogListPage() {
    const router = useRouter();
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchBlogs = async () => {
        try {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/blogs`);
            setBlogs(res.data);
        } catch (err) {
            console.error('Error fetching blogs:', err);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchBlogs();
    }, []);

    const published = blogs.filter(b => b.status === 'published');
    const drafts = blogs.filter(b => b.status === 'draft');


    
    const BlogCard = ({ blog, status }) => {
      const router = useRouter();
    
      const getTextPreview = (html) => {
        if (!html) return '';
        return html.length > 300 ? html.slice(0, 300) + '...' : html;
      };
    
      return (
        <div className="transition-transform duration-200 hover:scale-[1.02]">
          <div className="relative h-full flex flex-col justify-between p-6 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-lg shadow-sm hover:shadow-md transition">
    
            {/* Header */}
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xl font-bold text-zinc-800 dark:text-white">
                {blog.title || 'Untitled'}
              </h3>
              <span
                className={`text-sm px-3 py-1 rounded-full ${
                  status === 'published'
                    ? 'bg-green-100 text-green-700'
                    : 'bg-yellow-100 text-yellow-700'
                }`}
              >
                {status === 'published' ? 'Published' : 'Draft'}
              </span>
            </div>
    
            {/* Content */}
            <div
              className="text-zinc-600 dark:text-zinc-300 mb-3 line-clamp-3 prose prose-sm max-w-none dark:prose-invert"
              dangerouslySetInnerHTML={{ __html: getTextPreview(blog.content) }}
            />
    
            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-3 mt-auto">
              {blog.tags?.map((tag, idx) => (
                <span
                  key={idx}
                  className="flex items-center gap-1 capitalize px-2 py-1 bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-100 text-xs rounded"
                >
                  <Tags className="w-3 h-3" /> {tag}
                </span>
              ))}
            </div>
    
            {/* Footer */}
            <div className="flex items-center justify-between text-sm text-zinc-500 dark:text-zinc-400">
              <div className="flex items-center gap-2">
                Last updated on {moment(blog.updated_at).format('D MMM YYYY, h:mm A')}
              </div>
    
              {/* Edit button inside bottom right */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  router.push(`/editor?id=${blog._id}`);
                }}
                className="flex items-center justify-center  cursor-pointer  transition shadow"
                title="Edit Blog"
              >Edit&nbsp;<Pencil className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>
      );
    };
    



    return (
        <div className="max-w-5xl mx-auto px-6 py-10">
          <div className='flex items-start justify-between mb-8'>

            <h1 className="text-3xl  font-bold text-zinc-800 dark:text-white mb-8">🗂️RevoltronX Blog Library</h1>
            <button
      onClick={() => router.push('/editor')}
      className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded shadow transition"
      >
      <Plus className="w-4 h-4" />
      Create New Blog
    </button>
      </div>
            {loading ? (
                <p className="flex justify-center item-center text-zinc-500 dark:text-zinc-400"><LoaderIcon className='animate animate-spin'/> </p>
            ) : (
                <>
                    <section className="mb-12">
                        <h2 className="text-2xl font-semibold text-zinc-700 dark:text-zinc-200 mb-4 flex items-center gap-2">
                            <BookOpen className="w-5 h-5" /> Published Blogs
                        </h2>
                        {published.length ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {published.map(blog => (
                                    <BlogCard key={blog._id} blog={blog} status="published" />
                                ))}
                            </div>
                        ) : (
                            <p className="text-zinc-500 dark:text-zinc-400 italic">No published blogs yet.</p>
                        )}
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-zinc-700 dark:text-zinc-200 mb-4 flex items-center gap-2">
                            <FileText className="w-5 h-5" /> Drafts
                        </h2>
                        {drafts.length ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {drafts.map(blog => (
                                    <BlogCard key={blog._id} blog={blog} status="draft" />
                                ))}
                            </div>
                        ) : (
                            <p className="text-zinc-500 dark:text-zinc-400 italic">No drafts saved yet.</p>
                        )}
                    </section>
                </>
            )}
        </div>
    );
}
