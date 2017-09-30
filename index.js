global.Olm = require('olm');
const sdk = require('matrix-js-sdk');

const config = require('./config.js');
const makeChatMatcher = require('./chatMatcher.js');
const app = require('./app.js'); // Our 'routes'

const chatMatcher = makeChatMatcher(app); // Our route matcher

const client = sdk.createClient({ // Create a client with data from config.js
    baseUrl: config.matrix.baseUrl,
    userId: config.matrix.userId,
    accessToken: config.matrix.accessToken
});

client.startClient(); // Because apparently this is necessary?

client.joinRoom('!sYICLzORYjXFkVEPGl:matrix.org').done(function (member) { // Join an already created room
    console.log("Joined %s", member.roomId);
    client.sendTextMessage('!sYICLzORYjXFkVEPGl:matrix.org', 'Matrix Bot just joined the room...'); // Send message to specified room
});

client.on("Room.timeline", async function (event, room, toStartOfTimeline) { // Listen to Room Timeline events
    if (toStartOfTimeline) {
        return; // don't print paginated results
    }
    if (event.getType() !== "m.room.message") {
        return; // only print messages
    }

    const messageBody = event.getContent().body;
    const messageHandler = chatMatcher(messageBody); // Get the relevant handler from app.js
    if (messageHandler) {
        await messageHandler(room.roomId, event, client); // Execute with arbitrary arguments (get passed as is to the method in app.js)
    }

    console.log("(%s) %s :: %s", room.name, event.getSender(), messageBody); //Log all messages in room
});