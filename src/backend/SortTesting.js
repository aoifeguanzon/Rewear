/**
 * File: userTester.js
 * Author: Valerie Pena
 * 
 * ⚠️ NOTE: This code currently uses the EBay Sandbox API 
 * We CANNOT switch to the real (production) eBay Browse API until we:
 *
 *   1. Test your application in the Sandbox environment to ensure it works as expected with the Browse API.
 *   2. File a support ticket through your eBay developer account. In your ticket, include:
 *      - Your business use case for the Browse API.
 *      - The specific APIs you want to use.
 *      - Details about your application, such as targeted eBay marketplaces and your user base.
 *      - A description of your application's end-to-end flow in the Sandbox.
 *   3. After review, eBay may ask for a demonstration of your application in the Sandbox.
 *   4. Once approved, you will be granted Production access.
 * 
 * Until then, this code will use fake listings from eBay's sandbox environment.
 * These listings are for layout and logic testing only — not real products.
 * ------------------------------------------------------------------------
 * ⚠️ SECOND NOTE: Real user data (from the database) is not yet available.
 * 
 * To move forward with real-time sorting for:
 *   - "Explore" (nearby users)
 *   - "Trends" (popular items)
 *   - "For You" (personalized items via user preferences)
 * 
 * We NEED:
 *   User authentication and account creation
 *   At least one real user to be created via signup
 * 
 * Once user data is in the database, we can:
 *   - Replace mock `users[]` with real DB queries
 *   - Use actual preferences, wardrobe items, and location
 *   - Improve the "For You" logic with dynamic real data
 *
 * This unlocks future backend routes like:
 *   GET /api/explore
 *   GET /api/trends
 *   GET /api/foryou
 * 
 * ⚠️ What this file currently does:
 * This file simulates a full mock experience for a single logged-in user
 * across the 3 main tabs of the ReWear app:
 *
 *   EXPLORE - Nearby users with similar style preferences
 *   TRENDS - Most popular wardrobe items in the community
 *   FOR YOU - Live eBay Sandbox results based on user preferences
 *
 *.  How it works:
 * - Uses mock user data for testing local sorting logic
*  - Fetches mock products from the eBay Sandbox API for testing
 * - Will be replaced later by backend API routes connected to real data in DynamoDB
 */

require('dotenv').config();

const { sortByDistance, sortByPopularity, sortByUserPreference } = require('./wardrobeSort.js');
const fetch = require('node-fetch');

// === Mock Users ===
const users = [
  {
    name: "Val",
    location: { lat: 40.7128, lon: -74.0060 }, // NYC
    preferences: { style: "casual", color: "blue", category: "jeans" },
    wardrobe: [
      { name: "Blue Jeans", style: "casual", color: "blue", category: "jeans" }
    ],
    borrowCount: 2,
    swapCount: 1,
    likes: 5
  },
  {
    name: "Sam",
    location: { lat: 40.7306, lon: -73.9352 }, // NYC-ish
    preferences: { style: "formal", color: "black", category: "blazers" },
    wardrobe: [
      { name: "Chic Blazer", style: "formal", color: "black", category: "blazers" }
    ],
    borrowCount: 10,
    swapCount: 3,
    likes: 15
  },
  {
    name: "Alex",
    location: { lat: 34.0522, lon: -118.2437 }, // LA
    preferences: { style: "casual", color: "red", category: "tops" },
    wardrobe: [
      { name: "Comfy Tee", style: "casual", color: "red", category: "tops" }
    ],
    borrowCount: 5,
    swapCount: 2,
    likes: 9
  }
];

// === Active User ===
const currentUser = users[0];

console.log("\n=== Explore: Nearby Users with similar style ===");
const exploreUsers = users.filter(u => u.name !== currentUser.name);
const sortedByDistance = sortByDistance(exploreUsers, currentUser.location);
sortedByDistance.forEach(user => {
  console.log(`${user.name} - ${user.wardrobe.map(i => i.name).join(', ')}`);
});

console.log("\n=== Trends: Popular Items ===");
const allWardrobeItems = users.flatMap(u => u.wardrobe.map(item => ({
  ...item,
  borrowCount: u.borrowCount,
  swapCount: u.swapCount,
  likes: u.likes
})));

const trending = sortByPopularity(allWardrobeItems);
trending.forEach(item => {
  console.log(`${item.name} (borrow:${item.borrowCount}, swap:${item.swapCount}, likes:${item.likes})`);
});

console.log("\n=== For You: eBay Clothing Match ===");
async function fetchEbayItemsForUser() {
  const CLIENT_ID = process.env.EBAY_CLIENT_ID;
  const CLIENT_SECRET = process.env.EBAY_CLIENT_SECRET;

  try {
    const tokenRes = await fetch('https://api.sandbox.ebay.com/identity/v1/oauth2/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64'),
      },
      body: 'grant_type=client_credentials&scope=https://api.ebay.com/oauth/api_scope'
    });

    const tokenData = await tokenRes.json();
    const accessToken = tokenData.access_token;
    const query = "shirt"; 
    
    const searchRes = await fetch(`https://api.sandbox.ebay.com/buy/browse/v1/item_summary/search?q=${query}&limit=5`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      }
    });

    const items = await searchRes.json();
    if (items.itemSummaries?.length > 0) {
      items.itemSummaries.forEach(item => {
        console.log(`${item.title}`);
      });
    } else {
      console.log(`⚠️ No items found for "${query}"`);
    }

  } catch (err) {
    console.error("❌ eBay API error:", err);
  }
}

fetchEbayItemsForUser();
