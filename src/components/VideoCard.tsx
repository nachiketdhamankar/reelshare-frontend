import React from 'react';
import { Video } from '../types/video';
import { Youtube, Instagram, MessageSquare } from 'lucide-react';

interface VideoCardProps {
  video: Video;
}

export function VideoCard({ video }: VideoCardProps) {
  const getPlatformIcon = () => {
    switch (video.platform) {
      case 'youtube':
        return <Youtube className="h-5 w-5 text-red-600" />;
      case 'instagram':
        return <Instagram className="h-5 w-5 text-pink-600" />;
      default:
        return null;
    }
  };

  const getStatusBadge = () => {
    const statusColors = {
      pending: 'bg-yellow-100 text-yellow-800',
      transcribing: 'bg-blue-100 text-blue-800',
      completed: 'bg-green-100 text-green-800',
      error: 'bg-red-100 text-red-800',
    };

    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[video.status]}`}>
        {video.status}
      </span>
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          {getPlatformIcon()}
          {getStatusBadge()}
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          {video.title || 'Processing...'}
        </h3>
        <div className="flex items-center text-sm text-gray-500">
          <MessageSquare className="h-4 w-4 mr-1" />
          {video.transcription ? 'Transcription available' : 'Awaiting transcription'}
        </div>
      </div>
      <div className="px-4 py-3 bg-gray-50">
        <a
          href={video.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-indigo-600 hover:text-indigo-500"
        >
          View original video →
        </a>
      </div>
    </div>
  );
}