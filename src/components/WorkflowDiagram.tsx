import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Brain, Cpu, MessageSquare, Smartphone, Zap } from 'lucide-react';

export default function WorkflowDiagram() {
  const nodes = [
    { id: 'accessibility', title: 'Accessibility Controller', icon: Smartphone, color: '#00D1FF', desc: 'UI Traversal & Action Automation' },
    { id: 'llm_local', title: 'AI Intent Engine', icon: Cpu, color: '#00FF94', desc: 'Fast NLU & Intent Parsing' },
    { id: 'gemini', title: 'Gemini Cloud API', icon: Brain, color: '#FF4B4B', desc: 'Complex Reasoning & Context' }
  ];

  return (
    <div className="bg-[#00D1FF]/5 border border-[#00D1FF]/20 p-8 my-8 relative overflow-hidden">
      <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-12 border-l-2 border-[#00D1FF] pl-3">
        Architecture Workflow Mapping
      </h3>
      
      <div className="flex flex-col md:flex-row items-center justify-between relative z-10 gap-8 md:gap-4">
        {/* Connection Lines (Desktop) */}
        <div className="hidden md:block absolute top-1/2 left-[15%] right-[15%] h-0.5 bg-[#00D1FF]/20 -translate-y-1/2 z-0">
          <motion.div 
            className="h-full bg-[#00D1FF] shadow-[0_0_10px_#00D1FF]"
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>

        {nodes.map((node, i) => (
          <React.Fragment key={node.id}>
            <motion.div 
              className="relative z-10 flex flex-col items-center flex-1 w-full"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
            >
              <div 
                className="w-24 h-24 rounded-2xl flex items-center justify-center mb-4 border-2 shadow-lg backdrop-blur-sm"
                style={{ borderColor: node.color, backgroundColor: `${node.color}10`, boxShadow: `0 0 20px ${node.color}30` }}
              >
                <node.icon className="w-10 h-10" style={{ color: node.color }} />
              </div>
              <h4 className="text-white font-bold text-sm text-center mb-1 h-10">{node.title}</h4>
              <p className="text-[10px] text-center text-[#00D1FF]/70 uppercase tracking-wider">{node.desc}</p>
            </motion.div>
            
            {i < nodes.length - 1 && (
              <div className="md:hidden">
                <ArrowRight className="w-8 h-8 text-[#00D1FF]/50 rotate-90 md:rotate-0" />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>

      <div className="mt-12 p-4 bg-[#020408] border border-[#00D1FF]/30 flex items-start gap-4">
        <Zap className="w-5 h-5 text-yellow-400 shrink-0" />
        <p className="text-[11px] text-[#00D1FF]/80 leading-relaxed font-mono">
          <span className="text-white font-bold">Execution Path:</span> The Accessibility Controller reads the UI tree and passes serialized node data to the AI Intent Engine. If the task requires complex reasoning (e.g. contextual understanding of an image or long text), the query is escalated to the Gemini API. The resulting JSON action sequence is then executed back on the device via the Action Executor.
        </p>
      </div>
    </div>
  );
}
