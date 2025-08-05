/**
* File: wardrobeSort.js
* Author: Valerie Pena
* Description:
*   This file contains sorting algorithms for wardrobe items.
*   It supports three sorting strategies:
*     1. sortByDistance (for "Explore" views)
*     2. sortByPopularity (for "Trends" views)
*     3. sortByUserPreference (for "For You" views)
*
*  This helps verify the sorting logic before connecting to real user data and wardrobe items.
*
* Future extension:
*   - Replace hardcoded items with database queries
*   - Pass in dynamic user location instead of default NYC
*/

// wardrobeSort.js

function calculateDistance(loc1, loc2) {
  const toRad = deg => (deg * Math.PI) / 180;
  const R = 6371; // Earth radius in km
  const dLat = toRad(loc2.lat - loc1.lat);
  const dLon = toRad(loc2.lon - loc1.lon);
  const a = Math.sin(dLat / 2) ** 2 +
            Math.cos(toRad(loc1.lat)) * Math.cos(toRad(loc2.lat)) *
            Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function sortByDistance(items, userLocation) {
  return items.sort((a, b) => {
    const distA = calculateDistance(userLocation, a.location);
    const distB = calculateDistance(userLocation, b.location);
    return distA - distB;
  });
}

function sortByPopularity(items) {
  return items.sort((a, b) => {
    const scoreA = (a.borrowCount || 0) + (a.swapCount || 0) + (a.likes || 0) * 0.5;
    const scoreB = (b.borrowCount || 0) + (b.swapCount || 0) + (b.likes || 0) * 0.5;
    return scoreB - scoreA;
  });
}

function sortByUserPreference(items, userPrefs) {
  const matchScore = item => {
    let score = 0;
    if (item.style === userPrefs.style) score += 1;
    if (item.color === userPrefs.color) score += 1;
    if (item.category === userPrefs.category) score += 1;
    return score;
  };
  return items.sort((a, b) => matchScore(b) - matchScore(a));
}

module.exports = {
  sortByDistance,
  sortByPopularity,
  sortByUserPreference
};