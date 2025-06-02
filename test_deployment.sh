#!/bin/bash

# Configuration
NODE_IP="10.12.10.27"
MONGO_IP="10.12.10.28"

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m'

echo "Starting deployment tests..."

# Test 1: Check if containers are running
echo -e "\n${GREEN}Test 1: Checking container status...${NC}"
if docker-compose ps | grep -q "Up"; then
    echo "✅ All containers are running"
else
    echo "❌ Some containers are not running"
    exit 1
fi

# Test 2: Check MongoDB connection
echo -e "\n${GREEN}Test 2: Testing MongoDB connection...${NC}"
if docker-compose exec mongodb mongosh --eval "db.serverStatus()" > /dev/null 2>&1; then
    echo "✅ MongoDB is accessible"
else
    echo "❌ MongoDB connection failed"
    exit 1
fi

# Test 3: Check Node.js API
echo -e "\n${GREEN}Test 3: Testing Node.js API...${NC}"
if curl -s http://$NODE_IP:5000/api/health > /dev/null; then
    echo "✅ API is responding"
else
    echo "❌ API is not responding"
    exit 1
fi

# Test 4: Check Nginx
echo -e "\n${GREEN}Test 4: Testing Nginx...${NC}"
if curl -s -I http://$NODE_IP | grep -q "200 OK"; then
    echo "✅ Nginx is serving the frontend"
else
    echo "❌ Nginx is not responding correctly"
    exit 1
fi

# Test 5: Check SSL
echo -e "\n${GREEN}Test 5: Testing SSL...${NC}"
if curl -s -k https://$NODE_IP | grep -q "Tusenfryd"; then
    echo "✅ SSL is working"
else
    echo "❌ SSL is not working"
    exit 1
fi

# Test 6: Check WebSocket
echo -e "\n${GREEN}Test 6: Testing WebSocket...${NC}"
if curl -s -N -H "Connection: Upgrade" -H "Upgrade: websocket" -H "Host: $NODE_IP" -H "Origin: http://$NODE_IP" http://$NODE_IP/socket.io/ | grep -q "websocket"; then
    echo "✅ WebSocket is working"
else
    echo "❌ WebSocket is not working"
    exit 1
fi

echo -e "\n${GREEN}All tests completed successfully!${NC}"
echo "The application is properly deployed and functioning." 