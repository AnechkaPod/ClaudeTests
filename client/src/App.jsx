import { useState, useEffect } from 'react'

const API = '/api/todos'

export default function App() {
  const [todos, setTodos] = useState([])
  const [input, setInput] = useState('')

  useEffect(() => {
    fetch(API).then(r => r.json()).then(setTodos)
  }, [])

  async function addTodo(e) {
    e.preventDefault()
    if (!input.trim()) return
    const res = await fetch(API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: input.trim() }),
    })
    const todo = await res.json()
    setTodos(prev => [...prev, todo])
    setInput('')
  }

  async function toggleTodo(todo) {
    const res = await fetch(`${API}/${todo.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...todo, isComplete: !todo.isComplete }),
    })
    const updated = await res.json()
    setTodos(prev => prev.map(t => t.id === updated.id ? updated : t))
  }

  async function deleteTodo(id) {
    await fetch(`${API}/${id}`, { method: 'DELETE' })
    setTodos(prev => prev.filter(t => t.id !== id))
  }

  async function clearCompleted() {
    await fetch(`${API}/completed`, { method: 'DELETE' })
    setTodos(prev => prev.filter(t => !t.isComplete))
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Todo List</h1>

      <form onSubmit={addTodo} style={styles.form}>
        <input
          style={styles.input}
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="What needs to be done?"
        />
        <button style={styles.addBtn} type="submit">Add</button>
      </form>

      <ul style={styles.list}>
        {todos.map(todo => (
          <li key={todo.id} style={styles.item}>
            <input
              type="checkbox"
              checked={todo.isComplete}
              onChange={() => toggleTodo(todo)}
              style={styles.checkbox}
            />
            <span style={{ ...styles.title, ...(todo.isComplete ? styles.done : {}) }}>
              {todo.title}
            </span>
            <button style={styles.deleteBtn} onClick={() => deleteTodo(todo.id)}>✕</button>
          </li>
        ))}
      </ul>

      {todos.some(t => t.isComplete) && (
        <button style={styles.clearBtn} onClick={clearCompleted}>
          Clear completed
        </button>
      )}

      {todos.length === 0 && (
        <p style={styles.empty}>No todos yet. Add one above!</p>
      )}
    </div>
  )
}

const styles = {
  container: {
    maxWidth: 500,
    margin: '60px auto',
    fontFamily: 'system-ui, sans-serif',
    padding: '0 16px',
  },
  heading: {
    fontSize: 28,
    marginBottom: 24,
    color: '#1a1a1a',
  },
  form: {
    display: 'flex',
    gap: 8,
    marginBottom: 24,
  },
  input: {
    flex: 1,
    padding: '10px 14px',
    fontSize: 16,
    border: '1px solid #ccc',
    borderRadius: 6,
    outline: 'none',
  },
  addBtn: {
    padding: '10px 18px',
    fontSize: 16,
    background: '#2563eb',
    color: '#fff',
    border: 'none',
    borderRadius: 6,
    cursor: 'pointer',
  },
  list: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
  },
  item: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    padding: '12px 0',
    borderBottom: '1px solid #eee',
  },
  checkbox: {
    width: 18,
    height: 18,
    cursor: 'pointer',
  },
  title: {
    flex: 1,
    fontSize: 16,
    color: '#1a1a1a',
  },
  done: {
    textDecoration: 'line-through',
    color: '#9ca3af',
  },
  deleteBtn: {
    background: 'none',
    border: 'none',
    color: '#ef4444',
    fontSize: 16,
    cursor: 'pointer',
    padding: '2px 6px',
  },
  empty: {
    color: '#9ca3af',
    textAlign: 'center',
    marginTop: 32,
  },
  clearBtn: {
    marginTop: 16,
    background: 'none',
    border: '1px solid #e5e7eb',
    borderRadius: 6,
    padding: '6px 14px',
    fontSize: 14,
    color: '#6b7280',
    cursor: 'pointer',
  },
}
