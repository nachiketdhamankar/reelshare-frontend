import React, { useEffect } from 'react';
import { useVideoStore } from '../store/videoStore';
import { useAuthStore } from '../store/authStore';
import { VideoCard } from './VideoCard';
import { LoadingSpinner } from './LoadingSpinner';

export function VideoList() {
  const { user } = useAuthStore();
  const { videos, loading, error, fetchUserVideos } = useVideoStore();

  useEffect(() => {
    if (user) {
      fetchUserVideos(user.uid);
    }
  }, [user, fetchUserVideos]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="bg-red-50 p-4 rounded-md">
        <p className="text-red-700">{error}</p>
      </div>
    );
  }

  if (videos.length === 0) {
    return (
      <div className="bg-gray-50 p-6 text-center rounded-lg">
        <p className="text-gray-600">No videos added yet. Add your first video above!</p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {videos.map((video) => (
        <VideoCard key={video.id} video={video} />
      ))}
    </div>
  );
}