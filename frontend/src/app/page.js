'use client';

import { useRouter } from 'next/navigation';
import { Rocket, Edit, FileText, Save } from 'lucide-react';
import { useEffect } from 'react';

export default function HomePage() {
  const router = useRouter();
    useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <main className="h-screen w-full bg-gradient-to-br from-zinc-900 to-zinc-800 text-white flex flex-col justify-center items-center px-6">
      <div className="max-w-4xl text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight leading-tight">
          Welcome to <span className="text-blue-500">RevoltronX</span><br />
          Your Smart Blog Editor
        </h1>
        <p className="text-lg md:text-xl text-zinc-300 mb-10">
          Auto-save your thoughts. Publish your ideas. Minimal effort, maximum impact.
        </p>

        <button
          onClick={() => router.push('/blog')}
          className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-lg transition"
        >
          🚀 Start Writing
        </button>
      </div>

      {/* Features */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20 w-full max-w-5xl px-4">
        <FeatureCard
          icon={<Edit className="w-6 h-6 text-blue-400" />}
          title="Rich Text Editor"
          description="Write beautiful content with real-time formatting."
        />
        <FeatureCard
          icon={<Save className="w-6 h-6 text-green-400" />}
          title="Auto-Save Drafts"
          description="Never lose a word — your work is saved as you type."
        />
        <FeatureCard
          icon={<FileText className="w-6 h-6 text-yellow-400" />}
          title="One-Click Publish"
          description="Send your blog live in a single click. It’s that easy."
        />
      </section>
    </main>
  );
}

function FeatureCard({ icon, title, description }) {
  return (
    <div className="bg-zinc-800 border border-zinc-700 rounded-xl p-6 text-center shadow-md hover:shadow-lg transition">
      <div className="flex justify-center mb-3">{icon}</div>
      <h3 className="text-lg font-semibold text-white mb-1">{title}</h3>
      <p className="text-sm text-zinc-400">{description}</p>
    </div>
  );
}
