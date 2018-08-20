const SlackBot = require('slackbots');
const axios = require('axios');

const bot = new SlackBot({
    token: 'xoxb-140654796118-421257420758-a3AHue4Lay0vCsUqjSnYM0Pm',
    name: 'clownbot'
});

// Start Handler
bot.on('start', () => {
    const params = {
        icon_emoji: ':joy:'
    };

    bot.postMessageToChannel(
        'random',
        'Lighten up your day with @Jokebot!',
        params
    );
});

// error handler
bot.on('error', err =>
    console.log(err)
);