# Cyberpunk Red Cyberspace tool
Lets you quickly setup cyberpunk red cyberspace (which is sorley needed in roll20).

## How to start the server

- Setup your firebase by setting "config" (The key in there is a dead one)
- npx http-server public -p 8080 -P http://localhost:8080?

## How to use
- Make up an arbitrary session name 
- GM will connect to http://localhost:8080/gm?id=SESSION_NAME
- Player will connect to http://localhost:8080/player?id=SESSION_NAME

## More Info
- Each level can currently only have one enemy or secret
- Only single net runners atm
- See the github project for current work status.
