const SlackBot = require('slackbots');
const axios = require('axios');

const bot = new SlackBot({
    token: 'xoxb-140654796118-421257420758-a3AHue4Lay0vCsUqjSnYM0Pm',
    name: 'clownbot',
});

// start handler
bot.on('start', () => {
    const params = {
        icon_emoji: ':joy:'
    };

    bot.postMessageToChannel(
        'random',
        'Lighten up your day with @JokeBot',
        params
    );
});