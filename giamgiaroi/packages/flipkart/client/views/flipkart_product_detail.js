Template.flipkart_product_detail.onCreated(function () {
    var self = this;
    self.product = new ReactiveVar({});
    self.currentPrice = new ReactiveVar(0)
    self.autorun(function (c) {
        if (FlowRouter.subsReady()) {
            var product = FlipkArt_Products.findOne();
            self.product.set(product);
            self.currentPrice.set(product.currentSeller().price)
            $('input#txtPrice').autoNumeric('set', self.currentPrice.get() - 1);
            c.stop();
        }
    })
})

Template.flipkart_product_detail.helpers({
    product: function () {
        return Template.instance().product.get();
    },
    selectedSeller: function (selected) {
        return (selected) ? 'selected' : ''
    },
    currentPrice: function () {
        var currentPrice = Template.instance().currentPrice.get();
        return currentPrice;
    }
})

Template.flipkart_product_detail.rendered = function () {
    $(document).ready(function () {
/*        $('.productImage').find('img').each(function () {
            var imgClass = (this.width / this.height > 1) ? 'wide' : 'tall';
            $(this).addClass(imgClass);
        });*/

        $('input#txtPrice').autoNumeric('init');
        if(Template.instance().currentPrice.get()){
            $('input#txtPrice').autoNumeric('set', Template.instance().currentPrice.get() - 1);
        }
    })
}

Template.flipkart_product_detail.events({
    'change #sltSeller': function (e, t) {
        e.preventDefault();
        var product = t.product.get(),
            sellers = product.latest().sellers,
            seller_id = $('#sltSeller').val(),
            selected_Seller = _.findWhere(sellers, {seller_id: seller_id});
        t.currentPrice.set(selected_Seller.price);
        $('input#txtPrice').autoNumeric('set', selected_Seller.price - 1);
    }
})