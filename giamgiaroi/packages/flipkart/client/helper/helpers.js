Template.registerHelper('product_detail_url', function(pid, slug){
    var params = {productId : pid, slug : slug};
    return FlowRouter.path('flipkart_product_detail', params);
});

Template.registerHelper('formatIndiaCurrency',function(price){
    return numeral(price).format('0,0');
})