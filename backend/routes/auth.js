var express = require('express');
var router = express.Router();

router.post('/signup',function(req,res,next){
    
    var user = {};
    user.email = req.body.email;
    user.firstName = req.body.firstName;
    user.lastName = req.body.lastName;
    user.password = req.body.password;

    if (!req.body.password){
        res.status(400);
        res.send('Please enter password');
    } else {
        // Connect to mongo and save the user.
        // Send the registered user back.
        res.status(200);
        res.send(user);
    }

});

module.exports = router;