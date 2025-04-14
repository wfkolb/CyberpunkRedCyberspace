// client.js
import { initializeMonitor } from './monitor.js';
import { initializeTerminal } from './terminal.js';
import { initializeViewer } from './viewer.js';

function initialize() {
  // Initialize the monitor and terminal
  initializeMonitor();
  initializeTerminal();

  // Initialize the Three.js viewer
  initializeViewer();
}

// Call the initialization function when the page is loaded
window.onload = initialize;
