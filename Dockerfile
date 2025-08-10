# Use Node.js for frontend build
FROM node:18 AS frontend
WORKDIR /app/frontend
COPY src/frontend/package*.json ./
RUN npm install
COPY src/frontend/ .
RUN npm run build

# Use Node.js for backend
FROM node:18 AS backend
WORKDIR /app/backend
COPY src/backend/package*.json ./
RUN npm install
COPY src/backend/ .
# Copy built frontend to backend's public directory (adjust if needed)
COPY --from=frontend /app/frontend/dist ./public

# Expose backend port
EXPOSE 3000

# Start backend server
CMD ["node", "server.js"]
