export default function generateAddFloorControls(enemies, nodes, addNewRoom) {
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
  
    // === Enemies Input (Comma-Separated) ===
    const enemiesLabel = document.createElement("label");
    enemiesLabel.textContent = "Enemies (comma-separated):";
    enemiesLabel.style.display = "block";
    enemiesLabel.style.marginBottom = "8px";
    controlsDiv.appendChild(enemiesLabel);
  
    const enemiesInput = document.createElement("input");
    enemiesInput.type = "text";
    enemiesInput.placeholder = enemies.join(", ");
    enemiesInput.style.width = "100%";
    enemiesInput.style.padding = "8px";
    enemiesInput.style.marginBottom = "8px";
    controlsDiv.appendChild(enemiesInput);
  
    // Show list of valid enemies for reference
    const enemiesHelp = document.createElement("small");
    enemiesHelp.style.color = "#ccc";
    enemiesHelp.textContent = `Valid enemies: ${enemies.join(", ")}`;
    controlsDiv.appendChild(enemiesHelp);
  
    // Error display
    const errorMessage = document.createElement("div");
    errorMessage.style.color = "red";
    errorMessage.style.marginTop = "8px";
    controlsDiv.appendChild(errorMessage);
  
    // === Nodes Dropdown ===
    const nodesLabel = document.createElement("label");
    nodesLabel.textContent = "Select Nodes:";
    nodesLabel.style.display = "block";
    nodesLabel.style.marginTop = "16px";
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
      // Parse and validate enemies
      const enemyEntries = enemiesInput.value
        .split(",")
        .map(e => e.trim())
        .filter(e => e.length > 0);
  
      const invalidEnemies = enemyEntries.filter(e => !enemies.includes(e));
  
      if (invalidEnemies.length > 0) {
        errorMessage.textContent = `Invalid enemies: ${invalidEnemies.join(", ")}`;
        return;
      }
  
      errorMessage.textContent = "";
  
      const newFloor = {
        description: descriptionInput.value,
        secretString: secretInput.value,
        enemies: enemyEntries,
        nodes: [nodesSelect.value], // assuming single-select for now
        hasPlayer: false,
        floorVisibility: "Visible",
        secretVisibility: "Visible"
      };
  
      addNewRoom(newFloor);
  
      // Reset form
      descriptionInput.value = "";
      secretInput.value = "";
      enemiesInput.value = "";
      nodesSelect.selectedIndex = 0;
    });
  
    controlsDiv.appendChild(addButton);
  
    return controlsDiv;
  }