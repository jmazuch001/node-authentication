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




let id = "10000";
const secret = 'supersecret';


const receivedToken = "eyJhbGciOiJIUzI1NiJ9.MTAwMDA.v46XZTowl3YeHvoQ486peBU7y_xLvf6N5nvTdo2WhsQ"
const token = jwt.sign(id,secret);
const decodeToken = jwt.verify(receivedToken, secret)

console.log(decodeToken)




 // console.log(salt)
    // when you run node hash, it will return a long string of alphanumeric characters
    // this will be the password you'll use this hash password to be stored in the database
