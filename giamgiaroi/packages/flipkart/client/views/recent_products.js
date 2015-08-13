Template.flipkart_recent_products.onCreated(function () {
    var self = this;

    self.products = new ReactiveVar([])
    self.autorun(function (c) {
        var currentProductId = FlowRouter.getParam('productId') || undefined,
            clientAddress = headers.getClientIP();
        var params = (currentProductId) ? {productId: {$nin: [currentProductId]}} : {},
            params = (Meteor.userId()) ? _.extend(params, {$or :[{userId: Meteor.userId()},{clientAddress : Meteor.user().ipAddress()}]}) : _.extend(params, {clientAddress: clientAddress});
        var recentSubs = self.subscribe('Flipkart_Products_Recent', params);
        if (recentSubs.ready()) {
            var productIds = [],
                productsTmp = FlipkArt_Products_Recent.find(params);
            if (productsTmp.count() <= 0) return;
            _.each(productsTmp.fetch(), function (p) {
                productIds.push(p.productId);
            });
            if (productIds && _.size(productIds) > 0) {
                var productsSubs = self.subscribe('Flipkart_Products', {productId: {$in: productIds}});
                if (productsSubs.ready()) {
                    var productsRecent = FlipkArt_Products.find({productId: {$in: productIds}}, {
                        fields: {
                            productId: 1,
                            title: 1,
                            slug: 1,
                            thumbnail: 1
                        }
                    }).fetch();
                    var tmp = _.map(productIds, function (pId) {
                        return _.findWhere(productsRecent, {productId: pId});
                    });
                    self.products.set(tmp);
                    if (_.size(self.products.get()) > 4) {
                        initCarousel();
                    }
                }
            }
        }
    })

});

Template.flipkart_recent_products.helpers({
    hasRecent: function () {
        return _.size(Template.instance().products.get()) > 0;
    },
    products: function () {
        return Template.instance().products.get();
    },
    has4items: function () {
        return _.size(Template.instance().products.get()) > 4;
    }
});

Template.flipkart_recent_products.events({
    'click [id^="recentProductId_"]': function (e, t) {
        e.preventDefault();
        if (e.currentTarget) {
            var productId = $('[id=' + e.currentTarget.id + ']').attr('data-id');
            var product = _.findWhere(t.products.get(), {productId: productId});
            if (product) {
                var params = {productId: product.productId, slug: product.slug};
                FlowRouter.setParams(params);
            }

        }
    }
})

function initCarousel() {
    setTimeout(function () {
        $('#recentProductItems .item').first().addClass('active');
        $('#recentProductItems.carousel[data-type="multi"] .item').each(function () {
            var next = $(this).next();
            if (!next.length) {
                next = $(this).siblings(':first');
            }
            next.children(':first-child').clone().appendTo($(this));

            for (var i = 0; i < 5; i++) {
                next = next.next();
                if (!next.length) {
                    next = $(this).siblings(':first');
                }

                next.children(':first-child').clone().appendTo($(this));
            }
        });
    }, 100)
}