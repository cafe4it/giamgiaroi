Template.flipkart_product_detail.helpers({
    product : function(){
        return FlipkArt_Products.findOne();
    }
})

Template.flipkart_product_detail.rendered = function(){
    $(document).ready(function(){
        $('.productImage').find('img').each(function() {
            var imgClass = (this.width / this.height > 1) ? 'wide' : 'tall';
            $(this).addClass(imgClass);
        })
    })
}