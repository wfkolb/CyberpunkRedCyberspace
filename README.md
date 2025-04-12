# Cyberpunk Red Cyberspace tool (WIP)
Lets you quickly setup cyberpunk red cyberspace (which is sorley needed in roll20).
### Gm view
![image](https://github.com/user-attachments/assets/3fdd2f2d-307f-40c5-a232-f23e0ee3ab0c)

### Player View
![image](https://github.com/user-attachments/assets/8255d64b-0a64-48e7-b60e-86e46b866b4c)

### GM Controls
![image](https://github.com/user-attachments/assets/c2b36eb6-27b9-45dc-8867-96ed9406082a)


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
