import React from 'react';
import { renderToString } from 'react-dom/server';
import App from './src/App.tsx';
import MetricsVisualization from './src/components/MetricsVisualization.tsx';
import WorkflowDiagram from './src/components/WorkflowDiagram.tsx';
import PermissionsGrid from './src/components/PermissionsGrid.tsx';
import CommandLog from './src/components/CommandLog.tsx';
import SimulateModal from './src/components/SimulateModal.tsx';
import VoiceSettings from './src/components/VoiceSettings.tsx';

console.log("MetricsVisualization", !!MetricsVisualization);
console.log("WorkflowDiagram", !!WorkflowDiagram);
console.log("PermissionsGrid", !!PermissionsGrid);
console.log("CommandLog", !!CommandLog);
console.log("SimulateModal", !!SimulateModal);
console.log("VoiceSettings", !!VoiceSettings);
