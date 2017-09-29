function makeChatMatcher(commands) {
    const keyRegExps = Object.keys(commands)
        .reduce((acc, commandTemplate) => {
            const extractAreas = commandTemplate.slice().replace(/\[[^\]]+\]/g, '(.+)');
            acc[extractAreas] = commandTemplate;
            return acc;
        }, {});

    return function chatMatcher(message) {

        const regExp = Object.keys(keyRegExps)
            .find(regExp => new RegExp(regExp).test(message));

        const template = keyRegExps[regExp];
        const command = commands[template];
        if (command) {
            const areaNames = template.split('[').slice(1).map(s => s.split(']')[0]);
            const values = (message.match(new RegExp(regExp)) || []).slice(1);
            const valueObj = areaNames.reduce((acc, key, index) => {
                acc[key] = values[index];
                return acc;
            }, {});
            return function(...args){
                command(valueObj, ...args);
            };
        } else {
            return Promise.resolve();
        }
    }
}

module.exports = makeChatMatcher;