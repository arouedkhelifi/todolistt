# Stage 1 : Builder
FROM node:18-alpine AS builder

WORKDIR /app

# Copy backend package files
COPY package*.json ./

# Install production dependencies
RUN npm ci --only=production

# Stage 2 : Runtime
FROM node:18-alpine

LABEL maintainer="DevOps Team"
LABEL version="1.0.0"

WORKDIR /app

# Copy node_modules from builder
COPY --from=builder /app/node_modules ./node_modules

# Copy the rest of the backend source code
COPY . .

# Create a non-root user
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nodejs -u 1001
USER nodejs

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
  CMD node -e "require('http').get('http://localhost:5000/health', (r) => {if (r.statusCode !== 200) throw new Error(r.statusCode)})" || exit 1

EXPOSE 5000

CMD ["npm", "start"]
