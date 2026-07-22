import React, { useState, useEffect } from 'react';

export default function VoiceSettings() {
  const [sttEngine, setSttEngine] = useState('cloud');
  const [ttsProfile, setTtsProfile] = useState('jarvis_en');
  const [speechRate, setSpeechRate] = useState(1.0);

  useEffect(() => {
    const rate = parseFloat(localStorage.getItem('speechRate') || '1.0');
    setSpeechRate(rate);
  }, []);

  const handleRateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newRate = parseFloat(e.target.value);
    setSpeechRate(newRate);
    localStorage.setItem('speechRate', newRate.toString());
  };

  return (
    <div className="bg-[#00D1FF]/5 border border-[#00D1FF]/20 p-8 my-8 relative overflow-hidden font-mono">
      <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-8 border-l-2 border-[#00D1FF] pl-3">
        Engine Configuration
      </h3>
      
      <div className="space-y-8 text-xs">
        {/* STT Selection */}
        <div className="space-y-4">
          <label className="text-[#00D1FF] font-bold uppercase tracking-widest block">Speech-to-Text (STT) Engine</label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button 
              onClick={() => setSttEngine('local')}
              className={`p-4 border text-left transition-all ${sttEngine === 'local' ? 'bg-[#00FF94]/10 border-[#00FF94] text-[#00FF94]' : 'bg-[#00D1FF]/5 border-[#00D1FF]/30 text-[#00D1FF]/70'}`}
            >
              <div className="font-bold mb-1 uppercase">Local Whisper (TFLite)</div>
              <div className="opacity-70 text-[10px]">On-device processing. High privacy, lower latency, requires 200MB model download.</div>
            </button>
            <button 
              onClick={() => setSttEngine('cloud')}
              className={`p-4 border text-left transition-all ${sttEngine === 'cloud' ? 'bg-[#00D1FF]/10 border-[#00D1FF] text-white' : 'bg-[#00D1FF]/5 border-[#00D1FF]/30 text-[#00D1FF]/70'}`}
            >
              <div className="font-bold mb-1 uppercase">Cloud AI (Google STT)</div>
              <div className="opacity-70 text-[10px]">High accuracy, requires internet connection. Uses external API.</div>
            </button>
          </div>
        </div>

        {/* TTS Selection */}
        <div className="space-y-4">
          <label className="text-[#00D1FF] font-bold uppercase tracking-widest block">Text-to-Speech (TTS) Profile</label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {['jarvis_en', 'friday_en', 'system_default'].map(profile => (
              <button 
                key={profile}
                onClick={() => setTtsProfile(profile)}
                className={`p-4 border text-left transition-all ${ttsProfile === profile ? 'bg-[#00D1FF]/20 border-[#00D1FF] text-white' : 'bg-transparent border-[#00D1FF]/30 text-[#00D1FF]/50 hover:text-[#00D1FF]'}`}
              >
                <div className="font-bold uppercase">{profile.replace('_', ' ')}</div>
              </button>
            ))}
          </div>
        </div>

        {/* TTS Rate Slider */}
        <div className="space-y-4">
          <label className="text-[#00D1FF] font-bold uppercase tracking-widest flex justify-between">
            <span>Speech Rate</span>
            <span className="text-white">{speechRate.toFixed(1)}x</span>
          </label>
          <input 
            type="range" 
            min="0.5" 
            max="2.0" 
            step="0.1" 
            value={speechRate}
            onChange={handleRateChange}
            className="w-full accent-[#00D1FF]"
          />
        </div>
      </div>
    </div>
  );
}
