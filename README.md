# Call-of-Cthulhu
Application made for hosting and creating characters for Call of Cthulhu tabletop.


## Main application
For building the main application:
```
cd react-app
npm install
npm run build
```
After building the application, you can start it by opening the `react-app/build/index.html`. 
(Note that the application has only been comprehensively tested in Chrome.)

There are three different options when starting the application: to create a local game,
to join a hosted game and hosting a game.

### Local game
Simply allows you to build a character or modify existing character.

### Hosted game
Allows you to join a game hosted by yourself or someone else, requires a room code added by
the host, and their ip address and port. You can start with a new character by leaving the
selected character option blank, or load an existing character.

### Host a game
Allows you to host a game for others, giving you access to view players' character sheets
and option to kick players. Hosting a game requires port forwarding and your global ip address.
After setting these in setting up the game, they will be provided to you in the application header.

When setting up the game, there is also option to load a previous room. This brings you the message
history from previous game.

All the players characters are saved for your application, so you can view them also after the game. Changes you make to the character sheets will not be updated for the players, and will be
overwritten as soon as the player makes changes.

**(NOTE THAT MAXIMUM STORAGE SIZE IS ONLY 5MB, SO IF AMOUNT OF SAVED CHARACTERS REACH AROUND 15,
DELETE SOME OLDER CHARACTERS)**


## Server application
For building the server application **(NOTE THAT YOU NEED NODE.JS TO RUN THE SERVER)**:
```
cd server-application
npm install
npm run build-server
npm run start-server
```

The server port is set to 3001 by default, change it manually in `server-application/.env`
before building if you prefer to forward another port. The server will tell
you your public ip address which can be used by players to connect to the game.
If you are running the application from the same machine as you are hosting the 
game, you should use `localhost` or `127.0.0.1` as the address for connecting to the game
yourself.

This application will be build at later point to electron, so you can change the server options
from GUI.

Alternatively if you want to use `pm2` to host this from a remote server to make sure
the application stays open, you can start the server by:
```
cd server-application
npm install
npm run start-production
```
The server will out the logs into `server-application/logs`, and you can find your public ip
from there in case you don't know it yourself or you don't have a registered domain name.

In case you are running it from a remote server, you also have to provide that publid address
when hosting the game.

## Electron application
This is still TBD, it's not required to run the game.
