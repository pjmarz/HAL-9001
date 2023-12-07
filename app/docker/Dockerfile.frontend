# Stage 1: Build the React application
FROM node:latest as build-stage

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the rest of the frontend source code
COPY ./frontend/src ./src

# Build the app
RUN npm run build

# Add a non-root user for security purposes
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# Switch to the new user
USER appuser

# Stage 2: Serve the app using Nginx
FROM nginx:stable-alpine as production-stage

# Copy the built assets from the build-stage and set permissions
COPY --from=build-stage /app/build /usr/share/nginx/html
COPY --from=build-stage /etc/passwd /etc/passwd

# Copy the custom nginx.conf to the image
COPY ./docker/nginx.conf /etc/nginx/nginx.conf

# Expose port 3000 to the outside once the container has launched
EXPOSE 3000

# Define the running command
CMD ["nginx", "-g", "daemon off;"]
