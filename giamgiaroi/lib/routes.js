if (Meteor.isClient) {
    FlowLayout.setRoot('body');
}

FlowRouter.route('/', {
    name: 'home',
    action: function (p, q) {
        FlowLayout.render('defaultLayout', {top: 'header', main: 'home'});
    }
});

var flipkartRoutes = FlowRouter.group({
    prefix : '/flipkart'
});

flipkartRoutes.route('/',{
    name : 'flipkart_home',
    action : function(p,q){
        FlowLayout.render('defaultLayout',{top : 'header', main:'flipkart_home'})
    }
})