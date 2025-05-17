import './globals.css';

export const metadata = {
  title: 'Blog Editor',
  description: 'Create and manage blog posts with auto-save',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>Blog Editor</title>
      </head>
      <body className="bg-white text-black dark:bg-black dark:text-white">
        <main className="min-h-screen py-10">
          {children}
        </main>
      </body>
    </html>
  );
}
