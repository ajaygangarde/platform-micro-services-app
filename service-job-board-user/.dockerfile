# Use Node 18 as the base image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy the rest of the source code
COPY . .

# Build the TypeScript code if applicable
RUN npm run build

# Expose the port the service will run on
EXPOSE 5000

# Define the command to start the app
CMD ["npm", "start"]