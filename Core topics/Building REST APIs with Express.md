# Building REST APIs with Express

## Intro to building REST APIs with Express

This topic gives a concise, practical guide to building RESTful APIs using Express.js. It includes a minimal project setup, example code, common patterns, error handling, testing, and tips for production.

### Prerequisites
- Node.js (LTS)
- npm or yarn

### Quick setup

1. **Create a new folder for the API:**
```bash
mkdir my-api && cd my-api
```

2. **Initialize project:**
```bash
npm init -y
```

3. **Install dependencies:**
```bash
npm install express
```

### Minimal example (index.js)
```js
const express = require('express')
const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

// In-memory data (example)
let todos = [
    { id: 1, title: 'Buy milk', completed: false },
    { id: 2, title: 'Write docs', completed: false }
]

// Routes
app.get('/todos', (req, res) => {
    res.json(todos)
})

// Get a single todo with a dynamic ID
app.get('/todos/:id', (req, res) => {
    const id = Number(req.params.id)
    const item = todos.find(t => t.id === id)
    // If not found, return 404
    if (!item) return res.status(404).json({ error: 'Not found' })
    // If found, return the item
    res.json(item)
})

// Create a new todo using a POST request
app.post('/todos', (req, res) => {
    const { title } = req.body
    // Validate request body
    if (!title) return res.status(400).json({ error: 'Title is required' })
    const newItem = { id: Date.now(), title, completed: false }
    todos.push(newItem)
    // Return 201 Created with the new item
    res.status(201).json(newItem)
})

// Update a todo (PUT request)
app.put('/todos/:id', (req, res) => {
    const id = Number(req.params.id)
    const { title, completed } = req.body
    const idx = todos.findIndex(t => t.id === id)
    if (idx === -1) return res.status(404).json({ error: 'Not found' })
    todos[idx] = { ...todos[idx], title: title ?? todos[idx].title, completed: completed ?? todos[idx].completed }
    res.json(todos[idx])
})

// Delete a todo
app.delete('/todos/:id', (req, res) => {
    const id = Number(req.params.id)
    const idx = todos.findIndex(t => t.id === id)
    if (idx === -1) return res.status(404).json({ error: 'Not found' })
    const [deleted] = todos.splice(idx, 1)
    res.json(deleted)
})

// Global error handler
app.use((err, req, res, next) => {
    console.error(err)
    res.status(500).json({ error: 'Internal Server Error' })
})

// Start server
app.listen(port, () => console.log(`API running on http://localhost:${port}`))
```

### Testing with curl

- **List todos:**
```bash
curl http://localhost:3000/todos
```

- **Create a todo:**
```bash
curl -X POST http://localhost:3000/todos -H "Content-Type: application/json" -d '{"title":"New task"}'
```

- **Update a todo:**
```bash
curl -X PUT http://localhost:3000/todos/1 -H "Content-Type: application/json" -d '{"completed":true}'
```

- **Delete a todo:**
```bash
curl -X DELETE http://localhost:3000/todos/1
```

### Notes and next steps

- For production use add input validation (e.g., Joi), structured logging, CORS, helmet, rate limiting, and tests.
- Use a database (Postgres, MongoDB) instead of in-memory arrays.
- Consider using TypeScript for better DX and maintainability.

### References
- Express quick start: https://expressjs.com/en/starter/hello-world.html
- Best practices: https://expressjs.com/en/advanced/best-practice-security.html