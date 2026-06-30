import { useState, useRef, useEffect, useCallback } from 'react'

const COMMANDS = {
  help: () => [
    '+--------------------------------------+',
    '|  whoami    -> who is Shourya?          ',
    '|  skills    -> tech stack               ',
    '|  projects  -> what I have built        ',
    '|  contact   -> get in touch             ',
    '|  hire      -> why you should hire me   ',
    '|  clear     -> clear terminal           ',
    '+--------------------------------------+',
  ],
  whoami: () => [
    '> Shourya Mathur',
    '> 3rd year CS @ JECRC University, Jaipur',
    '> Full Stack Developer + AI integrations',
    '> Building real products, not just assignments',
  ],
  skills: () => [
    '> Frontend  → React, Next.js, Tailwind, Framer Motion',
    '> Backend   → Node.js, Express, FastAPI, Python',
    '> Database  → MongoDB, Mongoose, Motor',
    '> AI/Tools  → Claude, Puppeteer, Stripe, Git, GitHub,ChatGPT',
  ],
  projects: () => [
    '> Lost & Found Portal    — FastAPI + React + Claude API',
    '> Event Booking Platform — Next.js 14 + Stripe + MongoDB',
    '> Stitch Automation Tool — Puppeteer + Claude API',
    '> OS Portfolio           — React + Framer Motion (you are here)',
  ],
  contact: () => [
    '> Email    → shourya06175@gmail.com',
    '> GitHub   → github.com/lost-user-23',
    '> LinkedIn → linkedin.com/in/shourya-mathur-4820b0383/',
  ],
  hire: () => [
    '> Loading reasons...',
    '',
    '  ✓ Ships real products with actual users',
    '  ✓ Full stack — frontend to backend to deployment',
    '  ✓ AI integration experience at product level',
    '  ✓ Learns by building, not just watching tutorials',
    '  ✓ You are literally reading this in a portfolio',
    '',
    '> Contact: shourya06175@gmail.com',
  ],
}

const BOOT_LINES = [
  'ShouryaOS v1.0.0',
  "Type 'help' to see available commands.",
  '',
]

let lineCounter = 0

function Terminal() {
  const [history, setHistory] = useState(() =>
    BOOT_LINES.map(line => ({ id: ++lineCounter, type: 'output', text: line }))
  )
  const [input, setInput] = useState('')
  const [cmdHistory, setCmdHistory] = useState([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const bottomRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [history])

  const handleCommand = useCallback((cmd) => {
    const trimmed = cmd.trim().toLowerCase()
    const newLines = [{ id: ++lineCounter, type: 'input', text: `$ ${cmd}` }]

    if (trimmed === 'clear') {
      setHistory(BOOT_LINES.map(line => ({ id: ++lineCounter, type: 'output', text: line })))
      setInput('')
      return
    }

    if (trimmed === '') {
      setHistory(prev => [...prev, ...newLines])
      setInput('')
      return
    }

    if (COMMANDS[trimmed]) {
      const output = COMMANDS[trimmed]().map(line => ({ id: ++lineCounter, type: 'output', text: line }))
      setHistory(prev => [...prev, ...newLines, ...output, { id: ++lineCounter, type: 'output', text: '' }])
    } else {
      newLines.push({ id: ++lineCounter, type: 'error', text: `command not found: ${trimmed}. Type "help" for available commands.` })
      setHistory(prev => [...prev, ...newLines, { id: ++lineCounter, type: 'output', text: '' }])
    }

    setCmdHistory(prev => [trimmed, ...prev])
    setHistoryIndex(-1)
    setInput('')
  }, [])

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Enter') {
      handleCommand(input)
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setCmdHistory(prev => {
        const nextIndex = Math.min(historyIndex + 1, prev.length - 1)
        setHistoryIndex(nextIndex)
        setInput(prev[nextIndex] ?? '')
        return prev
      })
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      const nextIndex = Math.max(historyIndex - 1, -1)
      setHistoryIndex(nextIndex)
      setInput(nextIndex === -1 ? '' : cmdHistory[nextIndex])
    }
  }, [input, historyIndex, cmdHistory, handleCommand])

  return (
    <div
      className="h-full rounded-b-xl font-mono text-xs flex flex-col cursor-text relative overflow-hidden"
      onClick={() => inputRef.current?.focus()}
      onMouseDown={e => e.stopPropagation()}
      style={{ background: '#0c0c0c' }}
    >
      {/* Subtle scan-line overlay */}
      <div
        className="absolute inset-0 pointer-events-none z-10 opacity-[0.03]"
        style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 1px, rgba(255,255,255,0.03) 1px, rgba(255,255,255,0.03) 2px)',
          backgroundSize: '100% 2px',
        }}
      />

      {/* Output history */}
      <div className="flex-1 overflow-auto flex flex-col gap-0.5 p-3 relative z-20">
        {history.map((line) => (
          <p
            key={line.id}
            className={
              line.type === 'input' ? 'text-emerald-400' :
                line.type === 'error' ? 'text-red-400' :
                  'text-zinc-500'
            }
          >
            {line.text || '\u00A0'}
          </p>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Input line */}
      <div className="flex items-center gap-2 border-t border-zinc-800/60 px-3 py-2 relative z-20">
        <span className="text-emerald-500 shrink-0 font-bold text-[10px]">❯</span>
        <input
          ref={inputRef}
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          onMouseDown={e => e.stopPropagation()}
          autoFocus
          className="flex-1 bg-transparent text-emerald-400 outline-none caret-emerald-400 placeholder-zinc-700"
          placeholder="type a command..."
          spellCheck={false}
        />
      </div>
    </div>
  )
}

export default Terminal