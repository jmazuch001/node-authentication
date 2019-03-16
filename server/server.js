const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const bcrypt = require('bcrypt');
const config = require('./config/config').get(process.env.NODE_ENV);

// const port = process.env.PORT || 3000;
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect(config.DATABASE);


const {User} = require('./models/user');
const {auth} = require('./middleware/auth');


app.use(bodyParser.json());

// POST
app.post('/api/user', (req, res) => {
  const user = new User ({
    email:req.body.email,
    password: req.body.password
  });

  user.save((err, doc) => {
    if (err) res.status(400).send(err);
    user.generateToken((err, user) => {
      if(err) res.status(400).send(err);
      res.header('x-token', user.token).send(user)
    })
  })

});



app.get('/user/profile', auth, (req, res) => {
  res.status(200).send(req.token)
})

// LOGOUT
app.delete('/user/logout', auth, (req, res) => {
  // res.send(req.user);
  // will grab the token from user and delete for logout
  req.user.deleteToken(req.token, (err, user) => {
    if(err) res.status(400).send(err);
    res.status(200);
  });
})

app.listen(config.PORT, () => {
  console.log(`Started on port ${config.PORT}`)
})

