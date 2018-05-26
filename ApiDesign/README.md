## API DESIGN

### Installation

Since we are using NodeJS, NPM should be installed from [here](https://nodejs.org/en/download/).

After installation, you can check on the terminal:

`
npm -v
`

`
node -v
`

If these two commands run properly, you can continue with:

`
cd ApiDesign
`

`
npm install
`

### Twitter API

We will use Twit package for simplifying things, its documentation is [here](https://www.npmjs.com/package/twit).

#### Twit Package
In `twitter/basics.js`, initialization of the package is done. The package provides an object to be used for API calls.

```javascript
const Twit = require('twit');

// Get authentication keys
const config = require('./config');

const twitter = new Twit(config);
```

Everyone should create a new file for the calls s/he will make. In that file the `twitter` object should be imported just like this:

```
const basics = require('./basics');

// Then you can use basics.twitter
basics.twitter.get('search/tweets', {q: contains, count: count }, callback);
```
#### An Example Call

First we can define a callback function. This is the function called when the response from the Twitter API is received.

``` javascript
function printTweets(error, data, response) {
    if(data != null){
        const tweets = data.statuses;
        for (let i=0; i<tweets.length; i++){
            console.log(tweets[i].text);
        }
    } else {
        console.log('No tweet is retrieved');
    }
}
```

We should specify some parameters for Twitter API within an object just like this:

``` javascript
const params = {q: 'zeytindalı', count: 2};
```

These parameters say that give me 2 tweets containing the keyword 'zeytindalı'

As the last step we are calling the Twitter API

``` javascript
twitter.get('search/tweets', params, printTweets);
```

You can make this call running basics.js file with the command: `node twitter/basics.js` when you are in the `ApiDesign` directory.
