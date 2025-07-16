---
layout: layouts/base.njk
title: "Getting Started Guide"
lang: en
slug: "docs/getting-started"
permalink: /en/docs/getting-started/
eleventyNavigation:
  key: getting-started
  parent: docs
  order: 1
---

# Getting Started Guide

Welcome! This guide will help you get up and running quickly with our platform. By the end of this guide, you'll have a fully functional development environment and understand the core concepts.

## Prerequisites

Before you begin, make sure you have:

- ✅ [Installed the application](/en/docs/installation/)
- ✅ Basic command line familiarity
- ✅ A text editor (VS Code, Sublime Text, etc.)
- ✅ 15 minutes of time

## Quick Start

### 1. Create Your First Project

```bash
# Create a new project
myapp create my-first-project

# Navigate to the project directory
cd my-first-project

# Start the development server
npm run dev
```

Your application is now running at `http://localhost:3000` 🎉

### 2. Project Structure

Your new project has the following structure:

```
my-first-project/
├── src/
│   ├── components/     # Reusable components
│   ├── pages/         # Application pages
│   ├── services/      # Business logic
│   └── utils/         # Helper functions
├── public/            # Static assets
├── config/            # Configuration files
├── tests/             # Test files
├── package.json       # Dependencies
└── README.md          # Project documentation
```

### 3. Make Your First Change

Open `src/pages/index.js` in your editor:

```javascript
export default function HomePage() {
  return (
    <div>
      <h1>Welcome to MyApp!</h1>
      <p>Edit this file to see live changes.</p>
    </div>
  );
}
```

Change the heading text and save. Your browser will automatically refresh!

## Core Concepts

### Components

Components are the building blocks of your application. Create a new component:

```javascript
// src/components/Greeting.js
export default function Greeting({ name }) {
  return <h2>Hello, {name}!</h2>;
}
```

Use it in your pages:

```javascript
import Greeting from '../components/Greeting';

export default function HomePage() {
  return (
    <div>
      <Greeting name="World" />
    </div>
  );
}
```

### Routing

Routes are automatically created based on your file structure:

- `src/pages/index.js` → `/`
- `src/pages/about.js` → `/about`
- `src/pages/blog/[slug].js` → `/blog/:slug`

### Data Fetching

Fetch data in your components:

```javascript
import { useState, useEffect } from 'react';

export default function UserList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('/api/users')
      .then(res => res.json())
      .then(data => setUsers(data));
  }, []);

  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}
```

### State Management

Manage application state with our built-in store:

```javascript
import { useStore } from '../store';

export default function Counter() {
  const { count, increment, decrement } = useStore();

  return (
    <div>
      <h3>Count: {count}</h3>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
    </div>
  );
}
```

## Your First Application

Let's build a simple todo list application to understand the workflow.

### Step 1: Create the Todo Component

Create `src/components/TodoItem.js`:

```javascript
export default function TodoItem({ todo, onToggle, onDelete }) {
  return (
    <li className={todo.completed ? 'completed' : ''}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
      />
      <span>{todo.text}</span>
      <button onClick={() => onDelete(todo.id)}>Delete</button>
    </li>
  );
}
```

### Step 2: Create the Todo List Page

Create `src/pages/todos.js`:

```javascript
import { useState } from 'react';
import TodoItem from '../components/TodoItem';

export default function TodosPage() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');

  const addTodo = () => {
    if (input.trim()) {
      setTodos([...todos, {
        id: Date.now(),
        text: input,
        completed: false
      }]);
      setInput('');
    }
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div className="todos">
      <h1>My Todo List</h1>
      
      <div className="add-todo">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && addTodo()}
          placeholder="Add a new todo..."
        />
        <button onClick={addTodo}>Add</button>
      </div>

      <ul className="todo-list">
        {todos.map(todo => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggle={toggleTodo}
            onDelete={deleteTodo}
          />
        ))}
      </ul>
    </div>
  );
}
```

### Step 3: Add Styling

Create `src/styles/todos.css`:

```css
.todos {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}

.add-todo {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.add-todo input {
  flex: 1;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.todo-list {
  list-style: none;
  padding: 0;
}

.todo-list li {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
  border-bottom: 1px solid #eee;
}

.todo-list li.completed span {
  text-decoration: line-through;
  opacity: 0.6;
}
```

### Step 4: Test Your Application

Navigate to `http://localhost:3000/todos` and try:

1. Adding new todos
2. Marking todos as complete
3. Deleting todos

Congratulations! You've built your first application 🎉

## Development Workflow

### 1. Development Server

Run the development server with hot reload:

```bash
npm run dev
```

### 2. Testing

Run tests to ensure your code works:

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run specific test file
npm test TodoItem.test.js
```

### 3. Building for Production

Create an optimized production build:

```bash
npm run build
```

### 4. Code Quality

Ensure code quality with linting:

```bash
# Check code style
npm run lint

# Fix auto-fixable issues
npm run lint -- --fix
```

## Common Patterns

### API Integration

Create a service to handle API calls:

```javascript
// src/services/api.js
const API_URL = process.env.API_URL || 'http://localhost:3000/api';

export async function fetchUsers() {
  const response = await fetch(`${API_URL}/users`);
  if (!response.ok) throw new Error('Failed to fetch users');
  return response.json();
}

export async function createUser(userData) {
  const response = await fetch(`${API_URL}/users`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData)
  });
  if (!response.ok) throw new Error('Failed to create user');
  return response.json();
}
```

### Error Handling

Implement proper error handling:

```javascript
import { useState, useEffect } from 'react';
import { fetchUsers } from '../services/api';

export default function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUsers()
      .then(setUsers)
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}
```

### Custom Hooks

Create reusable logic with custom hooks:

```javascript
// src/hooks/useLocalStorage.js
import { useState, useEffect } from 'react';

export function useLocalStorage(key, defaultValue) {
  const [value, setValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      return defaultValue;
    }
  });

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}
```

## Best Practices

### 1. File Organization

- Keep components small and focused
- Group related files together
- Use clear, descriptive names

### 2. Code Style

- Use consistent formatting
- Write self-documenting code
- Add comments for complex logic

### 3. Performance

- Lazy load large components
- Optimize images and assets
- Use caching strategically

### 4. Security

- Never expose sensitive data
- Validate all user input
- Use HTTPS in production

## Troubleshooting

### Common Issues

**Issue**: Changes not reflecting in browser
```bash
# Clear cache and restart
rm -rf .next
npm run dev
```

**Issue**: Module not found errors
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

**Issue**: Port already in use
```bash
# Use a different port
PORT=3001 npm run dev
```

## Next Steps

Now that you understand the basics:

1. 📚 Explore the [API Reference](/en/docs/api/) to learn about available endpoints
2. 🚀 Read the [Deployment Guide](/en/docs/deployment/) to publish your app
3. ⚙️ Check the [Configuration Guide](/en/docs/configuration/) for customization
4. 🎯 Browse [examples](https://github.com/yourorg/examples) for inspiration

## Need Help?

- 💬 Join our [Discord community](https://discord.gg/xxxxx)
- 📧 Email support at support@example.com
- 🐛 Report issues on [GitHub](https://github.com/yourorg/yourrepo/issues)

Happy coding! 🚀

---

*Last updated: January 2024*