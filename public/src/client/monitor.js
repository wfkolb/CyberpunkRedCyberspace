export function initializeMonitor() {
    const output = document.getElementById('monitor-output');
  
    function generateGibberish() {
      const actions = [
        'Locking ports...',
        'Bypassing intrusion detection...',
        'Decrypting secure channel...',
        'Injecting payload...',
        'Overriding security protocols...',
        'Hacking mainframe...',
        'Deactivating firewalls...',
        'System breach detected...',
        'Accessing restricted files...',
        'Running diagnostic routines...',
        'Overriding admin privileges...',
        'Erasing logs...',
        'Decoding encrypted data...',
        'Intrusion prevention measures bypassed...',
        'Encrypting communication...',
        'Executing backdoor command...',
        'Accessing deepnet...',
        'Overclocking system processes...',
        'Injecting Trojan...',
        'Booting rootkit...',
        'Establishing remote connection...'
      ];
  
      const action = actions[Math.floor(Math.random() * actions.length)];
      const details = Math.random() > 0.5
        ? `Status: ${['OK', 'Failed', 'Running', 'Success'][Math.floor(Math.random() * 4)]}`
        : '';
  
      return details ? `${action} ${details}` : action;
    }
  
    function printGibberish() {
        const gibberish = generateGibberish();
        const line = document.createElement('div');
        line.textContent = `>>> `;
      
        output.appendChild(line);
      
        let index = 0;
      
        function typeOut() {
          if (index < gibberish.length) {
            line.textContent += gibberish.charAt(index);
            index++;
            setTimeout(typeOut, 5);
          }
        }
      
        typeOut();
      
        // Keep only the last N lines visible to simulate scroll
        const maxLines = 20; // Adjust to taste
        while (output.children.length > maxLines) {
          output.removeChild(output.firstChild);
        }
      }
  
    setInterval(printGibberish, 1000);
  }
  