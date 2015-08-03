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
        return FlipkArt_Products_Prices.find({productId : productId},{sort : {updatedAt : -1},limit : 1});
    });

    Meteor.publish('FlipkArt_Offers',function(type){
        return FlipkArt_Offers.find({type : type});
    })

    Meteor.publish('FlipkArt_Offers_hasLimit',function(type,limit){
        return FlipkArt_Offers.find({type : type}, {limit : limit});
    })
}