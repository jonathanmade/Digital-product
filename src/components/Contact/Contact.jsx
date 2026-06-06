import { useState, useRef } from 'react'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import './Contact.css'

const COMMANDS = {
  help: `Available commands:
  ▸ help          — show this message
  ▸ whoami        — about Jonatan
  ▸ skills        — tech stack list
  ▸ clear         — clear terminal
  ▸ sudo hire me  — 🚀`,
  whoami: `Jonatan Marín
  Role:     Data Engineer & BI Developer
  Location: Barcelona, Spain
  Focus:    Microsoft Fabric · Medallion Architecture
  Status:   Open to projects`,
  skills: `Core Stack:
  ▸ Microsoft Fabric   ████████████ 95%
  ▸ Power BI           ████████████ 93%
  ▸ Delta Lake         ████████████ 90%
  ▸ PySpark            ███████████  87%
  ▸ Databricks         ███████████  88%`,
  clear: '__CLEAR__',
  'sudo hire me': `Permission granted ✓

  Initiating contact sequence...
  ▸ LinkedIn:  linkedin.com/in/jonatanmarin
  ▸ Email:     contact@jonatanmarin.dev

  🚀 Let's build something great!`,
}

export default function Contact() {
  const { ref, visible } = useScrollReveal(0.1)
  const [input, setInput] = useState('')
  const [history, setHistory] = useState([
    { type: 'system', text: 'Jonatan Marín Terminal v1.0.0 · Type "help" to start' },
  ])
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)
  const historyRef = useRef(null)

  const runCommand = (cmd) => {
    const trimmed = cmd.trim().toLowerCase()
    const result = COMMANDS[trimmed]
    const newHistory = [
      ...history,
      { type: 'input', text: cmd },
    ]
    if (result === '__CLEAR__') {
      setHistory([{ type: 'system', text: 'Terminal cleared.' }])
    } else if (result) {
      newHistory.push({ type: 'output', text: result })
      setHistory(newHistory)
    } else {
      newHistory.push({ type: 'error', text: `Command not found: ${cmd}. Try "help"` })
      setHistory(newHistory)
    }
    setTimeout(() => {
      if (historyRef.current) historyRef.current.scrollTop = historyRef.current.scrollHeight
    }, 10)
  }

  const onKeyDown = (e) => {
    if (e.key === 'Enter' && input.trim()) {
      runCommand(input)
      setInput('')
    }
  }

  const handleSend = async (e) => {
    e.preventDefault()
    setSending(true)
    await new Promise(r => setTimeout(r, 1200))
    setSending(false)
    setSent(true)
  }

  return (
    <section id="contact" className="contact">
      <div className="section-inner" ref={ref}>
        <div className={`reveal-group${visible ? ' visible' : ''}`}>
          <p className="section-tag">06 · Contact</p>
          <h2 className="section-title">
            Let's <span>Connect</span>
          </h2>
          <p className="section-desc">
            Open to data engineering projects, consulting, and Power BI embedded solutions.
          </p>
        </div>

        <div className={`contact-grid${visible ? ' visible' : ''}`}>
          {/* Terminal easter egg */}
          <div className="terminal-panel">
            <div className="terminal-bar">
              <div className="term-dots">
                <span /><span /><span />
              </div>
              <div className="term-title">bash — jonatan@datalab</div>
            </div>
            <div className="terminal-body" ref={historyRef}>
              {history.map((h, i) => (
                <div key={i} className={`term-line term-${h.type}`}>
                  {h.type === 'input' && <span className="term-prompt">❯ </span>}
                  <pre>{h.text}</pre>
                </div>
              ))}
              <div className="term-input-row">
                <span className="term-prompt">❯ </span>
                <input
                  className="term-input"
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={onKeyDown}
                  placeholder="type a command..."
                  spellCheck={false}
                  autoComplete="off"
                />
              </div>
            </div>
          </div>

          {/* Contact form */}
          <div className="contact-form-panel">
            {sent ? (
              <div className="sent-msg">
                <div className="sent-icon">✓</div>
                <h3>Message sent!</h3>
                <p>I'll get back to you within 24 hours.</p>
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleSend}>
                <div className="form-field">
                  <label className="field-label">// name</label>
                  <input className="field-input" type="text" placeholder="Your name" required />
                </div>
                <div className="form-field">
                  <label className="field-label">// email</label>
                  <input className="field-input" type="email" placeholder="your@email.com" required />
                </div>
                <div className="form-field">
                  <label className="field-label">// message</label>
                  <textarea className="field-input" rows={5} placeholder="Tell me about your project..." required />
                </div>
                <button type="submit" className="btn-neon primary send-btn" disabled={sending}>
                  {sending ? (
                    <span className="sending-spinner">⟳ Sending...</span>
                  ) : (
                    <>send_message --to=jonatan</>
                  )}
                </button>
              </form>
            )}

            <div className="social-links">
              <a
                href="https://linkedin.com/in/jonatanmarin"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
                data-cursor-hover
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                LinkedIn
              </a>
              <a
                href="https://github.com/jonathanmade"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
                data-cursor-hover
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
                </svg>
                GitHub
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
