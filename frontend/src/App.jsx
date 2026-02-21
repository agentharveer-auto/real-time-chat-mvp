import React, { useState, useEffect, useRef } from 'react'

function App() {
  const [messages, setMessages] = useState([])
  const [token, setToken] = useState(null)
  const [input, setInput] = useState('')
  const wsRef = useRef(null)

  useEffect(() => {
    // For MVP, attempt anonymous connection is not allowed; you should login to obtain a token.
  }, [])

  const connect = () => {
    if (!token) return
    const ws = new WebSocket(`ws://localhost:8000/ws/1?token=${token}`)
    ws.onmessage = (evt) => {
      const data = JSON.parse(evt.data)
      setMessages((m) => [...m, data])
    }
    ws.onclose = () => {}
    ws.onerror = () => {}
    wsRef.current = ws
  }

  const send = () => {
    if (wsRef.current && input) {
      wsRef.current.send(input)
      setInput('')
    }
  }

  // Simple dummy login for demonstration; in production you'd handle auth via the backend
  const login = async () => {
    // Placeholder to obtain a token from backend would be implemented here
    // For MVP, skip implementing OAuth flow in UI; user would use curl/test to obtain token
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>Real-Time Chat MVP (Frontend)</h1>
      <p>This is a minimal UI wired for WebSocket chat. See backend for full auth flow.</p>
      <div>
        <input placeholder="Enter JWT token" value={token ?? ''} onChange={(e) => setToken(e.target.value)} />
        <button onClick={connect}>Connect</button>
      </div>
      <div style={{ marginTop: 20, maxHeight: 300, overflowY: 'auto', border: '1px solid #ccc', padding: 10 }}>
        {messages.map((m, idx) => (
          <div key={idx}><strong>{m.user || 'anon'}:</strong> {m.content || m}</div>
        ))}
      </div>
      <div style={{ marginTop: 10 }}>
        <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Message" />
        <button onClick={send}>Send</button>
      </div>
    </div>
  )
}

export default App
