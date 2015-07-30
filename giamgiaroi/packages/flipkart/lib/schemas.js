FlipkArt_Keys = new Meteor.Collection('Flipkart_Keys');
FlipkArt_Products = new Meteor.Collection('Flipkart_Products');
FlipkArt_Products_Prices = new Meteor.Collection('FlipkArt_Products_Prices');

FlipkArt_Products.helpers({
    productLink : function(){
        var tmp = _.template((this.key().tmp));
        return tmp({path : this.path, pId : this.productId, affId : this.key().id});
    },
    key : function(){
        return FlipkArt_Keys.findOne({acc : 'cafe4it'});
    },
    latest : function(){
        return FlipkArt_Products_Prices.findOne({productId : this.productId}, {sort : {updatedAt : -1}});
    }
})