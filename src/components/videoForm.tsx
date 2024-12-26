import React, { useState } from 'react';
import { useAuthStore } from '../store/authStore';
import { useVideoStore } from '../store/videoStore';
import { validateVideoUrl } from '../utils/videoUtils';
import { Link } from 'lucide-react';

export function VideoForm() {
  const [url, setUrl] = useState('');
  const [isValid, setIsValid] = useState(true);
  const { user } = useAuthStore();
  const { addVideo, loading, error } = useVideoStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !validateVideoUrl(url)) {
      setIsValid(false);
      return;
    }

    await addVideo(url, user.uid);
    setUrl('');
    setIsValid(true);
  };

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newUrl = e.target.value;
    setUrl(newUrl);
    setIsValid(true);
  };

  return (
    <div className="bg-white shadow sm:rounded-lg p-6 mb-6">
      <div className="flex items-center mb-4">
        <Link className="h-5 w-5 text-indigo-600 mr-2" />
        <h2 className="text-xl font-semibold text-gray-900">Add New Video</h2>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="videoUrl" className="block text-sm font-medium text-gray-700">
            Video URL
          </label>
          <div className="mt-1">
            <input
              type="url"
              id="videoUrl"
              value={url}
              onChange={handleUrlChange}
              placeholder="Paste YouTube Short, Instagram Reel, or TikTok URL"
              className={`block w-full rounded-md shadow-sm ${
                !isValid ? 'border-red-300' : 'border-gray-300'
              } focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm`}
            />
          </div>
          {!isValid && (
            <p className="mt-1 text-sm text-red-600">
              Please enter a valid YouTube Short, Instagram Reel, or TikTok URL
            </p>
          )}
          {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
        </div>
        <button
          type="submit"
          disabled={loading || !url}
          className={`inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
            loading || !url ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {loading ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
              Processing...
            </>
          ) : (
            'Add Video'
          )}
        </button>
      </form>
    </div>
  );
}