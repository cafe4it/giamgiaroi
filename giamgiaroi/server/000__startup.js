if (Meteor.isServer) {

    Meteor.startup(function(){
        initAdmin();
        initFlipkArtCfg();
    })
}

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

var initFlipkArtCfg = function(){
    var cfg = JSON.parse(Assets.getText("flipkart.json"));
    FlipkArtApi = _.extend(FlipkArtApi, {
        Id : cfg.Id,
        Token : cfg.Token
    });
}