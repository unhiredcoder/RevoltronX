'use client';

import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';

export default function RichTextEditor({ value, onChange }) {
  return (
    <ReactQuill
      theme="snow"
      value={value}
      onChange={onChange}
      className="bg-white  dark:bg-zinc-800 text-black dark:text-white rounded"
    />
  );
}
