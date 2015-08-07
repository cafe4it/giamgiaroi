Users = Meteor.users;

Users.helpers({
    isNotYetVerifyEmail : function(){
        return !this.emails[0].verified;
    },
    ipAddress : function(){
        return (this.status) ? this.status.lastLogin.ipAddr : headers.getClientIP();
    }
})