// displayFloor.js

export default function displayFloor(floor) {
    // If the floor itself is invisible and the player is not on it, don't show it
    if (floor.floorVisibility === "Invisible" && !floor.hasPlayer) {
      return null;
    }
  
    const floorDiv = document.createElement("div");
    floorDiv.classList.add("floor");
  
    // Highlight if the player is present
    if (floor.hasPlayer) {
      floorDiv.style.border = "3px solid #00ffcc";
      floorDiv.style.padding = "10px";
      floorDiv.style.position = "relative";
  
      const hereTag = document.createElement("div");
      hereTag.textContent = "🧍 You are here!";
      hereTag.style.position = "absolute";
      hereTag.style.top = "5px";
      hereTag.style.right = "10px";
      hereTag.style.fontWeight = "bold";
      hereTag.style.color = "#00ffcc";
      floorDiv.appendChild(hereTag);
    }
  
    // If the floor is hidden and the player isn't on it, show a placeholder
    if (floor.floorVisibility === "Hidden" && !floor.hasPlayer) {
      const hiddenText = document.createElement("p");
      hiddenText.textContent = "This floor is obscured...";
      floorDiv.appendChild(hiddenText);
      return floorDiv;
    }
  
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
  
    // === Secret Visibility for Players ===
    if (floor.secretVisibility === "Visible") {
      const secret = document.createElement("p");
      secret.textContent = `Secret: ${floor.secretString}`;
      floorDiv.appendChild(secret);
    } else if (floor.secretVisibility === "Hidden") {
      const encrypted = document.createElement("p");
      encrypted.textContent = `Secret: 🔐 Encrypted`;
      encrypted.style.fontStyle = "italic";
      floorDiv.appendChild(encrypted);
    }
    // If it's Invisible, don't append anything
  
    return floorDiv;
  }
  