const router = require('express').Router();
let user = require('../models/Users');

/* Get the details of accounts table in the form the JSON data ...*/
router.route('/').get((req,res) => {
    user.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error : ' + err));
});

/* Insert the account details with required feilds verify
   the email id already exists are not ..
...*/

router.route('/add').post((req,res) =>{
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const email = req.body.email;
    const password = req.body.password;
    const newUser = new user({firstname , lastname , email , password});

    user.findOne({
        email 
    }).then(users =>{
        if(!users){
            newUser.save()
            .then(() => res.json("user added"))
            .catch(err => res.status(400).json('Error : ' + err));
        }else{
            res.json("Already Email Exists");
        }
    }).catch(err => { 
        res.send('Error' + err)
    })
});

/* Login validation process match the email and password for validation  */

router.route('/login').post((req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    user.findOne({
        email , password
    }).then(users => {
        if(!users){
            res.json("Username and password are not matched");
        }else{
            res.json("sucess");
        }
    }).catch(err => {
        res.send('Error' + err);
    })
})

module.exports = router;