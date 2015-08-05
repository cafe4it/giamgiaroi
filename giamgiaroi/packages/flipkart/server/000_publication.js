if(Meteor.isServer){
    Meteor.publish(null, function(){
        return FlipkArt_Keys.find();
    })

    Meteor.publish('Flipkart_Products',function(params){
        var params = params || {};
        return FlipkArt_Products.find(params);
    });

    Meteor.publish('Flipkart_Products_Prices',function(){
        return FlipkArt_Products_Prices.find();
    });

    Meteor.publish('Flipkart_Product_By',function(params){
        Meteor._sleepForMs(200);
        return FlipkArt_Products.find(params);
    });

    Meteor.publish('Flipkart_Product_Price',function(productId){
        Meteor._sleepForMs(200);
        return FlipkArt_Products_Prices.find({productId : productId},{sort : {updatedAt : -1},limit : 1});
    });

    Meteor.publish('FlipkArt_Offers',function(type){
        Meteor._sleepForMs(500);
        return FlipkArt_Offers.find({type : type});
    })

    Meteor.publish('FlipkArt_Offers_hasLimit',function(type,limit){
        Meteor._sleepForMs(500);
        return FlipkArt_Offers.find({type : type}, {limit : limit});
    });

    Meteor.publish('Flipkart_Products_Recent',function(params, limit){
        var limit = limit || 20;
        return FlipkArt_Products_Recent.find(params,{sort : {updatedAt : -1}, limit : limit});
    })
}