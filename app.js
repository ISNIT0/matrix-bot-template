module.exports = {
    "say [words]": function say({
        words
    }, roomName, event, client) {
        console.log('from game.js', words);
        client.sendTextMessage(roomName, 'Boom... ' + words);
    },
    "add [a] [b]": function ({
        a,
        b
    }, roomName, event, client) {
        const sum = Number(a) + Number(b);
        if (isNaN(sum) || typeof sum !== 'number') {
            client.sendTextMessage(roomName, `Don't be silly... Make sure [${a}] & [${b}] are both numbers`);
        } else {
            client.sendTextMessage(roomName, `${a} + ${b} is ${sum}`);
        }
    }
};