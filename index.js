global.Olm = require('olm');
const sdk = require('matrix-js-sdk');

const app = require('./app.js');
const config = require('./config.js');
const makeChatMatcher = require('./chatMatcher.js');


const chatMatcher = makeChatMatcher(app);

const client = sdk.createClient({
    baseUrl: config.matrix.baseUrl,
    userId: config.matrix.userId,
    accessToken: config.matrix.accessToken
});

client.on("Room.timeline", async function (event, room, toStartOfTimeline) {
    if (toStartOfTimeline) {
        return; // don't print paginated results
    }
    if (event.getType() !== "m.room.message") {
        return; // only print messages
    }

    const messageBody = event.getContent().body;
    const messageHandler = chatMatcher(messageBody);
    await messageHandler(room.roomId, event, client);

    console.log("(%s) %s :: %s", room.name, event.getSender(), event.getContent().body); //Log all messages in room
});

client.startClient();

client.joinRoom('!sYICLzORYjXFkVEPGl:matrix.org').done(function (member) {
    console.log("Joined %s", member.roomId);
    client.sendTextMessage('!sYICLzORYjXFkVEPGl:matrix.org', 'Matrix Bot just joined the room...');
});