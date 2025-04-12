// displayFloorGM.js

export default function displayFloorGM(
    floor,
    removeCallback,
    floorVisibilityCallback,
    setPlayerLocationCallback,
    secretVisibilityCallback
  ) {
    const floorDiv = document.createElement("div");
    floorDiv.classList.add("floor");
  
    // === Floor Details ===
    const description = document.createElement("p");
    description.textContent = `Description: ${floor.description}`;
    floorDiv.appendChild(description);
  
    const nodes = document.createElement("p");
    nodes.textContent = `Nodes: ${floor.nodes.join(", ")}`;
    floorDiv.appendChild(nodes);
  
    const enemies = document.createElement("p");
    enemies.textContent = `Enemies: ${floor.enemies.join(", ")}`;
    floorDiv.appendChild(enemies);
  
    // === GM-Only: Always Show Secret ===
    const secret = document.createElement("p");
    secret.textContent = `Secret: ${floor.secretString}`;
    floorDiv.appendChild(secret);
  
    // === Secret Visibility Control (affects player view only) ===
    if (secretVisibilityCallback) {
      const label = document.createElement("label");
      label.textContent = "Secret Visibility: ";
  
      const dropdown = document.createElement("select");
      ["Visible", "Hidden", "Invisible"].forEach((state) => {
        const option = document.createElement("option");
        option.value = state;
        option.textContent = state;
        if (floor.secretVisibility === state) option.selected = true;
        dropdown.appendChild(option);
      });
  
      dropdown.addEventListener("change", (e) => {
        secretVisibilityCallback(e.target.value);
      });
  
      label.appendChild(dropdown);
      floorDiv.appendChild(label);
    }
  
    // === Floor Visibility Control (affects player view only) ===
    if (floorVisibilityCallback) {
      const label = document.createElement("label");
      label.textContent = "Floor Visibility: ";
  
      const dropdown = document.createElement("select");
      ["Visible", "Hidden", "Invisible"].forEach((state) => {
        const option = document.createElement("option");
        option.value = state;
        option.textContent = state;
        if (floor.floorVisibility === state) option.selected = true;
        dropdown.appendChild(option);
      });
  
      dropdown.addEventListener("change", (e) => {
        floorVisibilityCallback(e.target.value);
      });
  
      label.appendChild(dropdown);
      floorDiv.appendChild(label);
    }
  
    // === Player Location Checkbox ===
    if (setPlayerLocationCallback) {
      const label = document.createElement("label");
      label.style.display = "block";
      label.style.marginTop = "8px";
  
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.checked = floor.hasPlayer;
  
      checkbox.addEventListener("change", () => {
        if (checkbox.checked) {
          setPlayerLocationCallback();
        }
      });
  
      label.appendChild(checkbox);
      label.append(" Player is on this floor");
      floorDiv.appendChild(label);
    }
  
    // === Remove Floor Button ===
    if (removeCallback) {
      const removeBtn = document.createElement("button");
      removeBtn.textContent = "🗑 Remove Floor";
      removeBtn.style.marginTop = "10px";
      removeBtn.addEventListener("click", removeCallback);
      floorDiv.appendChild(removeBtn);
    }
  
    return floorDiv;
  }
  