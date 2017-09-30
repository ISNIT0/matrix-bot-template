module.exports = {
    "say [words] to [target]": function say({
        words,
        target
    }, roomName, event, client) {
        console.log('from game.js', words);
        client.sendTextMessage(roomName, `${target}: ${words}`);
    },
    "add [a] [b]": function add ({
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