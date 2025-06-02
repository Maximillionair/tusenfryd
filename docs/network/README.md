# Network Architecture Documentation

## Overview

The Tusenfryd Digital Platform is deployed across multiple network segments to ensure security and proper isolation of services. The architecture follows a three-tier design pattern with separate networks for web, application, and database layers.

## Network Segments

### 1. External Network (DMZ)
- **Purpose**: Handles all external traffic
- **IP Range**: 10.0.1.0/24
- **Components**:
  - Nginx Reverse Proxy (10.0.1.10)
  - SSL Termination
  - Load Balancer (if needed)

### 2. Application Network
- **Purpose**: Internal application services
- **IP Range**: 10.0.2.0/24
- **Components**:
  - Node.js Backend (10.0.2.10)
  - WebSocket Server
  - Application Cache

### 3. Database Network
- **Purpose**: Database services
- **IP Range**: 10.0.3.0/24
- **Components**:
  - MongoDB Primary (10.0.3.10)
  - MongoDB Secondary (10.0.3.11)
  - Database Backup Server (10.0.3.12)

## Department Networks

### 1. Sales Department
- **IP Range**: 10.1.1.0/24
- **Gateway**: 10.1.1.1
- **Access**: Limited to frontend and basic API endpoints

### 2. Operations Department
- **IP Range**: 10.1.2.0/24
- **Gateway**: 10.1.2.1
- **Access**: Full access to attraction management endpoints

### 3. IT Department
- **IP Range**: 10.1.3.0/24
- **Gateway**: 10.1.3.1
- **Access**: Full access to all systems and management interfaces

## Security Measures

### Firewall Rules

#### External Network (DMZ)
```bash
# Allow HTTP/HTTPS
ufw allow 80/tcp
ufw allow 443/tcp

# Allow ICMP for monitoring
ufw allow icmp
```

#### Application Network
```bash
# Allow traffic from DMZ to backend
ufw allow from 10.0.1.0/24 to 10.0.2.10 port 5000

# Allow traffic to database
ufw allow from 10.0.2.10 to 10.0.3.0/24 port 27017
```

#### Database Network
```bash
# Allow only application server
ufw allow from 10.0.2.10 to 10.0.3.0/24 port 27017
```

### Access Control Lists (ACLs)

#### Sales Department
```
access-list 101 permit tcp 10.1.1.0 0.0.0.255 any eq 80
access-list 101 permit tcp 10.1.1.0 0.0.0.255 any eq 443
access-list 101 deny ip any any
```

#### Operations Department
```
access-list 102 permit tcp 10.1.2.0 0.0.0.255 any eq 80
access-list 102 permit tcp 10.1.2.0 0.0.0.255 any eq 443
access-list 102 permit tcp 10.1.2.0 0.0.0.255 10.0.2.10 eq 5000
access-list 102 deny ip any any
```

#### IT Department
```
access-list 103 permit ip 10.1.3.0 0.0.0.255 any
access-list 103 deny ip any any
```

## Monitoring and Logging

### Network Monitoring
- SNMP monitoring for all network devices
- Traffic analysis using NetFlow
- Bandwidth monitoring per department

### Security Logging
- Centralized syslog server (10.0.4.10)
- Firewall logs
- Access logs from all services

## Backup and Recovery

### Database Backups
- Daily full backups
- Hourly incremental backups
- Backup storage on separate network (10.0.5.0/24)

### Configuration Backups
- Network device configurations
- Server configurations
- Application configurations

## High Availability

### Load Balancing
- Nginx load balancer in DMZ
- Health checks for all services
- Automatic failover

### Database Replication
- MongoDB replica set
- Automatic failover
- Data consistency checks

## Disaster Recovery

### Recovery Procedures
1. Network restoration
2. Database recovery
3. Application deployment
4. Service verification

### Recovery Time Objectives (RTO)
- Critical services: 1 hour
- Non-critical services: 4 hours

### Recovery Point Objectives (RPO)
- Database: 1 hour
- Configuration: 24 hours 