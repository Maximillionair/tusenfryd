# Deployment Guide

## Prerequisites

- VMware vSphere environment
- Docker and Docker Compose installed
- MongoDB 4.4 or later
- Node.js 18 or later
- Nginx
- SSL certificates

## Network Setup

### 1. Configure Network Segments
```bash
# Create network segments in vSphere
vsphere-cli network create --name dmz --cidr 10.0.1.0/24
vsphere-cli network create --name app --cidr 10.0.2.0/24
vsphere-cli network create --name db --cidr 10.0.3.0/24
```

### 2. Configure Firewall Rules
```bash
# On each server
ufw enable
ufw default deny incoming
ufw default allow outgoing

# DMZ Server
ufw allow 80/tcp
ufw allow 443/tcp
ufw allow from 10.0.2.0/24

# App Server
ufw allow from 10.0.1.0/24 to any port 5000
ufw allow from 10.0.3.0/24 to any port 27017

# DB Server
ufw allow from 10.0.2.0/24 to any port 27017
```

## Server Setup

### 1. Create Virtual Machines
```bash
# Create VMs in vSphere
vsphere-cli vm create --name nginx-proxy --memory 2048 --cpu 2 --network dmz
vsphere-cli vm create --name app-server --memory 4096 --cpu 4 --network app
vsphere-cli vm create --name db-server --memory 4096 --cpu 4 --network db
```

### 2. Install Base Software
```bash
# On all servers
apt update
apt upgrade -y
apt install -y docker.io docker-compose ufw
```

## Application Deployment

### 1. Clone Repository
```bash
git clone https://github.com/tusenfryd/digital-platform.git
cd digital-platform
```

### 2. Configure Environment
```bash
# Create .env file
cp .env.example .env
# Edit .env with production values
nano .env
```

### 3. Build and Deploy
```bash
# Build Docker images
docker-compose build

# Start services
docker-compose up -d
```

## Database Setup

### 1. Initialize MongoDB
```bash
# Connect to MongoDB
mongosh

# Create admin user
use admin
db.createUser({
  user: "admin",
  pwd: "secure_password",
  roles: [ { role: "userAdminAnyDatabase", db: "admin" } ]
})

# Create application database and user
use tusenfryd
db.createUser({
  user: "tusenfryd_user",
  pwd: "application_password",
  roles: [ { role: "readWrite", db: "tusenfryd" } ]
})
```

### 2. Configure MongoDB Security
```bash
# Edit MongoDB configuration
nano /etc/mongod.conf

# Add security settings
security:
  authorization: enabled
  ssl:
    mode: requireSSL
    PEMKeyFile: /etc/ssl/mongodb.pem
    CAFile: /etc/ssl/ca.pem
```

## Nginx Configuration

### 1. Install SSL Certificates
```bash
# Copy SSL certificates
cp tusenfryd.crt /etc/nginx/ssl/
cp tusenfryd.key /etc/nginx/ssl/
```

### 2. Configure Nginx
```bash
# Copy configuration
cp nginx/conf.d/default.conf /etc/nginx/conf.d/

# Test configuration
nginx -t

# Restart Nginx
systemctl restart nginx
```

## Monitoring Setup

### 1. Install Monitoring Tools
```bash
# Install monitoring tools
apt install -y prometheus node-exporter
```

### 2. Configure Monitoring
```bash
# Configure Prometheus
cp prometheus.yml /etc/prometheus/
systemctl restart prometheus
```

## Backup Configuration

### 1. Setup Database Backups
```bash
# Create backup script
cat > /usr/local/bin/backup-mongodb.sh << 'EOF'
#!/bin/bash
BACKUP_DIR="/backup/mongodb"
DATE=$(date +%Y%m%d_%H%M%S)
mongodump --uri="mongodb://localhost:27017/tusenfryd" --out="$BACKUP_DIR/$DATE"
EOF

# Make script executable
chmod +x /usr/local/bin/backup-mongodb.sh

# Add to crontab
echo "0 0 * * * /usr/local/bin/backup-mongodb.sh" | crontab -
```

## Verification

### 1. Check Services
```bash
# Check Docker containers
docker-compose ps

# Check MongoDB
mongosh --eval "db.serverStatus()"

# Check Nginx
nginx -t
systemctl status nginx
```

### 2. Test Application
```bash
# Test API endpoints
curl https://api.tusenfryd.no/health
curl https://api.tusenfryd.no/api/attractions
```

## Maintenance

### 1. Update Application
```bash
# Pull latest changes
git pull

# Rebuild and restart
docker-compose down
docker-compose build
docker-compose up -d
```

### 2. Database Maintenance
```bash
# Check database status
mongosh --eval "db.serverStatus()"

# Repair database if needed
mongosh --eval "db.repairDatabase()"
```

## Troubleshooting

### Common Issues

1. **Application Not Starting**
   - Check Docker logs: `docker-compose logs`
   - Verify environment variables
   - Check MongoDB connection

2. **Database Connection Issues**
   - Verify MongoDB is running
   - Check firewall rules
   - Verify credentials

3. **Nginx Issues**
   - Check Nginx logs: `tail -f /var/log/nginx/error.log`
   - Verify SSL certificates
   - Check configuration: `nginx -t`

### Log Files
- Application logs: `docker-compose logs -f`
- Nginx logs: `/var/log/nginx/`
- MongoDB logs: `/var/log/mongodb/`
- System logs: `journalctl -u docker` 