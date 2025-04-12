export default function generateAddFloorControls(enemies, nodes, addNewRoom) {
    // Create a container div
    const controlsDiv = document.createElement("div");
    controlsDiv.classList.add("add-floor-controls");
    controlsDiv.style.padding = "16px";
    controlsDiv.style.border = "2px solid #333";
    controlsDiv.style.borderRadius = "8px";
    controlsDiv.style.backgroundColor = "#2e2e2e";
    controlsDiv.style.marginBottom = "16px";
  
    // === Floor Description ===
    const descriptionLabel = document.createElement("label");
    descriptionLabel.textContent = "Floor Description:";
    descriptionLabel.style.display = "block";
    descriptionLabel.style.marginBottom = "8px";
    controlsDiv.appendChild(descriptionLabel);
  
    const descriptionInput = document.createElement("input");
    descriptionInput.type = "text";
    descriptionInput.placeholder = "Enter floor description";
    descriptionInput.style.width = "100%";
    descriptionInput.style.padding = "8px";
    descriptionInput.style.marginBottom = "16px";
    controlsDiv.appendChild(descriptionInput);
  
    // === Floor Secret ===
    const secretLabel = document.createElement("label");
    secretLabel.textContent = "Floor Secret:";
    secretLabel.style.display = "block";
    secretLabel.style.marginBottom = "8px";
    controlsDiv.appendChild(secretLabel);
  
    const secretInput = document.createElement("input");
    secretInput.type = "text";
    secretInput.placeholder = "Enter floor secret";
    secretInput.style.width = "100%";
    secretInput.style.padding = "8px";
    secretInput.style.marginBottom = "16px";
    controlsDiv.appendChild(secretInput);
  
    // === Enemies Dropdown ===
    const enemiesLabel = document.createElement("label");
    enemiesLabel.textContent = "Select Enemies:";
    enemiesLabel.style.display = "block";
    enemiesLabel.style.marginBottom = "8px";
    controlsDiv.appendChild(enemiesLabel);
  
    const enemiesSelect = document.createElement("select");
    enemiesSelect.style.width = "100%";
    enemiesSelect.style.padding = "8px";
    enemies.forEach((enemy) => {
      const option = document.createElement("option");
      option.value = enemy;
      option.textContent = enemy;
      enemiesSelect.appendChild(option);
    });
    controlsDiv.appendChild(enemiesSelect);
  
    // === Nodes Dropdown ===
    const nodesLabel = document.createElement("label");
    nodesLabel.textContent = "Select Nodes:";
    nodesLabel.style.display = "block";
    nodesLabel.style.marginBottom = "8px";
    controlsDiv.appendChild(nodesLabel);
  
    const nodesSelect = document.createElement("select");
    nodesSelect.style.width = "100%";
    nodesSelect.style.padding = "8px";
    nodes.forEach((node) => {
      const option = document.createElement("option");
      option.value = node;
      option.textContent = node;
      nodesSelect.appendChild(option);
    });
    controlsDiv.appendChild(nodesSelect);
  
    // === Add Room Button ===
    const addButton = document.createElement("button");
    addButton.textContent = "Add Room";
    addButton.style.padding = "10px 20px";
    addButton.style.backgroundColor = "#00ffcc";
    addButton.style.color = "#333";
    addButton.style.border = "none";
    addButton.style.borderRadius = "8px";
    addButton.style.marginTop = "16px";
  
    addButton.addEventListener("click", () => {
      const newFloor = {
        description: descriptionInput.value,
        secretString: secretInput.value,
        enemies: Array.from(enemiesSelect.selectedOptions).map(option => option.value),
        nodes: Array.from(nodesSelect.selectedOptions).map(option => option.value),
        hasPlayer: false, // Set to false initially
        floorVisibility: "Visible", // Default visibility
        secretVisibility: "Visible", // Default secret visibility
      };
  
      // Pass the new floor data to the callback
      addNewRoom(newFloor);
  
      // Reset the form
      descriptionInput.value = "";
      secretInput.value = "";
      enemiesSelect.selectedIndex = -1;
      nodesSelect.selectedIndex = -1;
    });
  
    controlsDiv.appendChild(addButton);
  
    return controlsDiv;
  }
  