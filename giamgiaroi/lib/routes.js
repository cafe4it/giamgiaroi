if (Meteor.isClient) {
    BlazeLayout.setRoot('body');
}

FlowRouter.route('/', {
    name: 'home',
    action: function (p, q) {
        BlazeLayout.render('defaultLayout', {top: 'header', main: 'home'});
    }
});

FlowRouter.route('/verify-email/:token', {
    name: 'verify_email',
    action: function (p, q) {
        BlazeLayout.render('defaultLayout', {top: 'header', main: 'home'});
    }
});