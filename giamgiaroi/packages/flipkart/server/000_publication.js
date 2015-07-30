if(Meteor.isServer){
    Meteor.publish(null, function(){
        return FlipkArt_Keys.find();
    })

    Meteor.publish('Flipkart_Products',function(){
        return FlipkArt_Products.find();
    });

    Meteor.publish('Flipkart_Products_Prices',function(){
        return FlipkArt_Products_Prices.find();
    });

    Meteor.publish('Flipkart_Product_By',function(params){
        return FlipkArt_Products.find(params);
    });

    Meteor.publish('Flipkart_Product_Price',function(productId){
        return FlipkArt_Products_Prices.find({productId : productId});
    });
}