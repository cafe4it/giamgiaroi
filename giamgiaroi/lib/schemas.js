Users = Meteor.users;

Users.helpers({
    isVerified : function(){
        return this.emails[0].verified;
    }
})