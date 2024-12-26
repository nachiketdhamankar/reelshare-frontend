import React from 'react';
import { useAuthStore } from '../store/authStore';
import { LogIn, LogOut, Film, User } from 'lucide-react';

export function Navbar() {
  const { user, signIn, signOut } = useAuthStore();

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Film className="h-8 w-8 text-indigo-600" />
            <span className="ml-2 text-xl font-bold text-gray-900">ReelSearch</span>
          </div>
          <div className="flex items-center">
            {user ? (
              <div className="flex items-center space-x-4">
                <img
                  src={user.photoURL || ''}
                  alt={user.displayName || 'User'}
                  className="h-8 w-8 rounded-full"
                />
                <button
                  onClick={() => signOut()}
                  className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </button>
              </div>
            ) : (
              <button
                onClick={() => signIn()}
                className="flex items-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
              >
                <LogIn className="h-4 w-4 mr-2" />
                Sign In with Google
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}