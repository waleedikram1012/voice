import { JSDOM } from 'jsdom';
const dom = new JSDOM('<!DOCTYPE html><div id="root"></div>');
global.window = dom.window;
global.document = dom.window.document;
global.navigator = dom.window.navigator;

import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './src/App.tsx';

console.log("Trying to render with JSDOM...");
const root = createRoot(document.getElementById('root'));
root.render(React.createElement(App));
console.log("Render called");
