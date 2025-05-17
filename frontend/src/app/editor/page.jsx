'use client';

import { useEffect, useState, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import dynamic from 'next/dynamic';
import { Loader2, Save, UploadCloud } from 'lucide-react';


const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false });
import 'react-quill-new/dist/quill.snow.css';

import RichTextEditor from '@/components/RichTextEditor';

export default function BlogEditorPage() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [tags, setTags] = useState('');
    const [blogId, setBlogId] = useState(null);
    const [saving, setSaving] = useState(false);

    const searchParams = useSearchParams();
    const id = searchParams.get('id');
    const timerRef = useRef(null);
    const router = useRouter();

    // Fetch blog if editing
    useEffect(() => {
        if (id) {
            axios
                .get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/blogs/${id}`)
                .then(res => {
                    const b = res.data;
                    setTitle(b.title || '');
                    setContent(b.content || '');
                    setTags(b.tags?.join(', ') || '');
                    setBlogId(b._id);
                })
                .catch(() => toast.error('Failed to load blog'));
        }
    }, [id]);

    const handleSaveDraft = async () => {
        setSaving(true);
        const toastId = toast.loading('Saving draft...');
        try {
            const res = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/blogs/save-draft`, {
                id: blogId,
                title,
                content,
                tags: tags.split(',').map(tag => tag.trim()).filter(Boolean),
            });
            setBlogId(res.data._id);
            toast.success('Draft saved', { id: toastId });
        } catch {
            toast.error('Error saving draft', { id: toastId });
        } finally {
            setSaving(false);
        }
    };

    const handlePublish = async () => {
        const toastId = toast.loading('Publishing...');
        try {
            await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/blogs/publish`, {
                id: blogId,
                title,
                content,
                tags: tags.split(',').map(tag => tag.trim()).filter(Boolean),
            });
            toast.success('Published successfully!', { id: toastId });
            router.push('/blog');
        } catch {
            toast.error('Error publishing', { id: toastId });
        }
    };

    // Auto-save on inactivity
    useEffect(() => {
        if (timerRef.current) clearTimeout(timerRef.current);
        timerRef.current = setTimeout(() => {
            if (title.trim() || content.trim()) {
                handleSaveDraft();
            }
        }, 5000);
        return () => clearTimeout(timerRef.current);
    }, [title, content, tags]);

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white dark:bg-zinc-900 shadow-xl rounded-lg border border-zinc-200 dark:border-zinc-800">
            <Toaster position="top-right" />
            <h1 className="text-3xl font-extrabold mb-8 text-zinc-800 dark:text-white tracking-tight">
                {blogId ? '✏️ Edit Blog' : '✍️ Create Blog'}
            </h1>

            <div className="space-y-6">
                <input
                    type="text"
                    placeholder="Enter blog title..."
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full text-lg px-4 py-3 rounded border border-zinc-300 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <RichTextEditor value={content} onChange={setContent} />


                <input
                    type="text"
                    placeholder="Tags (comma separated)"
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                    className="w-full text-md px-4 py-3 rounded border border-zinc-300 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <div className="flex gap-4 justify-end">
                    <button
                        onClick={handleSaveDraft}
                        disabled={saving}
                        className="inline-flex items-center gap-2 px-5 py-2 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold rounded transition"
                    >
                        {saving ? <Loader2 className="animate-spin w-4 h-4" /> : <Save className="w-4 h-4" />}
                        Save Draft
                    </button>
                    <button
                        onClick={handlePublish}
                        className="inline-flex items-center gap-2 px-5 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded transition"
                    >
                        <UploadCloud className="w-4 h-4" />
                        Publish
                    </button>
                </div>
            </div>
        </div>
    );
}
