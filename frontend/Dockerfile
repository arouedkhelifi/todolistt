# =========================
# Stage 1: Builder
# =========================
FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# =========================
# Stage 2: Runtime
# =========================
FROM node:18-alpine

WORKDIR /app
RUN npm install -g serve

# Copy built files (Vite output is dist/)
COPY --from=builder /app/dist/ ./build/
COPY --from=builder /app/public/ ./public/

RUN addgroup -g 1001 -S nodejs
RUN adduser -S nodejs -u 1001
USER nodejs

EXPOSE 3000
CMD ["serve", "-s", "build", "-l", "3000"]
