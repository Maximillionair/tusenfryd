# Tusenfryd API Documentation

## Authentication

### POST /api/auth/login
Authenticate a user and receive a JWT token.

**Request Body:**
```json
{
  "email": "user@tusenfryd.no",
  "password": "password123"
}
```

**Response:**
```json
{
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "username": "username",
    "email": "user@tusenfryd.no",
    "role": "admin",
    "department": "it"
  }
}
```

## Attractions

### GET /api/attractions
Get all attractions.

**Query Parameters:**
- `category`: Filter by category
- `status`: Filter by status
- `search`: Search in name and description

**Response:**
```json
{
  "attractions": [
    {
      "id": "attraction_id",
      "name": "Thunder Coaster",
      "description": "High-speed roller coaster",
      "status": "open",
      "currentWaitTime": 30,
      "openingHours": {
        "monday": { "open": "10:00", "close": "20:00" }
      },
      "minimumHeight": 140,
      "category": "rollercoaster",
      "imageUrl": "url_to_image",
      "capacity": 24,
      "currentOccupancy": 20
    }
  ]
}
```

### POST /api/attractions
Create a new attraction (Admin only).

**Request Body:**
```json
{
  "name": "New Attraction",
  "description": "Description",
  "minimumHeight": 120,
  "category": "family",
  "capacity": 20,
  "openingHours": {
    "monday": { "open": "10:00", "close": "20:00" }
  }
}
```

### PUT /api/attractions/:id
Update an attraction (Admin only).

### DELETE /api/attractions/:id
Delete an attraction (Admin only).

## Queue Management

### POST /api/queue/reserve
Reserve a place in queue.

**Request Body:**
```json
{
  "attractionId": "attraction_id",
  "visitorId": "visitor_id"
}
```

**Response:**
```json
{
  "reservation": {
    "id": "reservation_id",
    "attraction": "attraction_id",
    "position": 5,
    "estimatedWaitTime": 45,
    "status": "waiting"
  }
}
```

### GET /api/queue/status/:attractionId
Get current queue status.

**Response:**
```json
{
  "currentWaitTime": 45,
  "queueLength": 50,
  "estimatedWaitTime": 45
}
```

## Internal Communication

### GET /api/messages
Get messages (filtered by department).

**Query Parameters:**
- `department`: Filter by department
- `type`: Filter by message type
- `priority`: Filter by priority

**Response:**
```json
{
  "messages": [
    {
      "id": "message_id",
      "content": "Message content",
      "type": "notification",
      "department": "all",
      "priority": "high",
      "sender": {
        "id": "user_id",
        "username": "username"
      },
      "createdAt": "2024-01-01T12:00:00Z"
    }
  ]
}
```

### POST /api/messages
Send a new message.

**Request Body:**
```json
{
  "content": "Message content",
  "type": "notification",
  "department": "all",
  "priority": "high",
  "relatedAttraction": "attraction_id"
}
```

## WebSocket Events

### Connection
Connect to WebSocket server:
```javascript
const socket = io('https://api.tusenfryd.no');
```

### Events

#### attraction.status
Receive real-time updates about attraction status:
```javascript
socket.on('attraction.status', (data) => {
  console.log('Attraction status update:', data);
});
```

#### queue.update
Receive real-time updates about queue status:
```javascript
socket.on('queue.update', (data) => {
  console.log('Queue update:', data);
});
```

#### message.new
Receive new messages:
```javascript
socket.on('message.new', (data) => {
  console.log('New message:', data);
});
```

## Error Responses

All endpoints may return the following error responses:

### 400 Bad Request
```json
{
  "error": "Invalid input data"
}
```

### 401 Unauthorized
```json
{
  "error": "Please authenticate"
}
```

### 403 Forbidden
```json
{
  "error": "Access denied"
}
```

### 404 Not Found
```json
{
  "error": "Resource not found"
}
```

### 500 Internal Server Error
```json
{
  "error": "Something went wrong"
}
``` 