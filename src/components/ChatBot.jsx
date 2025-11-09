import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const WEBHOOK_URL = 'http://localhost:5678/webhook-test/freaking';

export default function ChatBot() {
  const [messages, setMessages] = useState([
    { role: 'bot', text: 'I kneel before your question. Speak, and I shall answer.' },
  ]);
  const [input, setInput] = useState('');
  const [status, setStatus] = useState('idle'); // idle | slashing | thinking
  const listRef = useRef(null);

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [messages, status]);

  const sendMessage = async () => {
    const content = input.trim();
    if (!content) return;
    setInput('');

    // push user message
    setMessages((m) => [...m, { role: 'user', text: content }]);

    // slash animation
    setStatus('slashing');
    await wait(600);

    // thinking
    setStatus('thinking');

    try {
      const res = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: content }),
      });
      let reply = '...the wind carries back only silence.';
      if (res.ok) {
        const data = await res.json().catch(() => null);
        if (data && (data.reply || data.message || data.text)) {
          reply = data.reply || data.message || data.text;
        } else {
          const text = await res.text();
          if (text) reply = text;
        }
      }
      await wait(400);
      setMessages((m) => [...m, { role: 'bot', text: reply }]);
    } catch (e) {
      setMessages((m) => [...m, { role: 'bot', text: 'The line was cut. Try again.' }]);
    } finally {
      setStatus('idle');
    }
  };

  const onKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <section id="chat" className="relative w-full bg-[#fffaf0] py-24">
      <div className="mx-auto max-w-4xl px-6">
        <header className="mb-8 text-center">
          <h2 className="text-3xl font-semibold tracking-widest text-[#d4af37]" style={{ textShadow: '1px 1px 0 #000' }}>
            The Audience Chamber
          </h2>
          <p className="mt-2 text-black/70">Speak and the Samurai Bot shall answer.</p>
        </header>

        {/* Samurai performing actions overlay */}
        <div className="relative mb-6 flex items-end justify-center">
          <div className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 opacity-90" aria-hidden>
            <SamuraiKneel state={status} />
          </div>
        </div>

        <div className="relative rounded-xl border-4 border-black/10 bg-[#fffaf0]/80 p-4 backdrop-blur-sm">
          <div ref={listRef} className="max-h-[420px] space-y-4 overflow-y-auto pr-2">
            {messages.map((m, idx) => (
              <Bubble key={idx} role={m.role} text={m.text} />
            ))}
            <AnimatePresence>
              {status === 'thinking' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex justify-start"
                >
                  <Bubble role="bot" text="..." thinking />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="mt-4 flex items-center gap-3">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKeyDown}
              rows={2}
              placeholder="Speak with honor..."
              className="flex-1 resize-none rounded-md border-2 border-black/20 bg-[#fffaf0] p-3 text-black placeholder-black/40 focus:outline-none focus:ring-2 focus:ring-[#d4af37]"
            />
            <button
              onClick={sendMessage}
              className="relative inline-flex h-[44px] items-center justify-center whitespace-nowrap px-6 text-black"
            >
              <span className="absolute inset-0 -skew-x-6 rounded-[2px] bg-[#d4af37] shadow-[inset_0_0_0_2px_rgba(0,0,0,0.45)]" />
              <span className="relative font-medium tracking-wider">Send</span>
            </button>
          </div>
        </div>

        <footer className="mt-10 text-center text-[#d4af37]/90" style={{ textShadow: '1px 1px 0 #000' }}>
          Forged by Code. Guided by Honor.
        </footer>
      </div>

      {/* Slash effect layer */}
      <AnimatePresence>
        {status === 'slashing' && <KatanaSlash />}
      </AnimatePresence>
    </section>
  );
}

function Bubble({ role, text, thinking = false }) {
  const isUser = role === 'user';
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className={`max-w-[80%] rounded-md px-4 py-3 text-black ${
          isUser ? 'bg-black/5' : 'bg-black/10'
        }`}
        style={{
          backgroundImage: 'radial-gradient(circle at 10% 10%, rgba(0,0,0,0.08), transparent 40%)',
          border: '3px solid rgba(0,0,0,0.25)',
        }}
      >
        <motion.span
          initial={{ clipPath: 'inset(0 100% 0 0)' }}
          animate={{ clipPath: 'inset(0 0% 0 0)' }}
          transition={{ duration: thinking ? 1 : 0.6, ease: 'easeOut' }}
          className="block whitespace-pre-wrap"
        >
          {text}
        </motion.span>
      </motion.div>
    </div>
  );
}

function KatanaSlash() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center"
    >
      <motion.svg
        width="100%"
        height="100%"
        viewBox="0 0 800 600"
        initial={{ rotate: -8 }}
        animate={{ rotate: 0 }}
      >
        <motion.path
          d="M0 300 Q 200 290 400 300 T 800 300"
          stroke="#000"
          strokeWidth="14"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        />
        <motion.path
          d="M0 320 Q 200 310 400 320 T 800 320"
          stroke="#d4af37"
          strokeWidth="6"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.4, ease: 'easeOut', delay: 0.05 }}
        />
      </motion.svg>
    </motion.div>
  );
}

function SamuraiKneel({ state }) {
  // state: idle | slashing | thinking
  const aura = state === 'thinking';
  return (
    <div className="h-[180px] w-[320px]">
      <svg viewBox="0 0 320 180" className="h-full w-full">
        {aura && (
          <motion.circle
            cx="160"
            cy="120"
            r="64"
            fill="none"
            stroke="#d4af37"
            strokeWidth="2"
            initial={{ opacity: 0.2, scale: 0.95 }}
            animate={{ opacity: [0.2, 0.45, 0.2], scale: [0.95, 1, 0.95] }}
            transition={{ repeat: Infinity, duration: 2.2 }}
            filter="url(#glow)"
          />
        )}
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <g fill="#000" opacity="0.85">
          <path d="M140 120 C 120 140, 100 160, 100 175 L 220 175 C 220 155, 200 140, 180 120 Z" />
          <circle cx="160" cy="90" r="18" />
          <path d="M110 95 C 140 80, 180 80, 210 95" stroke="#000" strokeWidth="8" fill="none" />
          <path d="M190 130 L 250 115" stroke="#000" strokeWidth="10" strokeLinecap="round" />
        </g>
      </svg>
    </div>
  );
}

function wait(ms) {
  return new Promise((r) => setTimeout(r, ms));
}
