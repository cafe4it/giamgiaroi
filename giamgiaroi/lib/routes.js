if (Meteor.isClient) {
    FlowLayout.setRoot('body');
}

FlowRouter.route('/', {
    name: 'home',
    action: function (p, q) {
        FlowLayout.render('defaultLayout', {top: 'header', main: 'home'});
    }
});

FlowRouter.route('/dangky-dangnhap', {
    name: 'authenticate',
    action: function (p, q) {
        FlowLayout.render('defaultLayout', {top: 'header', main: 'authenticate'});
    }
})