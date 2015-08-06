var flipkartRoutes = FlowRouter.group({
    prefix: '/fa'
});

flipkartRoutes.route('/', {
    name: 'flipkart_home',
    subscriptions: function (p, q) {
        this.register('Flipkart_Products', Meteor.subscribe('Flipkart_Products'));
    },
    action: function (p, q) {
        BlazeLayout.render('defaultLayout', {top: 'header', main: 'flipkart_home'})
    }
});

flipkartRoutes.route('/offers', {
    name: 'flipkart_offers',
    action: function (p, q) {
        BlazeLayout.render('defaultLayout', {top: 'header', main: 'flipkart_offers'})
    }
})

flipkartRoutes.route('/:productId/:slug', {
    name: 'flipkart_product_detail',
    action: function (p, q) {
        BlazeLayout.render('defaultLayout', {top: 'header', main: 'flipkart_product_detail'})
    }
});

flipkartRoutes.route('/:productId', {
    name: 'flipkart_product_detail2',
    subscriptions: function (p, q) {
        var params = {productId: p.productId};
        this.register('Flipkart_Product', Meteor.subscribe('Flipkart_Product_By', params));
        this.register('Flipkart_Product_Price', Meteor.subscribe('Flipkart_Product_Price', p.productId));
    },
    action: function (p, q) {
        BlazeLayout.render('defaultLayout', {top: 'header', main: 'flipkart_product_detail'})
    }
})