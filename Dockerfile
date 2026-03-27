# Stage 1: Build frontend
FROM node:20-alpine AS builder

WORKDIR /app

# Copy frontend files
COPY frontend/package*.json frontend/
RUN cd frontend && npm install

COPY frontend/ .
RUN npm run build

# Stage 2: Serve with nginx
FROM nginx:alpine

# Copy built files to nginx
COPY --from=builder /app/frontend/dist /usr/share/nginx/html

# Copy nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]