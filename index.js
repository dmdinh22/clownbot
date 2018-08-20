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
    'Lighten up your day with @clownbot!',
    params
  );

  // for testing
  // bot.postMessageToUser(
  //   'dmdinh',
  //   'herro world',
  //   params
  // );
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

  handleMessage(data.text);
});

// Respons to Data
function handleMessage(message) {
  if (message.includes(' chucknorris') || message.includes(' chuck norris')) {
    chuckJoke();
  } else if (message.includes(' yomama') || message.includes(' yo mama') ||
    message.includes(' yomomma') || message.includes(' yo momma')) {
    yoMamaJoke();
  } else if (message.includes(' random')) {
    randomJoke();
  } else if (message.includes(' help')) {
    showHelp();
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
    bot.postMessageToChannel('random', `Chuck Norris: ${joke}`, params);

    // for testing
    //bot.postMessageToUser('dmdinh', `Chuck Norris: ${joke}`, params);
  });
}

// tell yo mama joke
function yoMamaJoke() {
  axios.get('http://api.yomomma.info').then(res => {
    const joke = res.data.joke;

    const params = {
      icon_emoji: ':laughing:'
    };

    bot.postMessageToChannel('random', `Yo Mama: ${joke}`, params);

    // for testing
    //bot.postMessageToUser('dmdinh', `Yo Mama: ${joke}`, params);
  });
}

// tell random joke
function randomJoke() {
  const rand = Math.floor(Math.random() * 2) + 1;
  if (rand === 1) {
    chuckJoke();
  } else if (rand === 2) {
    yoMamaJoke();
  }
}

function showHelp() {
  const params = {
    icon_emoji: ':question:'
  };

  bot.postMessageToChannel(
    'random',
    'Type @jokebot with either \'chucknorris\', \'dadjoke\', '\
    'yomama\' or \'random\' to get a joke',
    params
  );
}