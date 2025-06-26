# Build stage
FROM node:20 AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Serve stage
FROM node:20

WORKDIR /app

# Install static file server
RUN npm install -g serve

# Copy built frontend
COPY --from=builder /app/dist .

EXPOSE 80

CMD ["serve", "-s", ".", "-l", "80"]


