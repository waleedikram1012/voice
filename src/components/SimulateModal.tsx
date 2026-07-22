import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mic, X, Terminal, Play } from 'lucide-react';

interface SimulateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSimulate: (command: string) => void;
}

export default function SimulateModal({ isOpen, onClose, onSimulate }: SimulateModalProps) {
  const [command, setCommand] = useState("Open WhatsApp, Send Message, Close App");

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-[#020408]/80 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="w-full max-w-lg bg-[#020408] border border-[#00D1FF]/30 shadow-[0_0_30px_rgba(0,209,255,0.15)] flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-[#00D1FF]/30 bg-[#00D1FF]/5">
              <div className="flex items-center gap-2 text-white">
                <Mic className="w-5 h-5 text-[#00D1FF]" />
                <span className="font-bold tracking-widest text-sm uppercase">Simulate Command</span>
              </div>
              <button onClick={onClose} className="text-[#00D1FF]/50 hover:text-[#FF4B4B] transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Body */}
            <div className="p-6 space-y-4">
              <p className="text-xs text-[#00D1FF]/70 uppercase tracking-widest font-mono">
                Enter multi-step sequence to map in terminal:
              </p>
              <textarea
                value={command}
                onChange={(e) => setCommand(e.target.value)}
                className="w-full h-24 bg-[#00D1FF]/5 border border-[#00D1FF]/30 p-3 text-sm text-white focus:outline-none focus:border-[#00D1FF] font-mono resize-none shadow-[inset_0_0_10px_rgba(0,209,255,0.05)]"
              />
              
              <div className="flex justify-end gap-3 mt-6">
                <button 
                  onClick={onClose} 
                  className="px-4 py-2 border border-[#00D1FF]/30 text-[#00D1FF]/70 hover:text-[#00D1FF] hover:bg-[#00D1FF]/10 text-xs font-bold uppercase tracking-widest transition-colors font-mono"
                >
                  Cancel
                </button>
                <button 
                  onClick={() => {
                    onSimulate(command);
                    onClose();
                  }}
                  className="px-4 py-2 bg-[#00D1FF]/20 border border-[#00D1FF]/50 text-white hover:bg-[#00D1FF]/30 text-xs font-bold uppercase tracking-widest transition-colors flex items-center gap-2 font-mono"
                >
                  <Play className="w-4 h-4 text-[#00FF94]" />
                  Execute
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
