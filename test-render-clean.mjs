import React from 'react';
import { renderToString } from 'react-dom/server';
import App from './src/App.tsx';

try {
  const html = renderToString(React.createElement(App));
  console.log("RENDER_SUCCESS");
} catch(err) {
  console.error("RENDER_ERROR:", err.message);
}
