var flipkartRoutes = FlowRouter.group({
    prefix: '/flipkart'
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

flipkartRoutes.route('/:productId/:slug', {
    name: 'flipkart_product_detail',
    subscriptions: function (p, q) {
        var params = {productId: p.productId, slug: p.slug};
        this.register('Flipkart_Product', Meteor.subscribe('Flipkart_Product_By', params));
        this.register('Flipkart_Product_Price', Meteor.subscribe('Flipkart_Product_Price', p.productId));
    },
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