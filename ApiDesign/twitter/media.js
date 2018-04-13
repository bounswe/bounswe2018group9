const Twit = require('twit');
const config = require('./config');
const twitter = new Twit(config);

//for multiple image 
/*   
var img1 = 'abc1.jpg';
var img2 = 'abc2.jpg';
var img3 = 'abc3.jpg';

var image = img1+','+img2+','+img3;
*/

//take an image 
var image = fs.readFileSync('media_pic/actopus.png', {encoding: 'base64'});

twitter.post('media/upload', {media: image}, 

  function(err, data, res) {
      if (err) console.log(err);
      console.log(data);

twitter.post('statuses/update', {status: 'test picture', media_ids: data.media_id_string}, 

  function(err, params, res) {
      if (err) console.log(err);
      console.log(params);

});

});