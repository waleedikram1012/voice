import { createElement } from 'react';
import { renderToString } from 'react-dom/server';
import App from './src/App.tsx';

try {
  renderToString(createElement(App));
  console.log("App rendered successfully");
} catch (e) {
  console.error("Render failed:", e.message);
}
