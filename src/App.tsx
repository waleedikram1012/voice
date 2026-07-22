import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Cpu,
  Network,
  ShieldAlert,
  AlertOctagon,
  FolderTree,
  Workflow,
  Map as MapIcon,
  Menu,
  X,
  ChevronRight,
  Terminal,
  Search,
  Activity,
  WifiOff,
  Mic
} from 'lucide-react';
import { SECTIONS, CONTENT_DATA, SectionId } from './data';
import MetricsVisualization from './components/MetricsVisualization';
import WorkflowDiagram from './components/WorkflowDiagram';
import PermissionsGrid from './components/PermissionsGrid';
import CommandLog from './components/CommandLog';
import SimulateModal from './components/SimulateModal';

const Icons: Record<string, React.ElementType> = {
  Cpu,
  Network,
  ShieldAlert,
  AlertOctagon,
  FolderTree,
  Workflow,
  Map: MapIcon,
  Activity,
};

function MarkdownRenderer({ content, sectionId }: { content: string, sectionId: SectionId }) {
  // A simplistic custom renderer for our specific markdown format
  const blocks = content.split('\n\n');

  return (
    <div className="space-y-4 text-[#00D1FF]/80 leading-relaxed relative">
      {blocks.map((block, index) => {
        if (block.startsWith('### ')) {
          return (
            <h3 key={index} className="text-sm font-bold text-white mt-8 mb-4 tracking-widest flex items-center uppercase border-l-2 border-[#00D1FF] pl-2">
              {block.replace('### ', '')}
            </h3>
          );
        }
        if (block.startsWith('```')) {
          const code = block.replace(/```[a-z]*\n/, '').replace(/```$/, '');
          return (
            <div key={index} className="relative group overflow-hidden bg-[#00D1FF]/5 border border-[#00D1FF]/20 my-6">
              <div className="absolute top-0 left-0 w-full h-6 bg-[#00D1FF]/10 border-b border-[#00D1FF]/20 flex items-center px-4">
                <span className="text-[10px] font-bold uppercase text-[#00D1FF]">Terminal</span>
              </div>
              <pre className="p-4 pt-10 overflow-x-auto text-[11px] font-mono text-[#00FF94]">
                <code>{code}</code>
              </pre>
            </div>
          );
        }
        if (block.startsWith('*   ')) {
          const items = block.split('\n').filter(i => i.trim().startsWith('* '));
          return (
            <ul key={index} className="space-y-3 my-4">
              {items.map((item, i) => {
                const parts = item.replace('*   ', '').split(':');
                return (
                  <li key={i} className="flex items-start text-xs">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00FF94] mt-1.5 mr-3 flex-shrink-0 shadow-[0_0_8px_rgba(0,255,148,0.8)]" />
                    <span>
                      {parts.length > 1 ? (
                        <>
                          <strong className="text-white">{parts[0]}:</strong>
                          {parts.slice(1).join(':')}
                        </>
                      ) : (
                        item.replace('*   ', '')
                      )}
                    </span>
                  </li>
                );
              })}
            </ul>
          );
        }
        
        // Handle bolding within normal text paragraphs roughly
        const formattedText = block.split(/(\*\*.*?\*\*|\`.*?\`)/g).map((part, i) => {
          if (part.startsWith('**') && part.endsWith('**')) {
            return <strong key={i} className="text-white">{part.slice(2, -2)}</strong>;
          }
          if (part.startsWith('`') && part.endsWith('`')) {
            return <code key={i} className="font-mono text-[#00FF94] bg-[#00FF94]/10 px-1 rounded text-xs">{part.slice(1, -1)}</code>;
          }
          return part;
        });

        return <p key={index} className="mb-4 text-xs">{formattedText}</p>;
      })}
      
      {/* Inject custom components based on sectionId */}
      {sectionId === 'metrics' && <MetricsVisualization />}
      {sectionId === 'user-flow' && <WorkflowDiagram />}
      {sectionId === 'permissions' && <PermissionsGrid />}
    </div>
  );
}

export default function App() {
  const [activeSection, setActiveSection] = useState<SectionId>('overview');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isOfflineMode, setIsOfflineMode] = useState(false);
  const [isSimulateModalOpen, setIsSimulateModalOpen] = useState(false);

  const filteredSections = useMemo(() => {
    if (!searchQuery) return SECTIONS;
    return SECTIONS.filter(s => 
      s.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      CONTENT_DATA[s.id].content.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const activeData = CONTENT_DATA[activeSection];

  return (
    <div className="flex h-screen bg-[#020408] text-[#00D1FF] overflow-hidden font-mono selection:bg-[#00D1FF]/30 selection:text-white p-4">
      <div className="flex w-full h-full border-4 border-[#00425A] overflow-hidden relative">
      {/* Sidebar - Desktop */}
      <aside className="hidden md:flex flex-col w-80 bg-[#020408] border-r border-[#00D1FF]/30 z-20">
        <div className="p-8 pb-4 mb-6 border-b border-[#00D1FF]/30">
          <div className="flex items-center space-x-3 mb-2">
            <h1 className="text-4xl font-black tracking-tighter text-white uppercase font-mono">
              J.A.R.V.I.S <span className="text-xs font-normal border border-[#00D1FF] px-2 py-0.5 ml-2">SYSTEM ARCHITECT</span>
            </h1>
          </div>
          <p className="text-[10px] text-[#00D1FF] font-mono tracking-wider uppercase mt-2 opacity-60">Universal Android AI Interface // Kernel v4.2.0-STABLE</p>
        </div>

        <nav className="flex-1 px-4 space-y-2 overflow-y-auto">
          {filteredSections.map((section) => {
            const Icon = Icons[section.icon];
            const isActive = activeSection === section.id;
            const isAvailable = !isOfflineMode || section.isOfflineAvailable;
            
            return (
              <button
                key={section.id}
                onClick={() => isAvailable && setActiveSection(section.id)}
                disabled={!isAvailable}
                className={`w-full flex items-center space-x-3 px-4 py-3 border border-transparent transition-all duration-300 relative overflow-hidden ${
                  !isAvailable 
                    ? 'opacity-30 cursor-not-allowed grayscale'
                    : isActive
                      ? 'bg-[#00D1FF]/10 border-[#00D1FF]/50 text-white'
                      : 'text-[#00D1FF]/70 hover:text-[#00D1FF] hover:bg-[#00D1FF]/5 hover:border-[#00D1FF]/20'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="active-indicator"
                    className="absolute left-0 top-0 w-1 h-full bg-[#00D1FF] shadow-[0_0_12px_rgba(0,209,255,0.8)]"
                    initial={false}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
                <Icon className={`w-5 h-5 transition-colors ${isActive ? 'text-white' : 'text-[#00D1FF]/50'}`} />
                <span className="font-bold text-xs tracking-widest uppercase">{section.title}</span>
              </button>
            );
          })}
          {filteredSections.length === 0 && (
            <div className="px-4 py-8 text-center text-xs opacity-50 uppercase">No modules found</div>
          )}
        </nav>
        
        <div className="p-6 border-t border-[#00D1FF]/30 space-y-4">
          <button 
            onClick={() => setIsOfflineMode(!isOfflineMode)}
            className={`w-full flex items-center justify-between p-2 border transition-all ${
              isOfflineMode 
                ? 'bg-[#FF4B4B]/10 border-[#FF4B4B]/50 text-[#FF4B4B]' 
                : 'bg-transparent border-[#00D1FF]/30 text-[#00D1FF]/50 hover:text-[#00D1FF]'
            }`}
          >
            <div className="flex items-center gap-2">
              <WifiOff className="w-4 h-4" />
              <span className="text-[10px] font-bold uppercase tracking-widest">Offline Mode</span>
            </div>
            <div className={`w-2 h-2 rounded-full ${isOfflineMode ? 'bg-[#FF4B4B] animate-pulse' : 'bg-transparent border border-[#00D1FF]/50'}`} />
          </button>
          
          <div className="flex items-center justify-between text-[10px] font-mono text-[#00D1FF]/50 uppercase">
            <span>SYS_STATUS</span>
            <span className={isOfflineMode ? "text-[#FF4B4B] font-bold" : "text-[#00FF94] font-bold"}>
              {isOfflineMode ? "LOCAL ONLY" : "ONLINE"}
            </span>
          </div>
        </div>
      </aside>

      {/* Mobile Header */}
      <div className="md:hidden fixed top-4 left-4 right-4 h-16 bg-[#020408]/90 backdrop-blur border border-[#00D1FF]/30 z-30 flex items-center justify-between px-4">
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 rounded-full bg-[#00FF94] animate-pulse" />
          <h1 className="text-lg font-bold tracking-widest text-white uppercase font-mono">J.A.R.V.I.S</h1>
        </div>
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-[#00D1FF] p-2">
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden fixed inset-4 top-20 bg-[#020408] z-20 border border-[#00D1FF]/30 border-t-0"
          >
            <div className="p-4 border-b border-[#00D1FF]/30">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#00D1FF]/50" />
                <input 
                  type="text" 
                  placeholder="SEARCH MODULES..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-[#00D1FF]/5 border border-[#00D1FF]/30 rounded pl-10 pr-4 py-2 text-xs text-white focus:outline-none focus:border-[#00D1FF]"
                />
              </div>
            </div>
            <nav className="p-4 space-y-2 overflow-y-auto max-h-[60vh]">
              {filteredSections.map((section) => {
                const Icon = Icons[section.icon];
                const isActive = activeSection === section.id;
                const isAvailable = !isOfflineMode || section.isOfflineAvailable;
                
                return (
                  <button
                    key={section.id}
                    onClick={() => {
                      if (isAvailable) {
                        setActiveSection(section.id);
                        setIsMobileMenuOpen(false);
                      }
                    }}
                    disabled={!isAvailable}
                    className={`w-full flex items-center space-x-3 px-4 py-4 border transition-all ${
                      !isAvailable
                        ? 'opacity-30 cursor-not-allowed grayscale text-[#00D1FF]/70 border-transparent'
                        : isActive 
                          ? 'bg-[#00D1FF]/10 text-white border-[#00D1FF]/50' 
                          : 'text-[#00D1FF]/70 border-transparent'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-bold text-xs tracking-widest uppercase">{section.title}</span>
                  </button>
                );
              })}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <main className="flex-1 relative overflow-y-auto scroll-smooth bg-[#020408] flex flex-col">
        {/* Global Search Bar (Desktop) */}
        <div className="hidden md:flex sticky top-0 z-20 bg-[#020408]/90 backdrop-blur border-b border-[#00D1FF]/30 p-6 items-center justify-between">
          <div className="relative w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#00D1FF]/50" />
            <input 
              type="text" 
              placeholder="QUERY SYSTEM DIRECTORY..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#00D1FF]/5 border border-[#00D1FF]/20 text-white text-xs py-2.5 pl-10 pr-4 focus:outline-none focus:border-[#00D1FF]/50 transition-colors placeholder:text-[#00D1FF]/40"
            />
          </div>
          <div className="flex gap-4 items-center">
            <div className="text-right">
              <div className="text-lg font-light text-white">14:28:42</div>
              <div className="text-[9px] opacity-50 uppercase">Uptime: 142:12:05 // Latency: 24ms</div>
            </div>
          </div>
        </div>

        {/* Background Grid Decoration */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.05] z-0" 
             style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #00D1FF 1px, transparent 0)', backgroundSize: '32px 32px', backgroundAttachment: 'fixed' }} />
        
        <div className="w-full max-w-5xl mx-auto px-6 py-12 md:px-12 relative z-10 flex flex-col flex-grow">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSection}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="flex-grow flex flex-col relative"
            >
              {/* Scanner Animation */}
              <motion.div 
                className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#00D1FF] to-transparent z-50 pointer-events-none shadow-[0_0_20px_#00D1FF]"
                initial={{ top: 0, opacity: 1 }}
                animate={{ top: '100%', opacity: 0 }}
                transition={{ duration: 1.5, ease: "linear" }}
              />

              <div className="mb-12 border-b border-[#00D1FF]/30 pb-4">
                <h2 className="text-3xl font-black text-white tracking-tighter uppercase">
                  {activeData.title}
                </h2>
                <div className="h-1 w-20 bg-[#00D1FF] mt-4 shadow-[0_0_15px_rgba(0,209,255,0.6)]" />
              </div>
              
              <div className="flex-grow">
                <MarkdownRenderer content={activeData.content} sectionId={activeSection} />
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="mt-12 bg-[#00D1FF]/5 p-2 flex flex-wrap items-center gap-4 border border-[#00D1FF]/10 z-10">
            <div className="text-[9px] px-2 py-1 bg-[#00D1FF] text-black font-bold uppercase">Console</div>
            <div className="text-[10px] flex-grow text-[#00D1FF]/70 truncate">[LOG] Module '{activeData?.title || 'Unknown'}' loaded successfully...</div>
            <div className="text-[9px] opacity-40 uppercase">Android 14 // API Level 34</div>
          </div>
        </div>

        {/* FAB */}
        <button
          onClick={() => setIsSimulateModalOpen(true)}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 md:bottom-10 md:left-[calc(50%+10rem)] z-40 bg-[#00D1FF]/10 border border-[#00D1FF]/50 hover:bg-[#00D1FF]/20 text-white rounded-full p-4 shadow-[0_0_20px_rgba(0,209,255,0.3)] transition-all group backdrop-blur-sm flex items-center gap-3 cursor-pointer"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-[#00FF94] rounded-full blur-sm opacity-50 group-hover:opacity-100 transition-opacity" />
            <Mic className="w-6 h-6 text-[#00FF94] relative z-10" />
          </div>
          <span className="font-bold text-xs tracking-widest uppercase hidden md:inline-block pr-2 font-mono">Simulate Command</span>
        </button>
      </main>
      <CommandLog />
      <SimulateModal 
        isOpen={isSimulateModalOpen} 
        onClose={() => setIsSimulateModalOpen(false)}
        onSimulate={(cmd) => window.dispatchEvent(new CustomEvent('simulate-command', { detail: cmd }))}
      />
    </div>
    </div>
  );
}
