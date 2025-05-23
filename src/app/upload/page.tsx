'use client';

import { useState, useRef } from 'react';

export default function UploadPage() {
  const [message, setMessage] = useState('');
  const [conversation, setConversation] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const file = fileInputRef.current?.files?.[0];

    if (!file || file.type !== 'application/pdf') {
      setMessage('❌ Only PDF files allowed.');
      setConversation('');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      setIsLoading(true);
      setMessage('');
      setConversation('');

      const res = await fetch('http://localhost:8000/upload', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.detail || 'Upload failed');
      }

      const json = await res.json();
      setMessage(`✅ ${json.detail || 'Upload successful'}`);
      setConversation(json.data?.conversation || '');

      // Clear file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (err: any) {
      setMessage(`❌ ${err.message || 'Upload failed'}`);
      setConversation('');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center px-4 py-10">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-6 rounded space-y-4 w-full max-w-md"
      >
        <h1 className="text-2xl font-bold">Upload a PDF</h1>
        <input
          type="file"
          name="file"
          accept=".pdf"
          ref={fileInputRef}
          className="block w-full text-white"
          onChange={() => {
            setMessage('');
            setConversation('');
          }}
        />
        <button
          type="submit"
          className={`px-4 py-2 rounded w-full ${
            isLoading ? 'bg-gray-600 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
          }`}
          disabled={isLoading}
        >
          {isLoading ? 'Processing...' : 'Upload'}
        </button>
        {message && <p className="mt-2 text-sm text-gray-300">{message}</p>}
      </form>

      {isLoading && (
        <div className="mt-4 text-blue-400 animate-pulse">⏳ Generating conversation...</div>
      )}

      {conversation && (
        <div className="bg-gray-800 p-4 mt-6 w-full max-w-3xl rounded overflow-auto">
          <h2 className="text-xl font-semibold mb-2">Generated Conversation</h2>
          <pre className="whitespace-pre-wrap break-words text-sm">
            {conversation}
          </pre>
        </div>
      )}
    </div>
  );
}
