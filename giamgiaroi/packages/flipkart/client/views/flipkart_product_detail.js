Template.flipkart_product_detail.onCreated(function () {
    var self = this;
    self.product = new ReactiveVar({});
    self.sellers = new ReactiveVar([])
    self.currentPrice = new ReactiveVar(0);

    self.autorun(function (c) {
        var productId = FlowRouter.getParam('productId'),
            slug = FlowRouter.getParam('slug'),
            params = (slug) ? {productId: productId, slug: slug} : {productId: productId};
        var productSubs = self.subscribe('Flipkart_Product_By', params),
            pricesSubs = self.subscribe('Flipkart_Product_Price', productId);
        if (productSubs.ready() && pricesSubs.ready()) {
            var product = FlipkArt_Products.findOne({productId: productId});
            self.product.set(product);
            self.currentPrice.set(product.currentSeller().price);
            self.sellers.set(product.sellers());
        }
    })
});

Template.flipkart_product_detail.helpers({
    product: function () {
        return Template.instance().product.get();
    },
    sellers: function () {
        return Template.instance().sellers.get();
    },
    selectedSeller: function (selected) {
        return (selected) ? 'selected' : ''
    },
    currentPrice: function () {
        return Template.instance().currentPrice.get();
    },
    currentPrice1: function () {
        return Template.instance().currentPrice.get() - 1;
    }
});

Template.flipkart_product_detail.events({
    'change #sltSeller': function (e, t) {
        e.preventDefault();
        var sellers = t.sellers.get(),
            seller_id = $('#sltSeller').val(),
            selected_Seller = _.findWhere(sellers, {seller_id: seller_id});
        t.currentPrice.set(selected_Seller.price);
    },
    'keyup #txtPrice': function (e, t) {
        e.preventDefault();
        var price = $('#txtPrice').val();
        if (!price || _.isEmpty(price)) return;
        $('#txtPrice').val(reformatPrice(price));
    },
    'keypress #txtPrice': function (e, t) {
        if (e.keyCode < 48 || e.keyCode > 57) return false;
    }
});

function reformatPrice(price) {
    return numeral(price).format('0,0');
}