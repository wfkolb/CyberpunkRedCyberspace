// terminal.js
export function initializeTerminal() {
    const output = document.getElementById('terminal-output');
    const input = document.getElementById('terminal-input');
  
    // Simple command echo logic
    input.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        const command = input.value.trim();
        if (command) {
          output.innerHTML += `\n> ${command}`;
          // Placeholder response
          output.innerHTML += `\nEcho: ${command}`;
          output.scrollTop = output.scrollHeight;
        }
        input.value = '';
      }
    });
  }
  