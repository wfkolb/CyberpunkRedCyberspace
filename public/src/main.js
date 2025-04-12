import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import { getDatabase, ref, onValue, set, push, remove, update } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-database.js";
import displayFloor from './displayFloor.js'; 
import displayFloorGM from './displayFloorGM.js';
import generateAddFloorControls from "./generateAddFloorControls.js";

  const response = await fetch('/config');
  const data = await response.json();
  const firebaseConfig = {
    apiKey: data.apiKey,
    authDomain: data.authDomain,
    databaseURL: data.databaseURL,
    projectId: data.projectId,
    storageBucket: data.storageBucket,
    messagingSenderId: data.messagingSenderId,
    appId: data.appId,
    measurementId: data.measurementId
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const db = getDatabase(app);

  const urlParams = new URLSearchParams(window.location.search);
  const sessionId = urlParams.get('id') || 'default';
  const path = window.location.pathname;
  const isGM = path.includes('/gm'); // Check if it's GM view
  const appDiv = document.getElementById('app');
  document.getElementById('view-type').textContent = isGM ? 'Game Master View' : 'Player View';

  const dataRef = ref(db, `sessions/${sessionId}/floors`);

  // Cyberpunk Red Nodes and Enemies
  const floorContent = {
    nodes: [
      "Firewall", 
      "Data Fortress", 
      "Server", 
      "Admin Node", 
      "Proxy Node"
    ],
    enemies: [
      "Black ICE", 
      "Red ICE", 
      "Slicer", 
      "Hunter AI", 
      "Daemon"
    ],
    hiddenStates: [
      "Visible",
      "Hidden",
      "Invisible"
    ]

    
  };

  // Cache the current floors so we can check if the data is different before re-rendering
  let readyToRead = true;
  let floors = [];
  let floorIds = [];
  let useNewDisplay = true;
  // Render floors with debugging logs
  function render(ServerFloors = []) {
    console.log("Rendering floors: ", ServerFloors); // Debug log to see what data is being passed
    appDiv.innerHTML = ''; // Clear previous content
    if (ServerFloors.length === 0) {
      appDiv.innerHTML = '<p>No floors yet. Add some in GM View!</p>';
    }
    // Loop through each floor and create its display
    ServerFloors.forEach((floor, index) => {
          //GM Callbacks
          //Removing floor
          const removeCallback = () => {
            removeFloor(index)
          };
          //Setting floor visibility
          const visibilityCallback = (newVisibility) => setFloorVisibility(index, newVisibility);
          //Setting player location
          const playerLocationCallback = () => 
            {
              setPlayer(index);
            };
          //Setting the secretVisibility
          const secretVisCallback = (newSecretVisibility) => setSecretVisibility(index, newSecretVisibility);
          let floorDiv= "ERROR";
          if(isGM)
          {
            floorDiv = displayFloorGM(floor,removeCallback,visibilityCallback,playerLocationCallback,secretVisCallback);
          }
          else
          {
            floorDiv = displayFloor(floor);
          }
          appDiv.appendChild(floorDiv);  // Add floor div to main container
      });// END floor render for each
      
      // Start GM View
      if (isGM) {
          const addNewRoom = (newRoomData) => {
            addFloor(newRoomData);
          };
          let controlsDiv = generateAddFloorControls(floorContent.enemies,floorContent.nodes,addNewRoom);
          appDiv.appendChild(controlsDiv);
        
      } //End is GM Controls


  }//end render func

  function addFloor(floor) {
    readyToRead = false;
    // Reference to the 'floors' node in Firebase for the current session
    const floorsRef = ref(db, `sessions/${sessionId}/floors`);
    // Use push() to add a new floor with a unique ID (instead of overwriting)
    push(floorsRef, floor).then((newFloorRef) => {
      console.log("Floor added successfully");
      readyToRead = true;
      floors.push(floor);
      floorIds.push(newFloorRef.key);
      render(floors);
    }).catch((error) => {
      console.error("Error adding floor:", error);
      readyToRead = true;
    });
  
}

function setPlayer(index)
{
  floorIds.forEach((id) => {
    const floorRef = ref(db, `sessions/${sessionId}/floors/${id}/`);
    update(floorRef, { hasPlayer: false } )
    .then(() => {
      console.log(`Floor ${id} updated successfully.`);
    })
    .catch((error) => {
      console.error("Error updating floor:", error);
    });
  });

  let playerFloorKey = floorIds[index];
  const floorRef = ref(db, `sessions/${sessionId}/floors/${playerFloorKey}/`);
  update(floorRef, { hasPlayer: true } )
    .then(() => {
      console.log(`Floor ${playerFloorKey} updated successfully.`);
      render(floors);
    })
    .catch((error) => {
      console.error("Error updating floor:", error);
    });
}

function setSecretVisibility(index,reveal)
{
  let playerFloorKey = floorIds[index];
  const floorRef = ref(db, `sessions/${sessionId}/floors/${playerFloorKey}/`);
  update(floorRef, { secretVisibility: reveal } )
    .then(() => {
      console.log(`Floor ${playerFloorKey} updated successfully.`);
      render(floors);
    })
    .catch((error) => {
      console.error("Error updating floor:", error);
    });
}


function setFloorVisibility(index,newVisibility)
{
  let playerFloorKey = floorIds[index];
  const floorRef = ref(db, `sessions/${sessionId}/floors/${playerFloorKey}/`);
  update(floorRef, { hiddenState: newVisibility } )
    .then(() => {
      console.log(`Floor ${playerFloorKey} updated successfully.`);
      render(floors);
    })
    .catch((error) => {
      console.error("Error updating floor:", error);
    });
}



  // Function to remove a floor from Firebase
  function removeFloor(index) {
    readyToRead = false;
    let floorKey = floorIds[index];
      const floorRef = ref(db, `sessions/${sessionId}/floors/${floorKey}`);
    // Remove the floor using the reference to the specific floor's unique key
    remove(floorRef).then(() => {
      console.log("Floor removed successfully!" + floorKey);
      readyToRead = true;
      floorIds.splice(index,1);
      floors.splice(index,1);
      render(floors)
    }).catch((error) => {
      console.error("Error removing floor:", error);
      readyToRead = true;
    });
  }

  // Listen to real-time changes in Firebase
  onValue(dataRef, snapshot => {
    if(!readyToRead)
    {
      return
    }
    const newfloors = Object.values(snapshot.val() || {});
    console.log("Firebase data fetched: ", newfloors); // Debug log to check Firebase data
    floors = newfloors;
    if(newfloors.length > 0)
    {
      floorIds = Object.keys(snapshot.val() || {});
    }
    render(floors)
  });