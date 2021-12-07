# Build stage
FROM node:16 AS builder

WORKDIR /usr/src/app

COPY package*.json ./
COPY tsconfig*.json ./
COPY ./src ./src
RUN npm ci --quiet && npm run build


# Production stage
FROM node:16-alpine
LABEL org.opencontainers.image.source="https://github.com/Hense94/nodefications"

WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000


COPY package*.json ./
RUN npm ci --quiet --only=production

COPY --from=builder /usr/src/app/dist ./dist
EXPOSE 8080

CMD [ "node", "dist/index.js" ]
