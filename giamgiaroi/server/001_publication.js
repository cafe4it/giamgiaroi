/**
 * Created by nxcong on 06/08/2015.
 */
if(Meteor.isServer){
    Meteor.publish(null, function(){
        return Meteor.users.find({ "status.online": true }, { fields: {profile : 1, emails : 1, status : 1} });
    })
}
