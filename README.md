# Cyberpunk Red Cyberspace tool
Lets you quickly setup cyberpunk red cyberspace (which is sorley needed in roll20).

## How to start the server

- Add a realtime database to your firebase project (via the firebase console)
- Add a web app to your firebase project (via the firebase console)
- Add a .env file to the root of your repo which contains
```
FIREBASE_API_KEY="your-api-key"
FIREBASE_AUTH_DOMAIN="your-project-id.firebaseapp.com"
FIREBASE_DATABASE_URL="https://your-project-id.firebaseio.com"
FIREBASE_PROJECT_ID="your-project-id"
FIREBASE_STORAGE_BUCKET="your-project-id.appspot.com"
FIREBASE_MESSAGING_SENDER_ID="your-messaging-sender-id"
FIREBASE_APP_ID="your-app-id"
FIREBASE_MEASUREMENT_ID="your-measurement-id"
```
- npm start

## How to use
- Make up an arbitrary session name 
- GM will connect to http://localhost:8080/gm?id=SESSION_NAME
- Player will connect to http://localhost:8080/player?id=SESSION_NAME

## More Info
- Each level can currently only have one enemy or secret
- Only single net runners atm
- See the github project for current work status.
