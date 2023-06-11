# Base image
FROM node:14-alpine AS builder

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy the application files
COPY . .

# Set the environment variables
ARG REACT_APP_API_BASE_URL
ENV REACT_APP_API_BASE_URL $REACT_APP_API_BASE_URL

# Build the React app
RUN npm run build

# Nginx image
FROM nginx:alpine

WORKDIR /usr/share/nginx/html

RUN rm -rf *
# Copy the React app build files
COPY --from=builder /app/build .

EXPOSE 80

# Start Nginx server
ENTRYPOINT ["nginx", "-g", "daemon off;"]
