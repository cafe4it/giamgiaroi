if (Meteor.isServer) {
    Meteor.methods({
        RegisterUser: function (model) {
            try{
                check(model, {
                    username: String,
                    email: String,
                    password: String
                });

                var userId = Accounts.createUser(model);

                Roles.addUsersToRoles(userId, ['user']);

                return 'success';
            }catch(ex){
                console.log(ex);
                return 'fail';
            }
        },
        RootUrl : function(){
            return process.env.IP_SERVER || process.env.ROOT_URL;
        }
    })
}