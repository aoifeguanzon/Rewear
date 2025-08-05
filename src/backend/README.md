# ReWear Mock Backend Tester

This is a mock simulation for testing the sorting logic (Explore, Trends, and For You) of the ReWear backend before real user data and database integration.

It includes:
- Sorting algorithms for wardrobe items (by distance, popularity, and user preference)
- Mock users with wardrobe items
- Live product suggestions from the **eBay Sandbox API** based on a user's preferences

---

## 🛠 Setup Instructions

### 1. Clone the Repository
```bash
git clone <your-repo-url>
cd <your-project-directory>
```

### 2. Install Dependencies
```bash
npm install node-fetch@2
```

> ⚠️ We use `node-fetch@2` because version 3+ is ESM-only and breaks CommonJS-style `require()`.

---

### 3. Create `.env` File (to store eBay Sandbox credentials securely)
```bash
touch .env
```

Paste this inside `.env`:
```env
EBAY_CLIENT_ID=your-ebay-client-id-here
EBAY_CLIENT_SECRET=your-ebay-client-secret-here
```

Make sure `.env` is added to `.gitignore`:
```bash
echo ".env" >> .gitignore
```

---

### 4. How to Run
```bash
node userTester.js
```

You should see output for:
- Nearby users (Explore)
- Popular items (Trends)
- Live mock eBay items (For You)

---

## eBay Sandbox Setup (Already Working)

You are using eBay's **Sandbox** environment (not real products). These steps are required **before switching to the production API**:

### ✅ Already Done:
- Registered eBay Sandbox App  
- Generated sandbox API credentials  
- Fetched mock item summaries using the **Browse API**

---

### ⚠️ What Must Be Done to Switch to Production (STILL WORKING ON THIS)

To use the **real** eBay Browse API:

1. Test your app in the Sandbox first
2. File a support ticket via [eBay Developer Dashboard](https://developer.ebay.com/my/support/tickets) with:
   - Your Browse API use case
   - APIs you want to use
   - Marketplace you’re targeting (e.g., US)
   - App overview + mock flow description
3. Possibly demo your Sandbox version
4. Wait for production credentials approval

---

## 🔐 Security Reminder

You **must NOT hardcode credentials** in your JavaScript files.  
Move all API keys and secrets into your `.env` file.

---

## ⏭ What Happens After Real Database is Set Up

Once user authentication + account creation is available:

- [ ] Replace mock `users[]` array with **real user data from DynamoDB**
- [ ] Use actual style preferences, wardrobe items, and locations
- [ ] Dynamically update "For You" tab using true preference data
- [ ] Hook all logic into backend API routes like:
  - `GET /api/explore`
  - `GET /api/trends`
  - `GET /api/foryou`
