const express = require('express');
const bodyParser = require('body-parser');
const twitter = require('./twitter').router;

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static('static'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api/twitter', twitter);

app.listen(port, () => {
    console.log('Server is running on ' + port);
});
