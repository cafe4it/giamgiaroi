var flipkartRoutes = FlowRouter.group({
    prefix : '/flipkart'
});

flipkartRoutes.route('/',{
    name : 'flipkart_home',
    subscriptions : function(p,q){
        this.register('Flipkart_Products', Meteor.subscribe('Flipkart_Products'));
    },
    action : function(p,q){
        FlowLayout.render('defaultLayout',{top : 'header', main:'flipkart_home'})
    }
});