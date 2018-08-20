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

    // bot.postMessageToChannel(
    //     'random',
    //     'Lighten up your day with @clownbot!',
    //     params
    // );

    bot.postMessageToUser(
        'dmdinh',
        'herro world',
        params
    );
});

// error handler
bot.on('error', err =>
    console.log(err)
);

// message handler
bot.on('message', data => {
    if (data.type !== 'message') {
        return;
    }
    console.log(data);

    handleMessage(data.text);
});

// Respons to Data
function handleMessage(message) {
    if (message.includes(' chucknorris') || message.includes(' chuck norris')) {
        chuckJoke();
    } else if (message.includes(' yomama') || message.includes(' yo mama') ||
    message.includes(' yomomma') || message.includes(' yo momma')) {
        yoMamaJoke();
    }
}

// tell chuck norris joke
function chuckJoke() {
    // hit chuck norris api endpoint
    axios.get('http://api.icndb.com/jokes/random').then(res => {
        const joke = res.data.value.joke;

        const params = {
            icon_emoji: ':laughing:'
        };

        // send to channel
        bot.postMessageToChannel('general', `Chuck Norris: ${joke}`, params);
    });
}

// tell yo mama joke
function yoMamaJoke() {
    axios.get('http://api.yomomma.info').then(res => {
        const joke = res.data.joke;

        const params = {
            icon_emoji: ':laughing:'
        };

        bot.postMessageToChannel('general', `Yo Mama: ${joke}`, params);
    });
}