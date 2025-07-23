// Note: the .js extension is required when using ES Modules (ESM)
// Correct: import from './wardrobeSort.js', Incorrect: import from './wardrobeSort'
import {
  sortByDistance,
  sortByPopularity,
  sortByUserPreference,
} from './wardrobeSort.js';

// === Test Distance sort ===
const userLocation = { lat: 40.7128, lon: -74.0060 }; // New York City coordinates
// Sample wardrobe items with locations
// Each item has a name and a location with lat/lon
// This simulates the "Explore" view where items are sorted by proximity to the user
const wardrobeItems = [
  { name: "Red Jacket", location: { lat: 34.0522, lon: -118.2437 } }, // Los Angeles
  { name: "Blue Jeans", location: { lat: 41.8781, lon: -87.6298 } },  // Chicago
  { name: "Green Scarf", location: { lat: 40.7306, lon: -73.9352 } },  // New York, queens
];
console.log("\n=== Test: sortByDistance ===");
sortByDistance(wardrobeItems, userLocation).forEach((item) => {
  console.log(item.name);
});

// === Test 2: Popularity sort ===
// Sample wardrobe items with borrowCount, swapCount, and likes
// This simulates the "Trends" view where items are sorted by popularity
// Popularity is calculated as: borrowCount + swapCount + (likes * 0.5)
const popularItems = [
  { name: "Red Jacket", borrowCount: 5, swapCount: 2, likes: 10 },
  { name: "Blue Jeans", borrowCount: 10, swapCount: 0, likes: 4 },
  { name: "Green Scarf", borrowCount: 3, swapCount: 4, likes: 7 },
];
console.log("\n=== Test: sortByPopularity ===");
sortByPopularity(popularItems).forEach((item) => {
  console.log(item.name);
});

// === Test 3: Preference sort ===
// Sample wardrobe items with style, color, and category
// This simulates the "For You" view where items are sorted based on user preferences
// Match score is calculated based on how many attributes match the user's preferences
// Items that match more attributes will be ranked higher
const userPrefs = { style: "casual", color: "blue", category: "jeans" };
const preferenceItems = [
  { name: "Comfy Tee", style: "casual", color: "red", category: "tops" },
  { name: "Chic Blazer", style: "formal", color: "blue", category: "jackets" },
  { name: "Blue Jeans", style: "casual", color: "blue", category: "jeans" },
];
console.log("\n=== Test: sortByUserPreference ===");
sortByUserPreference(preferenceItems, userPrefs).forEach((item) => {
  console.log(item.name);
});