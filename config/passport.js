var passport = require('passport');
var GitHubStrategy = require('passport-github2').Strategy;
var mongoose = require('mongoose');

module.exports = function() {

    var Usuario = mongoose.model('Usuario');

    passport.use(new GitHubStrategy({
        clientID: '174a9e9beb9228e7e3a0',
        clientSecret: 'bf420fcf5afed4cd1588751f1a4b6b65cde3a50a',
        callbackURL: 'http://localhost:3000/auth/github/callback'
        }, function(accessToken, refreshToken, profile, done) {
                Usuario.findOrCreate(
                    { "login" : profile.username},
                    { "nome" : profile.username},
                    function(erro, usuario){
                        if(erro){
                            console.log(erro);
                            return done(erro);
                        }
                        return done(null, usuario);
                    }
                )
        }));

    passport.serializeUser(function(usuario, done) {
        done(null, usuario._id);
    });

    passport.deserializeUser(function(id, done) {
        Usuario.findById(id).exec()
        .then(function(usuario) {
                done(null, usuario);
            });
        });
};