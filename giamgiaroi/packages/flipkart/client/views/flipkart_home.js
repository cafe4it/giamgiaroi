Template.flipkart_home.helpers({
    products : function(){
        return FlipkArt_Products.find({},{sort : {updatedAt : -1}});
    }
})