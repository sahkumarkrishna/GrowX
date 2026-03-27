# Backend - Node.js
FROM node:20-alpine AS backend

WORKDIR /app/backend

# Copy and install backend dependencies
COPY backend/package*.json ./
RUN npm install

COPY backend/ .

# Frontend build stage
FROM node:20-alpine AS frontend

WORKDIR /app/frontend

# Copy frontend files
COPY frontend/package*.json ./
RUN cd frontend && npm install

COPY frontend/ .
RUN npm run build

# Final stage - combine both
FROM node:20-alpine

WORKDIR /app

# Copy backend
COPY --from=backend /app/backend ./backend
COPY --from=frontend /app/frontend/dist ./frontend/dist

# Install production dependencies for backend
WORKDIR /app/backend
COPY backend/package*.json ./
RUN npm install --production

WORKDIR /app

EXPOSE 7000

CMD ["sh", "-c", "cd backend && node index.js"]