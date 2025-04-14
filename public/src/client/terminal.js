const terminal = document.getElementById('terminal');
const input = document.getElementById('commandInput');

// Sample commands that mimic Cyberpunk Red Netrunner actions
const commands = {
    "connect": "Connecting to the system... Done.",
    "scan": "Scanning for vulnerabilities... Found 3 potential targets.",
    "exploit": "Attempting to exploit vulnerability... Success!",
    "run": "Running protocol... Please wait.",
    "access": "Accessing file system... Access granted.",
    "bypass": "Bypassing security measures... Done.",
    "exit": "Exiting the system... Goodbye."
};

// Function to add text to the terminal screen
function appendToTerminal(text) {
    const newLine = document.createElement("div");
    newLine.textContent = text;
    terminal.appendChild(newLine);
    terminal.scrollTop = terminal.scrollHeight; // Scroll to the bottom
}

// Handle user input and execute commands
input.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        const command = input.value.trim();
        console.log(command);
        if (command in commands) {
            appendToTerminal(`> ${command}`);
            appendToTerminal(commands[command]);
        } else {
            appendToTerminal(`> ${command}`);
            appendToTerminal("Command not recognized.");
        }
        input.value = ''; // Clear input
    }
});

// Initial terminal welcome message
appendToTerminal("Welcome to the Cyberpunk Red Netrunner terminal.");
appendToTerminal("Type 'help' for available commands.");
