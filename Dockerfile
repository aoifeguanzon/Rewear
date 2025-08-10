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
# The COPY src/backend/ . must come after npm install, but before build/run
# Copy built frontend to backend's public directory (adjust if needed)
COPY --from=frontend /app/frontend/dist ./public

# Set environment variables for production
ENV NODE_ENV=production
ENV PORT=3000

# Expose backend port
EXPOSE 3000

# Healthcheck for container orchestration
HEALTHCHECK --interval=30s --timeout=10s --start-period=10s --retries=3 \
  CMD curl -f http://localhost:3000/health || exit 1

# Start backend server
CMD ["node", "server.js"]
