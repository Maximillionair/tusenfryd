# 🎢 Tusenfryd Digital Platform

A modern web application for managing Tusenfryd amusement park's attractions, queue system, and internal communications.

## 🚀 Features

### Visitor Features
- View attractions, opening hours, and waiting times
- Search for attractions
- Queue reservation system
- Real-time notifications for attraction status

### Admin Features
- Secure authentication system
- CRUD operations for attractions
- Opening hours management
- Reservation overview
- Internal notification system
- Internal chat system (bonus feature)

## 🛠️ Technology Stack

### Frontend
- React.js
- Material-UI for modern, responsive design
- Redux for state management

### Backend
- Node.js with Express
- RESTful API architecture
- JWT authentication

### Database
- MongoDB for flexible data storage

### Infrastructure
- Docker containerization
- Nginx reverse proxy
- VMware vSphere deployment
- Network segmentation with Cisco Packet Tracer

## 📋 Project Structure

```
tusenfryd/
├── frontend/           # React frontend application
├── backend/           # Node.js/Express backend
├── docker/            # Docker configuration files
├── docs/             # Technical documentation
│   ├── api/          # API documentation
│   ├── network/      # Network architecture
│   └── deployment/   # Deployment guides
└── cisco/            # Packet Tracer files
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- Docker and Docker Compose
- MongoDB
- VMware vSphere (for production deployment)

### Development Setup
1. Clone the repository
2. Install dependencies:
   ```bash
   # Install backend dependencies
   cd backend
   npm install

   # Install frontend dependencies
   cd ../frontend
   npm install
   ```
3. Start development servers:
   ```bash
   # Start backend (from backend directory)
   npm run dev

   # Start frontend (from frontend directory)
   npm start
   ```

### Docker Deployment
```bash
docker-compose up -d
```

## 📚 Documentation

- [API Documentation](docs/api/README.md)
- [Network Architecture](docs/network/README.md)
- [Deployment Guide](docs/deployment/README.md)
- [FAQ](docs/faq.md)

## 🔒 Security

- Network segmentation using VLANs
- UFW firewall configuration
- MongoDB IP binding
- JWT authentication
- Input validation and sanitization

## 🤝 Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.