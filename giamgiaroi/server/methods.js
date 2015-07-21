if (Meteor.isServer) {
    Meteor.methods({
        RegisterUser: function (model) {
            check(model, {
                username: String,
                email: String,
                password: String
            });

            var userId = Accounts.createUser(model.username, model.email, model.password);

            
        }
    })
}