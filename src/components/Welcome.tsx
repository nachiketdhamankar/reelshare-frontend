import React from 'react';
import { User } from 'firebase/auth';
import { VideoForm } from './videoForm';
import { VideoList } from './VideoList';

interface WelcomeProps {
  user: User | null;
}

export function Welcome({ user }: WelcomeProps) {
  if (user) {
    return (
      <>
        <div className="bg-white shadow sm:rounded-lg p-6 mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Welcome, {user.displayName}!
          </h2>
          <p className="text-gray-600">
            Start by pasting a video link to transcribe and search through your collection.
          </p>
        </div>
        <VideoForm />
        <div className="mt-6">
          <VideoList />
        </div>
      </>
    );
  }

  return (
    <div className="bg-white shadow sm:rounded-lg p-6 text-center">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">
        Welcome to ReelSearch
      </h2>
      <p className="text-gray-600">
        Sign in with Google to start transcribing and searching your video collection.
      </p>
    </div>
  );
}