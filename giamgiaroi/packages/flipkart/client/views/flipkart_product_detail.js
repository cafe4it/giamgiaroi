Template.flipkart_product_detail.onCreated(function () {
    var self = this;
    self.product = new ReactiveVar({});
    self.currentPrice = new ReactiveVar(0)
    self.autorun(function (c) {
        if (FlowRouter.subsReady()) {
            var product = FlipkArt_Products.findOne();
            self.product.set(product);
            self.currentPrice.set(product.currentSeller().price);
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
        return Template.instance().currentPrice.get();
    },
    currentPrice1 : function () {
        return Template.instance().currentPrice.get() - 1;
    }
})

Template.flipkart_product_detail.rendered = function () {
    $(document).ready(function () {

        //$('input#txtPrice').autoNumeric('init');
        /*if(Template.instance().currentPrice.get()){
            $('#txtPrice').val(reformatPrice(Template.instance().currentPrice.get() - 1));
        }*/
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
    },
    'keyup #txtPrice' : function (e, t) {
        e.preventDefault();
        var price = $('#txtPrice').val();
        if(!price || _.isEmpty(price)) return;
        $('#txtPrice').val(reformatPrice(price));
    },
    'keypress #txtPrice' : function(e,t){
        if (e.keyCode < 48 || e.keyCode > 57) return false;
    }
});

function reformatPrice(price){
    return numeral(price).format('0,0');
}