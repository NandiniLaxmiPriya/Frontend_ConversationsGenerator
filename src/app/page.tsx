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

      if (fileInputRef.current) fileInputRef.current.value = '';
    } catch (err: any) {
      setMessage(`❌ ${err.message || 'Upload failed'}`);
      setConversation('');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full px-4 py-40 text-white overflow-auto">
        <div className="absolute inset-0 -z-10 bg-conversation bg-cover bg-no-repeat bg-center animate-scroll-bg opacity-15" />
      <div className="max-w-4xl mx-auto flex flex-col gap-10 items-center">
        {/* Upload Form */}
       <h1 className="text-3xl md:text-3xl font-bold text-center text-white backdrop-blur-md rounded-xl shadow-xl p-8 space-y-8">
  LLM-Powered Comprehension: Personalized Learning from Conversations in Regional Language</h1>
 <p className="text-3xl md:text-3xl font-bold text-center text-white mt-4 animate-pulse">
  Convert your PDF into more engaging conversations in one click!
</p>

        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md bg-black/10 backdrop-blur-md rounded-xl shadow-xl p-8 space-y-8"
        >
          <h1 className="text-3xl font-bold text-center text-white">Upload a PDF</h1>

          <input
            type="file"
            name="file"
            accept=".pdf"
            ref={fileInputRef}
            className="block w-full text-sm text-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700 cursor-pointer"
            onChange={() => {
              setMessage('');
              setConversation('');
            }}
          />

          <button
            type="submit"
            className={`w-full py-2 px-4 rounded-lg font-semibold text-white ${
              isLoading
                ? 'bg-gray-500 cursor-not-allowed'
                : 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700'
            } transition-all duration-200`}
            disabled={isLoading}
          >
            {isLoading ? 'Processing...' : 'Upload'}
          </button>

          {message && <p className="text-sm text-center">{message}</p>}
        </form>

        {/* Loading Text */}
        {isLoading && (
          <div className="text-blue-300 animate-pulse">⏳ Generating conversation...</div>
        )}

        {/* Output */}
        {conversation && (
          <div className="w-full bg-white/10 backdrop-blur-md rounded-xl p-6 overflow-auto">
            <h2 className="text-xl font-semibold mb-4">🗣️ Generated Conversation</h2>
            <pre className="whitespace-pre-wrap break-words text-sm text-white">
              {conversation}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}
