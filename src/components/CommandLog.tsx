import React, { useState, useEffect, useRef } from 'react';
import { Terminal, Shield, Cpu, Code2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const MOCK_LOGS = [
  { text: "Initializing NLU Parser...", type: "system", delay: 1000 },
  { text: "Listening on AudioRecord channel (16kHz, Mono)...", type: "system", delay: 2000 },
  { text: "Wake word 'JARVIS' detected. Confidence: 0.98", type: "event", delay: 3500 },
  { text: "Audio buffered. Forwarding to Local Whisper STT.", type: "system", delay: 4000 },
  { text: "Transcription: \"Open WhatsApp and send Ali I'm on my way\"", type: "user", delay: 5500 },
  { text: "Routing to Local LLM Intent Parser...", type: "system", delay: 6000 },
  { text: "Intent Identified: MULTI_STEP_AUTOMATION", type: "success", delay: 7500 },
  { text: "Resolving 'Ali' to URI: content://com.android.contacts/data/1294...", type: "system", delay: 8500 },
  { text: "Pushing actions to Accessibility Queue", type: "system", delay: 9000 },
  { text: "Executing: Launching com.whatsapp", type: "action", delay: 9500 },
  { text: "Waiting for AccessibilityFocus on WhatsApp MainActivity...", type: "system", delay: 10500 },
  { text: "Focus Acquired. Injecting ACTION_CLICK on Search Icon...", type: "action", delay: 11500 }
];

export default function CommandLog() {
  const [logs, setLogs] = useState<{text: string, type: string, id: number}[]>([]);
  const [isExpanded, setIsExpanded] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    let timeouts: ReturnType<typeof setTimeout>[] = [];
    
    const playLogs = (logArray: any[]) => {
      timeouts.forEach(clearTimeout);
      timeouts = [];
      setLogs([]);
      logArray.forEach((log, index) => {
        const timeout = setTimeout(() => {
          setLogs(prev => [...prev, { text: log.text, type: log.type, id: Date.now() + index }]);
        }, log.delay);
        timeouts.push(timeout);
      });
    };

    // Auto-play the mock logs initially
    playLogs(MOCK_LOGS);

    const handleSimulate = (e: Event) => {
      const customEvent = e as CustomEvent;
      const command = customEvent.detail;
      
      setIsExpanded(true);

      const newLogs = [
        { text: "Simulated Input Detected...", type: "system", delay: 500 },
        { text: `Input: "${command}"`, type: "user", delay: 1500 },
        { text: "Routing to Local LLM Intent Parser...", type: "system", delay: 2500 },
        { text: "Intent Identified: MULTI_STEP_AUTOMATION", type: "success", delay: 4000 },
        { text: "Pushing actions to Accessibility Queue...", type: "system", delay: 5000 },
        { text: "Executing sequence...", type: "action", delay: 6500 },
        { text: "Awaiting AccessibilityFocus...", type: "system", delay: 8000 },
        { text: "Focus Acquired. Injecting ACTION_CLICK...", type: "action", delay: 9500 },
        { text: "Sequence execution completed.", type: "success", delay: 11000 }
      ];
      
      playLogs(newLogs);
    };

    window.addEventListener('simulate-command', handleSimulate);
    return () => {
      window.removeEventListener('simulate-command', handleSimulate);
      timeouts.forEach(clearTimeout);
    };
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs, isExpanded]);

  const getLogColor = (type: string) => {
    switch (type) {
      case 'system': return 'text-[#00D1FF]/70';
      case 'event': return 'text-yellow-400';
      case 'user': return 'text-white italic';
      case 'success': return 'text-[#00FF94] font-bold';
      case 'action': return 'text-[#FF4B4B]';
      default: return 'text-[#00D1FF]/70';
    }
  };

  return (
    <div className={`fixed bottom-4 right-4 z-50 bg-[#020408]/95 border border-[#00D1FF]/30 shadow-[0_0_20px_rgba(0,209,255,0.15)] backdrop-blur-md transition-all duration-500 ease-in-out ${isExpanded ? 'w-[400px] h-[300px]' : 'w-[300px] h-12'} flex flex-col`}>
      {/* Header */}
      <button 
        onClick={() => setIsExpanded(!isExpanded)}
        className="h-12 w-full flex items-center justify-between px-4 border-b border-[#00D1FF]/30 hover:bg-[#00D1FF]/5 transition-colors cursor-pointer shrink-0"
      >
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-[#00D1FF]" />
          <span className="text-[10px] font-bold uppercase tracking-widest text-white">Live Command Log</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[#00FF94] animate-pulse"></div>
          <span className="text-[9px] text-[#00FF94] uppercase opacity-70">{isExpanded ? 'Minimize' : 'Expand'}</span>
        </div>
      </button>

      {/* Log Body */}
      <div 
        ref={scrollRef}
        className={`flex-1 overflow-y-auto p-4 space-y-2 transition-opacity duration-300 ${isExpanded ? 'opacity-100' : 'opacity-0 hidden'}`}
      >
        <AnimatePresence initial={false}>
          {logs.map((log) => (
            <motion.div
              key={log.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-[10px] font-mono leading-relaxed flex items-start gap-2"
            >
              <span className="text-[#00D1FF]/40 shrink-0">[{new Date().toLocaleTimeString([], { hour12: false, second: '2-digit' })}]</span>
              <span className={getLogColor(log.type)}>{log.text}</span>
            </motion.div>
          ))}
        </AnimatePresence>
        {logs.length === 0 && (
          <div className="text-[10px] text-[#00D1FF]/40 italic">Awaiting voice input...</div>
        )}
      </div>
      
      {/* Footer when expanded */}
      {isExpanded && (
        <div className="h-8 border-t border-[#00D1FF]/20 px-4 flex items-center bg-[#00D1FF]/5 shrink-0">
          <div className="flex items-center gap-3">
            <Cpu className="w-3 h-3 text-[#00D1FF]/50" />
            <Shield className="w-3 h-3 text-[#00FF94]/50" />
            <Code2 className="w-3 h-3 text-[#FF4B4B]/50" />
          </div>
          <div className="ml-auto text-[8px] text-[#00D1FF]/40 uppercase tracking-widest">
            AETHER-1 VIRTUAL TERMINAL
          </div>
        </div>
      )}
    </div>
  );
}
