/*
file MyWardrobes.tsx
author Isaac Mulugeta

brief This is the "My Wardrobes" sub-page component for the profile.
*/
import React from 'react';
import { Plus, ChevronDown, Upload, Link as LinkIcon } from 'lucide-react';

const MyWardrobes = () => {
  // Generate wardrobe items for the grid
  const wardrobeItems = Array(8).fill(null).map((_, i) => ({
    id: i,
    name: `Item ${i + 1}`
  }));

  const ebayItems = [
    { id: 1, price: '€25', image: '/api/placeholder/150/150' },
    { id: 2, price: '€30', image: '/api/placeholder/150/150' },
    { id: 3, price: '€15', image: '/api/placeholder/150/150' }
  ];

  const wardrobeOwners = [
    { id: 1, name: 'Claire', image: '/api/placeholder/120/120' },
    { id: 2, name: 'Bella', image: '/api/placeholder/120/120' },
    { id: 3, name: 'Alex', image: '/api/placeholder/120/120' }
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
      {/* Left Column - Upload Section */}
      <div className="lg:col-span-1">
        <div className="bg-green-100 border-2 border-green-300 rounded-lg p-6">
          {/* Image Upload Area */}
          <div className="bg-gray-800 rounded-lg p-4 mb-4 aspect-square flex items-center justify-center">
            <img 
              src="/api/placeholder/200/200" 
              alt="Upload preview" 
              className="w-full h-full object-cover rounded"
            />
          </div>
          
          {/* Upload Button */}
          <button className="w-full bg-green-600 text-white py-3 px-4 rounded-lg font-medium mb-4 flex items-center justify-center hover:bg-green-700 transition-colors">
            <Upload className="w-4 h-4 mr-2" />
            Upload image
          </button>
          
          {/* Product Link Input */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Or paste a product link
            </label>
            <input 
              type="text" 
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="https://..."
            />
          </div>
          
          {/* Price Range */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select price range
            </label>
            <div className="flex items-center space-x-2">
              <div className="relative">
                <select className="appearance-none bg-green-600 text-white px-3 py-2 pr-8 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500">
                  <option>Min price</option>
                </select>
                <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white pointer-events-none" />
              </div>
              <span className="text-gray-600">to</span>
              <div className="relative">
                <select className="appearance-none bg-white border border-gray-300 px-3 py-2 pr-8 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500">
                  <option>Max price</option>
                </select>
                <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-600 pointer-events-none" />
              </div>
            </div>
          </div>
          
          {/* Search Button */}
          <button className="w-full bg-green-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-green-700 transition-colors">
            Search for item
          </button>
        </div>
      </div>

      {/* Right Column - Results */}
      <div className="lg:col-span-3 bg-green-200 rounded-lg p-6">
        {/* eBay Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">eBay</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            {ebayItems.map((item) => (
              <div key={item.id} className="bg-white rounded-lg p-4 shadow-sm">
                <div className="aspect-square bg-gray-100 rounded-lg mb-3 flex items-center justify-center">
                  <img 
                    src={item.image} 
                    alt={`Item ${item.id}`}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
                <div className="text-lg font-bold text-gray-900">{item.price}</div>
              </div>
            ))}
          </div>
        </div>

        {/* From wardrobes section */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-gray-900">From wardrobes in your country</h2>
            <ChevronDown className="w-5 h-5 text-gray-600" />
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            {wardrobeOwners.map((owner) => (
              <div key={owner.id} className="text-center">
                <div className="aspect-square bg-white rounded-lg p-4 shadow-sm mb-3">
                  <img 
                    src={owner.image} 
                    alt={owner.name}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
                <div className="flex items-center justify-center space-x-1">
                  <span className="text-lg font-bold text-gray-900">{owner.name}</span>
                  <div className="w-4 h-4 bg-gray-400 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">i</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center">
            <button className="text-gray-700 font-medium hover:text-gray-900 transition-colors">
              Return to explore page →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyWardrobes;