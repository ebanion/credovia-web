FROM node:18-alpine

WORKDIR /app

# Install dependencies
COPY package*.json ./
COPY apps/api/package*.json ./apps/api/
RUN npm ci --only=production && npm cache clean --force

# Copy source code
COPY apps/api ./apps/api/
COPY prisma ./prisma/

# Generate Prisma client
RUN npx prisma generate --schema=./apps/api/prisma/schema.prisma

# Build the application
RUN npm run build --workspace=apps/api

EXPOSE 3001

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3001/api/health || exit 1

CMD ["npm", "run", "start:prod", "--workspace=apps/api"]