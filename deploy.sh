#!/bin/bash

# Exit on error
set -e

# Configuration
NODE_IP="10.12.10.27"
MONGO_IP="10.12.10.28"
APP_DIR="/home/gerty/tusenfryd"

# Update system
echo "Updating system..."
sudo apt update
sudo apt upgrade -y

# Install required packages
echo "Installing required packages..."
sudo apt install -y docker.io docker-compose nginx

# Add user to docker group
echo "Adding user to docker group..."
sudo usermod -aG docker gerty

# Create application directory
echo "Creating application directory..."
mkdir -p $APP_DIR
cd $APP_DIR

# Clone repository (if not already done)
if [ ! -d ".git" ]; then
    echo "Cloning repository..."
    git clone https://github.com/gerty/tusenfryd.git .
fi

# Create environment files
echo "Creating environment files..."
cat > .env << EOL
NODE_ENV=production
MONGODB_URI=mongodb://$MONGO_IP:27017/tusenfryd
JWT_SECRET=your_secure_jwt_secret_here
FRONTEND_URL=http://$NODE_IP
EOL

# Create SSL directory
echo "Creating SSL directory..."
sudo mkdir -p /etc/nginx/ssl

# Generate self-signed certificate (for testing)
echo "Generating SSL certificate..."
sudo openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
    -keyout /etc/nginx/ssl/tusenfryd.key \
    -out /etc/nginx/ssl/tusenfryd.crt \
    -subj "/C=NO/ST=Oslo/L=Oslo/O=Tusenfryd/CN=$NODE_IP"

# Copy Nginx configuration
echo "Configuring Nginx..."
sudo cp nginx/conf.d/default.conf /etc/nginx/conf.d/
sudo nginx -t
sudo systemctl restart nginx

# Build and start containers
echo "Building and starting containers..."
docker-compose build
docker-compose up -d

# Initialize MongoDB
echo "Initializing MongoDB..."
sleep 10  # Wait for MongoDB to start
docker-compose exec mongodb mongosh --eval '
db = db.getSiblingDB("tusenfryd");
db.createUser({
  user: "tusenfryd_user",
  pwd: "your_secure_password_here",
  roles: [{ role: "readWrite", db: "tusenfryd" }]
});'

echo "Deployment completed!"
echo "Application is available at: http://$NODE_IP"
echo "API is available at: http://$NODE_IP/api" 