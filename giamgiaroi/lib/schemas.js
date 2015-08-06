Users = Meteor.users;

Users.helpers({
    isNotYetVerifyEmail : function(){
        return !this.emails[0].verified;
    }
})