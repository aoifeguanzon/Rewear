/*
file Profile.tsx
author Isaac Mulugeta

brief This is the profile page for the user.
*/
import React from 'react';
import { ChevronRight, ChevronLeft, Lock, Info } from 'lucide-react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar'; // Import your existing Navbar component

const ProfilePage = () => {
  const location = useLocation();
  const isMainProfile = location.pathname === '/profile' || location.pathname === '/profile/';
  
  const friends = Array(5).fill(null).map((_, i) => ({
    id: i,
    username: 'Username',
    avatar: null
  }));

  const sharedWardrobes = Array(3).fill(null).map((_, i) => ({
    id: i,
    username: 'Username',
    items: 8
  }));

  const savedWardrobes = Array(3).fill(null).map((_, i) => ({
    id: i,
    username: 'Username',
    items: 8
  }));

  const WardrobeCard = ({ username, items, isPrivate = false }) => (
    <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
      <div className="aspect-square bg-gray-100 rounded-lg mb-3 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-gray-300 rotate-45"></div>
      </div>
      <div className="text-sm font-medium text-gray-900">{username}</div>
      <div className="text-xs text-gray-500">{items} items</div>
      {isPrivate && (
        <Lock className="w-3 h-3 text-gray-400 mt-1" />
      )}
    </div>
  );

  const FriendAvatar = ({ username }) => (
    <div className="flex flex-col items-center">
      <div className="w-16 h-16 bg-gray-100 rounded-full border-2 border-gray-200 mb-2"></div>
      <span className="text-xs text-gray-600 text-center">{username}</span>
    </div>
  );

  const getPageTitle = () => {
    if (location.pathname.includes('/shared-wardrobes')) {
      return 'Shared Wardrobes';
    }
    if (location.pathname.includes('/my-wardrobes')) {
      return 'My Wardrobes';
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Use your existing Navbar component */}
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Column - Profile */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <div className="flex flex-col items-center text-center">
                <div className="w-24 h-24 bg-gray-100 rounded-full border-2 border-gray-200 mb-4 flex items-center justify-center">
                  <span className="text-gray-400 text-sm">Profile Pic</span>
                </div>
                <h2 className="text-xl font-semibold text-gray-900 mb-2">Username</h2>
                <p className="text-gray-600 text-sm leading-relaxed">
                  This is my bio. I've written some words here. Not a lot though.
                </p>
              </div>
            </div>

            {/* My Wardrobe */}
            <div className="mt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 underline">My Wardrobe</h3>
              <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                <div className="aspect-square bg-gray-100 rounded-lg mb-4 flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 border-4 border-gray-300 rotate-45"></div>
                  </div>
                </div>
                <div className="text-center">
                  <span className="text-lg font-medium text-gray-900">25 items</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Friends and Wardrobes or Nested Routes */}
          <div className="lg:col-span-3 space-y-8">
            {!isMainProfile && (
              <div className="flex items-center space-x-4 mb-6">
                <Link 
                  to="/profile"
                  className="flex items-center text-green-600 hover:text-green-700 text-sm font-medium"
                >
                  <ChevronLeft className="w-4 h-4 mr-1" />
                  Back to Profile
                </Link>
                <h1 className="text-2xl font-semibold text-gray-900">{getPageTitle()}</h1>
              </div>
            )}
            
            {isMainProfile ? (
              <>
                {/* Friends Section */}
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-semibold text-gray-900">Friends (20)</h2>
                    <button className="flex items-center text-green-600 hover:text-green-700 text-sm font-medium">
                      See all
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </button>
                  </div>
                  <div className="flex space-x-6 overflow-x-auto pb-2">
                    {friends.map((friend, index) => (
                      <div key={index} className="flex-shrink-0">
                        <FriendAvatar username={friend.username} />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Shared Wardrobes */}
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-semibold text-gray-900">Shared Wardrobes</h2>
                    <Link 
                      to="/profile/shared-wardrobes"
                      className="flex items-center text-green-600 hover:text-green-700 text-sm font-medium"
                    >
                      See all
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </Link>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {sharedWardrobes.map((wardrobe, index) => (
                      <WardrobeCard 
                        key={index}
                        username={wardrobe.username}
                        items={wardrobe.items}
                      />
                    ))}
                  </div>
                </div>

                {/* Saved Wardrobes */}
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-semibold text-gray-900 flex items-center">
                      Saved Wardrobes
                      <span className="ml-2 text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full flex items-center">
                        Private
                        <Lock className="w-3 h-3 ml-1" />
                      </span>
                    </h2>
                    <Link 
                      to="/profile/my-wardrobes"
                      className="flex items-center text-green-600 hover:text-green-700 text-sm font-medium"
                    > 
                      See all
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </Link>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {savedWardrobes.map((wardrobe, index) => (
                      <WardrobeCard 
                        key={index}
                        username={wardrobe.username}
                        items={wardrobe.items}
                        isPrivate={true}
                      />
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <Outlet />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;