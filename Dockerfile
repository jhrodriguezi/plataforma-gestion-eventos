# Use an official Node runtime as a parent image
FROM node:20

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of app's source code
COPY . .

# Build TypeScript to JavaScript
RUN npm run build

# Copy .sql files
COPY src/infrastructure/database/queries.sql dist/infrastructure/database/
COPY src/infrastructure/database/migrations/ dist/infrastructure/database/migrations/

# Expose the port your app runs on
EXPOSE 3000

# Define the command to run your app
CMD ["node", "dist/index.js"]