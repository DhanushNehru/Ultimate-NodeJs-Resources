export const documentsData = [
  {
    id: 'inner-working',
    title: 'Inner Working of Node JS',
    category: 'Core Concepts',
    icon: '⚙️',
    content: `# Inner Working of Node JS

![Image](https://cdn.hashnode.com/res/hashnode/image/upload/v1724868037953/af0582e0-a318-4633-9899-fc4fe0b49fb3.png?auto=compress,format&format=webp)

---

### 1. **Clients and Requests:**

- **Client-1 and Client-2** represent users or applications sending requests to the Node.js server.
- **Request-1** and **Request-2** are the tasks or operations these clients want the server to perform (e.g., reading a file, or accessing a database).

### 2. **Event Queue:**

- When a request is received by the server, it is placed in the **Event Queue**.
- The **Event Queue** is like a waiting line where all incoming requests are stored until they can be processed.

### 3. **Single Thread Event Loop:**

- **Event Loop** is the core part of Node.js. It continuously checks the Event Queue to see if there are any tasks (requests) that need to be processed.
- Node.js operates on a **single thread**, which means there is only one main path of execution that handles all tasks. However, it is highly efficient because it doesn't wait for tasks to complete before moving on to the next one.

### 4. **Non-Blocking I/O Requests:**

- The Event Loop checks if a request is **non-blocking** (does not require waiting, like reading from memory).
- If the request is non-blocking, it is processed immediately within the Event Loop, and the response is sent back to the client. This allows Node.js to handle many requests very quickly without waiting.

### 5. **Blocking I/O Requests:**

- If the request is **blocking** (requires waiting, like accessing a database or reading a file from disk), the Event Loop cannot process it immediately.
- Instead, it sends the blocking request to a **Thread Pool** (handled by **libuv**, a library used in Node.js).

### 6. **libuv Thread Pool:**

- The **Thread Pool** contains multiple threads (e.g., T1, T2, T3, etc.) that can handle blocking tasks.
- When the Thread Pool finishes processing a blocking request, it sends the result back to the Event Loop.

### 7. **Sending Responses:**

- Once the Event Loop receives the response from the Thread Pool (for blocking requests) or processes it directly (for non-blocking requests), it sends the response back to the appropriate client.

### 8. **Efficiency:**

- By using this approach, Node.js can efficiently handle many client requests at once without being slowed down by long-running operations. Only the tasks that need waiting (blocking I/O) are sent to the Thread Pool, while other tasks are handled immediately, keeping the system responsive.`
  },
  {
    id: 'file-handling',
    title: 'Handling Files in Node JS',
    category: 'File System',
    icon: '📁',
    content: `# Handling files in Node JS

### To handle the files we have to use the \`fs\` module.

The \`fs\` module is powerful and essential for handling file-related tasks in Node.js, making it a key tool for any server-side application.

To import \`fs\` module:

\`\`\`javascript
const fs = require('fs');
\`\`\`

There are two types of methods:

1. **Synchronous Methods**: These methods block the execution of your code until the operation is complete. They are easier to understand but can slow down your application if used excessively.
2. **Asynchronous Methods**: This allows your program to continue executing while the file operation is performed in the background. They use callbacks or Promises to handle the result.

### **Commonly used functions:**

#### 1. Reading Files:

\`\`\`javascript
// Asynchronous:
const fs = require('fs');

fs.readFile('example.txt', 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log(data);
});
\`\`\`

\`fs.readFile\` reads the contents of a file asynchronously. The callback is called with an error (if any) and the data from the file.

\`\`\`javascript
// Synchronous:
const fs = require('fs');

try {
    const data = fs.readFileSync('example.txt', 'utf8');
    console.log(data);
} catch (err) {
    console.error(err);
}
\`\`\`

\`fs.readFileSync\` reads the file synchronously and returns the data directly. If an error occurs, it must be caught using \`try-catch\`.

#### 2. **Writing Files**:

\`\`\`javascript
// Asynchronous:
const fs = require('fs');

const content = 'This is some content';

fs.writeFile('example.txt', content, err => {
    if (err) {
        console.error(err);
        return;
    }
    console.log('File written successfully');
});
\`\`\`

- \`fs.writeFile\` writes data to a file asynchronously. If the file does not exist, it is created. The callback is executed after the file is written.

\`\`\`javascript
// Synchronous:
const fs = require('fs');

const content = 'This is some content';

try {
    fs.writeFileSync('example.txt', content);
    console.log('File written successfully');
} catch (err) {
    console.error(err);
}
\`\`\`

\`fs.writeFileSync\` writes data to a file synchronously. It blocks the code execution until the operation is complete.`
  },
  {
    id: 'error-handling',
    title: 'Error Handling and Debugging',
    category: 'Best Practices',
    icon: '🐛',
    content: `# Node.js Error Handling and Debugging

Error handling is crucial for building robust Node.js applications. This guide covers various strategies and best practices.

## Types of Errors in Node.js

### 1. **Syntax Errors**
These occur when the JavaScript code is not written correctly.

\`\`\`javascript
// Syntax Error Example
const message = "Hello World" // Missing semicolon
console.log(message)
\`\`\`

### 2. **Runtime Errors**
These occur during the execution of the program.

\`\`\`javascript
// Runtime Error Example
const obj = null;
console.log(obj.property); // TypeError: Cannot read property of null
\`\`\`

### 3. **Logical Errors**
These are errors in the program logic that produce incorrect results.

## Error Handling Strategies

### 1. **Try-Catch Blocks**

\`\`\`javascript
try {
    const data = JSON.parse(invalidJSON);
    console.log(data);
} catch (error) {
    console.error('JSON parsing failed:', error.message);
}
\`\`\`

### 2. **Error-First Callbacks**

\`\`\`javascript
const fs = require('fs');

fs.readFile('file.txt', 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading file:', err.message);
        return;
    }
    console.log('File content:', data);
});
\`\`\`

### 3. **Promise Error Handling**

\`\`\`javascript
const readFilePromise = require('util').promisify(require('fs').readFile);

readFilePromise('file.txt', 'utf8')
    .then(data => {
        console.log('File content:', data);
    })
    .catch(err => {
        console.error('Error reading file:', err.message);
    });
\`\`\`

### 4. **Async/Await Error Handling**

\`\`\`javascript
async function readFile() {
    try {
        const data = await readFilePromise('file.txt', 'utf8');
        console.log('File content:', data);
    } catch (err) {
        console.error('Error reading file:', err.message);
    }
}
\`\`\`

## Debugging Techniques

### 1. **Console Debugging**

\`\`\`javascript
console.log('Debug info:', variable);
console.error('Error occurred:', error);
console.trace('Stack trace');
\`\`\`

### 2. **Node.js Debugger**

\`\`\`bash
node --inspect app.js
\`\`\`

### 3. **VS Code Debugging**
Configure launch.json for integrated debugging in VS Code.

## Best Practices

1. **Always handle errors** - Never ignore potential error conditions
2. **Use specific error messages** - Help developers understand what went wrong
3. **Log errors appropriately** - Use proper logging levels
4. **Fail fast** - Detect and handle errors as early as possible
5. **Use error monitoring tools** - Implement proper error tracking in production`
  },
  {
    id: 'concepts-checklist',
    title: 'Node.js Concepts Checklist',
    category: 'Learning Path',
    icon: '✅',
    content: `# Node.js Concepts Checklist

A curated list of Node.js concepts to help learners track their progress. Mark each item ✅ as you master it.

## Basics

- [ ] What is Node.js and its use cases
- [ ] Installing Node.js and npm
- [ ] Understanding Node.js runtime and V8 engine
- [ ] Node.js REPL (Read-Eval-Print Loop)
- [ ] Event Loop and Asynchronous Programming
- [ ] Global Objects in Node.js (\`__dirname\`, \`__filename\`, \`global\`)

## Core Modules

- [ ] File System (\`fs\`) – reading/writing files, streams
- [ ] Path module (\`path\`) – handling file paths
- [ ] OS module (\`os\`) – system information
- [ ] HTTP/HTTPS module – creating servers, making requests
- [ ] Events module – EventEmitter usage
- [ ] Timers module (\`setTimeout\`, \`setInterval\`, \`setImmediate\`, \`process.nextTick\`)

## NPM & Modules

- [ ] Creating and exporting custom modules
- [ ] Importing modules (CommonJS \`require\`, ES Modules \`import\`)
- [ ] Understanding package.json
- [ ] Installing dependencies and devDependencies
- [ ] Semantic versioning in npm
- [ ] Using popular packages (e.g., Express, dotenv, axios)

## Advanced Node.js

- [ ] Streams (Readable, Writable, Duplex, Transform)
- [ ] Buffers and binary data
- [ ] Error handling patterns (try/catch, callbacks, Promises)
- [ ] Debugging Node.js applications
- [ ] Process object and environment variables
- [ ] Child processes (\`child_process\` module)
- [ ] Cluster module for scaling

## Networking & APIs

- [ ] Building HTTP servers with Express.js
- [ ] REST API design principles
- [ ] WebSockets for real-time communication
- [ ] Middleware in Express
- [ ] Routing and route parameters
- [ ] Working with JSON and query parameters

## Database Integration

- [ ] Connecting to databases (MongoDB, MySQL, PostgreSQL)
- [ ] Using ORMs (Mongoose, Sequelize, Prisma)
- [ ] Database connection pooling
- [ ] Handling database transactions

## Security

- [ ] Input validation and sanitization
- [ ] Authentication and authorization
- [ ] HTTPS and SSL/TLS
- [ ] Preventing common vulnerabilities (XSS, CSRF, SQL injection)
- [ ] Rate limiting and DDoS protection

## Performance & Optimization

- [ ] Profiling Node.js applications
- [ ] Memory management and leak detection
- [ ] Caching strategies (in-memory, Redis)
- [ ] Load balancing and clustering
- [ ] Monitoring and logging

## Testing

- [ ] Unit testing with Jest or Mocha
- [ ] Integration testing
- [ ] API testing with tools like Supertest
- [ ] Test coverage analysis
- [ ] Mocking and stubbing

## Deployment & DevOps

- [ ] Environment configuration
- [ ] Process managers (PM2, Forever)
- [ ] Containerization with Docker
- [ ] CI/CD pipelines
- [ ] Cloud deployment (AWS, Google Cloud, Azure)`
  },
  {
    id: 'template-engines',
    title: 'Template Engines - EJS',
    category: 'Web Development',
    icon: '🎨',
    content: `# Template Engines - EJS

EJS (Embedded JavaScript) is a simple templating language that lets you generate HTML markup with plain JavaScript.

## What is EJS?

EJS is a template engine that allows you to embed JavaScript code directly into your HTML templates. It's particularly useful for server-side rendering in Node.js applications.

## Installation

\`\`\`bash
npm install ejs
\`\`\`

## Basic Usage

### Setting up EJS with Express

\`\`\`javascript
const express = require('express');
const app = express();

// Set EJS as the template engine
app.set('view engine', 'ejs');

// Set the views directory
app.set('views', './views');

app.get('/', (req, res) => {
    res.render('index', { title: 'Home Page', message: 'Welcome to EJS!' });
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
\`\`\`

### Creating EJS Templates

Create a file \`views/index.ejs\`:

\`\`\`html
<!DOCTYPE html>
<html>
<head>
    <title><%= title %></title>
</head>
<body>
    <h1><%= message %></h1>
    <p>Current time: <%= new Date() %></p>
</body>
</html>
\`\`\`

## EJS Syntax

### 1. **Output Tags**

\`\`\`ejs
<%= variable %> <!-- Escaped output -->
<%- variable %> <!-- Unescaped output -->
\`\`\`

### 2. **Control Flow**

\`\`\`ejs
<% if (user) { %>
    <p>Hello, <%= user.name %>!</p>
<% } else { %>
    <p>Please log in</p>
<% } %>
\`\`\`

### 3. **Loops**

\`\`\`ejs
<ul>
<% users.forEach(function(user) { %>
    <li><%= user.name %> - <%= user.email %></li>
<% }); %>
</ul>
\`\`\`

### 4. **Including Partials**

\`\`\`ejs
<%- include('partials/header') %>
<main>
    <h1>Main Content</h1>
</main>
<%- include('partials/footer') %>
\`\`\`

## Advanced Features

### Passing Data to Templates

\`\`\`javascript
app.get('/users', (req, res) => {
    const users = [
        { name: 'John', email: 'john@example.com' },
        { name: 'Jane', email: 'jane@example.com' }
    ];
    
    res.render('users', { 
        title: 'Users List',
        users: users,
        currentUser: req.user
    });
});
\`\`\`

### Layout Templates

Create a layout file \`views/layout.ejs\`:

\`\`\`html
<!DOCTYPE html>
<html>
<head>
    <title><%= title %></title>
    <link rel="stylesheet" href="/css/style.css">
</head>
<body>
    <header>
        <%- include('partials/navigation') %>
    </header>
    
    <main>
        <%- body %>
    </main>
    
    <footer>
        <%- include('partials/footer') %>
    </footer>
</body>
</html>
\`\`\`

## Best Practices

1. **Organize templates** - Use a clear folder structure for your views
2. **Use partials** - Break down templates into reusable components
3. **Validate data** - Always validate data before passing to templates
4. **Escape output** - Use \`<%=\` for user input to prevent XSS attacks
5. **Keep logic minimal** - Move complex logic to controllers/middleware`
  },
  {
    id: 'websockets',
    title: 'WebSockets and Real-time Applications',
    category: 'Real-time',
    icon: '🔌',
    content: `# WebSockets and Real-time Applications

WebSockets provide a persistent, full-duplex communication channel between the client and server, enabling real-time applications.

## What are WebSockets?

WebSockets allow for two-way communication between a client and server over a single TCP connection. Unlike traditional HTTP requests, WebSockets maintain an open connection, allowing for instant data exchange.

## Key Features

- **Full-duplex communication** - Both client and server can send data at any time
- **Low latency** - No need for request/response cycle
- **Persistent connection** - Connection stays open until explicitly closed
- **Real-time updates** - Perfect for live applications

## Setting up WebSockets in Node.js

### Using Socket.IO

\`\`\`bash
npm install socket.io express
\`\`\`

### Server Setup

\`\`\`javascript
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Serve static files
app.use(express.static('public'));

// Handle socket connections
io.on('connection', (socket) => {
    console.log('New client connected:', socket.id);
    
    // Listen for messages
    socket.on('message', (data) => {
        console.log('Message received:', data);
        
        // Broadcast to all clients
        io.emit('message', {
            id: socket.id,
            text: data.text,
            timestamp: new Date()
        });
    });
    
    // Handle disconnection
    socket.on('disconnect', () => {
        console.log('Client disconnected:', socket.id);
    });
});

server.listen(3000, () => {
    console.log('Server running on port 3000');
});
\`\`\`

### Client Setup

\`\`\`html
<!DOCTYPE html>
<html>
<head>
    <title>WebSocket Chat</title>
</head>
<body>
    <div id="messages"></div>
    <input type="text" id="messageInput" placeholder="Type a message...">
    <button onclick="sendMessage()">Send</button>

    <script src="/socket.io/socket.io.js"></script>
    <script>
        const socket = io();
        
        // Listen for messages
        socket.on('message', (data) => {
            const messagesDiv = document.getElementById('messages');
            messagesDiv.innerHTML += \`<p><strong>\${data.id}:</strong> \${data.text}</p>\`;
        });
        
        function sendMessage() {
            const input = document.getElementById('messageInput');
            const message = input.value.trim();
            
            if (message) {
                socket.emit('message', { text: message });
                input.value = '';
            }
        }
        
        // Send message on Enter key
        document.getElementById('messageInput').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
    </script>
</body>
</html>
\`\`\`

## Common Use Cases

### 1. **Chat Applications**

\`\`\`javascript
// Room-based chat
socket.on('join-room', (room) => {
    socket.join(room);
    socket.to(room).emit('user-joined', { user: socket.id });
});

socket.on('chat-message', (data) => {
    io.to(data.room).emit('message', {
        user: socket.id,
        message: data.message,
        timestamp: new Date()
    });
});
\`\`\`

### 2. **Live Notifications**

\`\`\`javascript
// Send notification to specific user
function sendNotification(userId, notification) {
    io.to(userId).emit('notification', {
        type: 'info',
        message: notification.message,
        timestamp: new Date()
    });
}
\`\`\`

### 3. **Real-time Updates**

\`\`\`javascript
// Broadcast data updates
function broadcastUpdate(data) {
    io.emit('data-update', {
        type: 'user-count',
        count: getActiveUserCount(),
        data: data
    });
}
\`\`\`

## Advanced Features

### Authentication

\`\`\`javascript
io.use((socket, next) => {
    const token = socket.handshake.auth.token;
    
    if (isValidToken(token)) {
        socket.userId = getUserFromToken(token);
        next();
    } else {
        next(new Error('Authentication error'));
    }
});
\`\`\`

### Rate Limiting

\`\`\`javascript
const rateLimit = new Map();

socket.on('message', (data) => {
    const userId = socket.userId;
    const now = Date.now();
    
    if (!rateLimit.has(userId)) {
        rateLimit.set(userId, { count: 1, lastMessage: now });
    } else {
        const userLimit = rateLimit.get(userId);
        
        if (now - userLimit.lastMessage < 1000) { // 1 message per second
            userLimit.count++;
            if (userLimit.count > 5) {
                socket.emit('rate-limit-exceeded');
                return;
            }
        } else {
            userLimit.count = 1;
        }
        
        userLimit.lastMessage = now;
    }
    
    // Process message
    io.emit('message', data);
});
\`\`\`

## Best Practices

1. **Handle disconnections gracefully** - Clean up resources when clients disconnect
2. **Implement authentication** - Verify user identity before allowing connections
3. **Use rooms and namespaces** - Organize clients into logical groups
4. **Implement rate limiting** - Prevent abuse and spam
5. **Error handling** - Properly handle connection errors and timeouts
6. **Scale horizontally** - Use Redis adapter for multiple server instances`
  }
]