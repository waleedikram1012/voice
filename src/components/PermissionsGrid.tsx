import React from 'react';
import { Shield, ShieldAlert, ShieldCheck } from 'lucide-react';

export default function PermissionsGrid() {
  const permissions = [
    { name: 'BIND_ACCESSIBILITY_SERVICE', type: 'Special', status: 'Mandatory', risk: 'High', desc: 'Required to automate UI interactions and read screen nodes.' },
    { name: 'SYSTEM_ALERT_WINDOW', type: 'Special', status: 'Mandatory', risk: 'High', desc: 'Required for the floating bubble UI and overlays.' },
    { name: 'BIND_NOTIFICATION_LISTENER_SERVICE', type: 'Special', status: 'Optional', risk: 'Medium', desc: 'Read and reply to incoming messages in the background.' },
    { name: 'RECORD_AUDIO', type: 'Dangerous', status: 'Mandatory', risk: 'Medium', desc: 'For STT and wake word detection.' },
    { name: 'READ_CONTACTS', type: 'Dangerous', status: 'Optional', risk: 'Medium', desc: 'Resolve names to phone numbers/targets.' },
    { name: 'READ_EXTERNAL_STORAGE', type: 'Dangerous', status: 'Optional', risk: 'Medium', desc: 'Access photos/PDFs to send as attachments.' },
    { name: 'CALL_PHONE', type: 'Dangerous', status: 'Optional', risk: 'High', desc: 'For native communication.' },
    { name: 'SEND_SMS', type: 'Dangerous', status: 'Optional', risk: 'High', desc: 'For native communication.' },
    { name: 'ACCESS_FINE_LOCATION', type: 'Dangerous', status: 'Optional', risk: 'Medium', desc: 'For Maps navigation intents.' },
    { name: 'WRITE_SETTINGS', type: 'Special', status: 'Optional', risk: 'High', desc: 'Modify system brightness and timeout directly.' },
    { name: 'FOREGROUND_SERVICE', type: 'Standard', status: 'Mandatory', risk: 'Low', desc: 'Keep the app alive in the background.' },
  ];

  return (
    <div className="my-8">
      <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-6 border-l-2 border-[#00D1FF] pl-3">
        Security & Permissions Matrix
      </h3>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left text-[11px] font-mono border-collapse">
          <thead>
            <tr className="bg-[#00D1FF]/10 border-b border-[#00D1FF]/30 text-[#00D1FF]">
              <th className="p-3 font-bold uppercase">Permission Name</th>
              <th className="p-3 font-bold uppercase">Classification</th>
              <th className="p-3 font-bold uppercase">Requirement</th>
              <th className="p-3 font-bold uppercase">Risk Level</th>
              <th className="p-3 font-bold uppercase">Description</th>
            </tr>
          </thead>
          <tbody>
            {permissions.map((p, i) => (
              <tr key={i} className="border-b border-[#00D1FF]/10 hover:bg-[#00D1FF]/5 transition-colors">
                <td className="p-3 font-bold text-white font-mono">{p.name}</td>
                <td className="p-3 text-[#00D1FF]/80">{p.type}</td>
                <td className="p-3">
                  <span className={`px-2 py-1 rounded text-[9px] font-bold uppercase ${
                    p.status === 'Mandatory' ? 'bg-[#00FF94]/20 text-[#00FF94] border border-[#00FF94]/50' : 'bg-[#00D1FF]/20 text-[#00D1FF] border border-[#00D1FF]/50'
                  }`}>
                    {p.status}
                  </span>
                </td>
                <td className="p-3">
                  <div className="flex items-center gap-1">
                    {p.risk === 'High' && <ShieldAlert className="w-4 h-4 text-[#FF4B4B]" />}
                    {p.risk === 'Medium' && <Shield className="w-4 h-4 text-yellow-400" />}
                    {p.risk === 'Low' && <ShieldCheck className="w-4 h-4 text-[#00FF94]" />}
                    <span className={`uppercase font-bold ${
                      p.risk === 'High' ? 'text-[#FF4B4B]' : p.risk === 'Medium' ? 'text-yellow-400' : 'text-[#00FF94]'
                    }`}>{p.risk}</span>
                  </div>
                </td>
                <td className="p-3 text-[#00D1FF]/60">{p.desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
