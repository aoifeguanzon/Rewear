/*
file SharedWardrobes.tsx
author Isaac Mulugeta

brief This is the "Shared Wardrobes" sub-page component for the profile.
*/
import React from 'react';
import { Info } from 'lucide-react';

const SharedWardrobes = () => {
  // Generate shared wardrobe items for the grid
  const sharedWardrobes = Array(8).fill(null).map((_, i) => ({
    id: i,
    username: 'Username',
    items: 8
  }));

  const WardrobeCard = ({ username, items }) => (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden">
      <div className="aspect-square bg-gray-100 flex items-center justify-center relative">
        {/* Placeholder X pattern */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 border-2 border-gray-300">
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <line x1="0" y1="0" x2="100" y2="100" stroke="currentColor" strokeWidth="2"/>
              <line x1="100" y1="0" x2="0" y2="100" stroke="currentColor" strokeWidth="2"/>
            </svg>
          </div>
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="font-medium text-gray-900">{username}</div>
            <div className="text-sm text-gray-500">{items} items</div>
          </div>
          <div className="w-4 h-4 bg-gray-400 rounded-full flex items-center justify-center">
            <Info className="w-3 h-3 text-white" />
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex items-center justify-between max-w-6xl mx-auto">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
              <div className="w-4 h-4 bg-white rounded-sm"></div>
            </div>
            <span className="text-xl font-bold text-gray-900">ReWear</span>
          </div>
          <nav className="flex space-x-6">
            <a href="#" className="text-gray-600 hover:text-gray-900 text-sm font-medium">Home</a>
            <a href="#" className="text-gray-900 text-sm font-medium">Profile</a>
            <a href="#" className="text-gray-600 hover:text-gray-900 text-sm font-medium">Social</a>
            <a href="#" className="text-gray-600 hover:text-gray-900 text-sm font-medium">Settings</a>
          </nav>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="space-y-8">
          {/* Header */}
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Shared Wardrobes</h1>
          </div>

          {/* Wardrobes Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {sharedWardrobes.map((wardrobe) => (
              <WardrobeCard 
                key={wardrobe.id}
                username={wardrobe.username}
                items={wardrobe.items}
              />
            ))}
          </div>

          {/* Stats Section */}
          <div className="bg-white rounded-lg p-8 shadow-sm border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Stats</h2>
            <div className="space-y-3 text-center">
              <p className="text-gray-700">You bought <span className="font-semibold">0</span> secondhand items</p>
              <p className="text-gray-700">You sold <span className="font-semibold">0</span> items</p>
              <p className="text-gray-700">You borrowed <span className="font-semibold">0</span> items from <span className="font-semibold">0</span> wardrobes</p>
              <p className="text-gray-700">You rented <span className="font-semibold">0</span> items from <span className="font-semibold">0</span> wardrobes</p>
              <p className="text-gray-700">You swapped <span className="font-semibold">0</span> items from <span className="font-semibold">0</span> wardrobes</p>
            </div>
            <div className="mt-6 text-center">
              <p className="text-lg font-medium text-gray-900">Keep it up!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SharedWardrobes;