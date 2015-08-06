/**
 * Created by nxcong on 24/07/2015.
 */
if(Meteor.isServer){
    Meteor.startup(function(){
        initAdmin();

        Accounts.onCreateUser(function(option, user){
            var roles = ['user'];
            Roles.addUsersToRoles(user._id, roles);
            user = _.extend(user,{profile : option.profile, roles : roles});
            Meteor.setTimeout(function() {
                Accounts.sendVerificationEmail(user._id);
            }, 2 * 1000);
            return user;
        });
        Kadira.connect('qtPLcbBZsKYBE63cE', 'de208fbd-80b3-4aef-9921-d3775feee37c');
    })

    var initAdmin = function(){
        if (Meteor.users.find().count() == 0) {
            var adminCfg = JSON.parse(Assets.getText('admin.json'));
            check(adminCfg, {
                username: String,
                email: String,
                password: String,
                roles : [String],
                profile: {
                    fullName: String,
                    locale : String
                }
            });
            if (adminCfg) {
                var uId = Accounts.createUser({
                    username : adminCfg.username,
                    email : adminCfg.email,
                    password : adminCfg.password,
                    profile : adminCfg.profile
                });

                Meteor.users.update({_id : uId},{
                    $set : {
                        "emails.0.verified" : true
                    }
                });

                Roles.addUsersToRoles(uId, adminCfg.roles);
                console.log('admin Id : ', uId);
            }
        }
    }


}
