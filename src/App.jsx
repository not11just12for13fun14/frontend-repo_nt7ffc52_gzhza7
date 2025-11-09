import { useRef } from 'react'
import { motion } from 'framer-motion'
import Hero from './components/Hero'
import ChatBot from './components/ChatBot'
import ScrollUnroll from './components/ScrollUnroll'
import ParallaxScroll from './components/ParallaxScroll'

function App() {
  const chatRef = useRef(null)

  const handleSummon = () => {
    const el = document.getElementById('chat')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen w-full bg-[#fffaf0] text-black">
      <ParallaxScroll />

      {/* Scroll unrolling container */}
      <ScrollUnroll>
        <Hero onSummon={handleSummon} />

        {/* Scroll transition hint */}
        <div className="relative -mt-12 mb-8 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            whileInView={{ opacity: 0.8, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="rounded-full border-2 border-black/20 bg-[#fffaf0]/70 px-5 py-2 text-sm text-black/70"
          >
            Gently unroll the scroll
          </motion.div>
        </div>

        {/* Chatbot demo */}
        <ChatBot ref={chatRef} />
      </ScrollUnroll>
    </div>
  )
}

export default App
