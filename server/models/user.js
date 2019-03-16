const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('./../config/config').get(process.env.NODE_ENV);
const SALT_I = 10;

const userSchema = mongoose.Schema({
    email: {
        type: String,
        require: true,
        trim: true, 
        unique:1
    },
    password: {
        type: String,
        require: true, 
        minlength: 7
    },
    token: {
        type: String, 
        require: true
        // may have as many tokens as you wish
    }
});

userSchema.pre('save', function(next) {
    var user = this;

    // we set up the isModified to see if the password was changed at all
    // if not, it moves to else, which moves to the next line of code
    if (user.isModified('password')) {

        bcrypt.genSalt(SALT_I, function(err, salt) {
            if(err) return next(err) // we use next to move to the next line of code
            bcrypt.hash(user.password, salt, function (err, hash){
                if(err) return next(err);
                user.password = hash;
                next();
            }) 
        })
    } else {
        next();
    }


})


userSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch)
    })
}











// make sure a callback is in () with the function or it will throw an error
// you can now receive a token in postman
userSchema.methods.generateToken = function(cb) {
    let user = this;
    let token = jwt.sign(user._id.toHexString(), config.SECRET); // _id is provided to us by mongo

    user.token = token;
    user.save((err, user) => {
        if (err) return cb(err); // cb (callback) catches the actual error
        cb(null, user); // if everything in the line above is okay, we say null and it passes to the user
        
    
    })
};


userSchema.statics.findByToken = function(token, cb) {
    const user = this;

    jwt.verify(token, config.SECRET, (err, decode) => {
        user.findOne({'_id':decode, 'token':token}, (err, user) => {
            if(err) return cb(err);
            cb(null, user);
        })
    })
}


userSchema.methods.deleteToken = function (token, cb) {
    const user = this;

    // update the token 
    user.update({$unset:{token:1}}, (err, user) => {
        if(err) return cb(err);
        cb(null, user)
    })
}



const User = mongoose.model('User', userSchema);

module.exports = {User};