const bcrypt = require ('bcrypt');
const {MD5} = require ('crypto-js');
const jwt = require ('jsonwebtoken');

// bcrypt.genSalt(10, (err, salt) => {
   
//     if (err) return next(err);

//     bcrypt.hash('password123', salt, (err, hash) => {
//         if (err) return next(err);
//         console.log(hash)
//     })
// })



///////////////////////////////////////////////////////////////////////
// someone can decode the token, so in the real world, we do this: 
// const secret = 'supersecret';
// const secretSalt = 'o987uq2934i5nfnasdlfkj'

// var user = {
//     id:1,
//     token: MD5('password945').toString() + secretSalt
// }

// take the newly formed token and add the variable
// const receivedToken = 'd119e1994f1752fea19798c673d29884o987uq2934i5nfnasdlfkj';

// if (receivedToken === user.token) {
//     console.log('move forward')
// }


// console.log(user)
// console.log(user.token)

///////////////////////////////////////////////////////////////////////

let id = "10000";
const secret = 'supersecret';


const receivedToken = "eyJhbGciOiJIUzI1NiJ9.MTAwMDA.v46XZTowl3YeHvoQ486peBU7y_xLvf6N5nvTdo2WhsQ"
const token = jwt.sign(id,secret);
const decodeToken = jwt.verify(receivedToken, secret)

console.log(decodeToken)




 // console.log(salt)
    // when you run node hash, it will return a long string of alphanumeric characters
    // this will be the password you'll use this hash password to be stored in the database