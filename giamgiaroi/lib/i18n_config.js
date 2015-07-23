getUserLanguage = function () {
    // Put here the logic for determining the user language
    return "en";
};

if (Meteor.isClient) {
    Meteor.startup(function () {
        Session.set("showLoadingIndicator", true);

        TAPi18n.setLanguage(getUserLanguage())
            .done(function () {
                Session.set("showLoadingIndicator", false);
                document.title = TAPi18n.__('ui_title');
            })
            .fail(function (error_message) {
                // Handle the situation
                console.log(error_message);
            });
    });
}