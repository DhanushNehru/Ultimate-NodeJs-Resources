# Web sockets and Real time applications


Here’s a detailed guide on using WebSockets and Socket.io for creating real-time applications, written in easy-to-follow language. This will cover:

1. **What WebSockets Are and Why We Use Them**
2. **Setting Up a WebSocket Connection Using the `ws` Library**
3. **Using Socket.io for Real-Time Features**
4. **Building Real-Time Features Like Chat and Notifications**
5. **Wrapping Up with Deployment Tips**

---

### 1. What WebSockets Are and Why We Use Them

WebSockets allow real-time, two-way communication between a client (e.g., a web browser) and a server. Unlike HTTP requests that work one way (client to server), WebSockets allow continuous data exchange. This makes WebSockets ideal for applications like **live chats**, **gaming**, and **real-time notifications**.

Think of WebSockets as opening a two-way tunnel that stays open, so messages can be instantly exchanged without needing to “reconnect” each time.

---

### 2. Setting Up a WebSocket Connection Using the `ws` Library

The `ws` library is a simple, lightweight way to create WebSocket servers in Node.js. Let’s start with installing `ws`.

### Step 1: Install `ws`

```bash
npm install w
```

### Step 2: Create a Simple WebSocket Server

Create a file called `server.js`:

```jsx
const WebSocket = require('ws');

const server = new WebSocket.Server({ port: 8080 });

server.on('connection', (socket) => {
  console.log('Client connected');

  // Receive a message from the client
  socket.on('message', (message) => {
    console.log(`Received message: ${message}`);
    // Send a message back to the client
    socket.send(`Server received: ${message}`);
  });

  // When the client disconnects
  socket.on('close', () => {
    console.log('Client disconnected');
  });
});
```

### Step 3: Create a Client to Connect to the Server

Create a file called `client.html` to test this:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>WebSocket Client</title>
</head>
<body>
  <h1>WebSocket Client</h1>
  <script>
    const socket = new WebSocket('ws://localhost:8080');

    socket.onopen = () => {
      console.log('Connected to the server');
      socket.send('Hello, Server!');
    };

    socket.onmessage = (event) => {
      console.log(`Message from server: ${event.data}`);
    };

    socket.onclose = () => {
      console.log('Disconnected from server');
    };
  </script>
</body>
</html>
```

Now, run `server.js` and open `client.html` in your browser. You’ll see a two-way communication between the client and server.

---

### 3. Using Socket.io for Real-Time Features

Socket.io simplifies working with WebSockets by providing extra features, like handling disconnections, rooms, and namespaces. It also falls back to HTTP polling if WebSocket isn’t supported.

### Step 1: Install Socket.io

On the server:

```bash
npm install socket.io
```

On the client:

```html
<script src="https://cdn.socket.io/4.0.0/socket.io.min.js"></script>
```

### Step 2: Set Up the Server with Socket.io

Create a new file called `server-socketio.js`:

```jsx
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

io.on('connection', (socket) => {
  console.log('User connected');

  // Listen for a chat message
  socket.on('chat message', (msg) => {
    console.log(`Message: ${msg}`);
    // Broadcast the message to all users
    io.emit('chat message', msg);
  });

  // Handle user disconnect
  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

server.listen(3000, () => {
  console.log('Listening on port 3000');
});
```

### Step 3: Set Up the Client with Socket.io

In `client.html`, replace the script with:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Chat App</title>
</head>
<body>
  <input id="message" type="text" placeholder="Type a message">
  <button onclick="sendMessage()">Send</button>
  <ul id="messages"></ul>

  <script src="https://cdn.socket.io/4.0.0/socket.io.min.js"></script>
  <script>
    const socket = io('http://localhost:3000');

    socket.on('chat message', (msg) => {
      const item = document.createElement('li');
      item.textContent = msg;
      document.getElementById('messages').appendChild(item);
    });

    function sendMessage() {
      const message = document.getElementById('message').value;
      socket.emit('chat message', message);
      document.getElementById('message').value = '';
    }
  </script>
</body>
</html>
```

Now, run `server-socketio.js` and open `client.html`. This simple setup will allow multiple users to send and receive messages in real time.

---

### 4. Implementing Real-Time Features

### 1. **Chat Application**

We already have a basic chat setup! With Socket.io’s broadcasting capabilities, any message a user sends is visible to all other connected users.

### 2. **Notifications**

Adding notifications is as easy as emitting different events. Let’s add a custom notification event to notify users when someone joins.

In `server-socketio.js`:

```jsx
io.on('connection', (socket) => {
  io.emit('notification', 'A new user has joined the chat!');

  socket.on('disconnect', () => {
    io.emit('notification', 'A user has left the chat.');
  });
});
```

In `client.html`:

```jsx
socket.on('notification', (msg) => {
  const item = document.createElement('li');
  item.style.color = 'blue';
  item.textContent = msg;
  document.getElementById('messages').appendChild(item);
});
```

This adds a system notification whenever a user connects or disconnects.

---

### 5. Wrapping Up with Deployment Tips

To make your real-time app available online, deploy your Node.js application on platforms like **Heroku**, **DigitalOcean**, or **AWS**. Socket.io apps will work seamlessly as long as your platform supports WebSocket connections.

1. **Use HTTPS:** WebSockets require secure HTTPS connections on many platforms.
2. **Scaling with Redis:** For larger applications, use **Redis** for managing sessions and sharing data across multiple instances.
