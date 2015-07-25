if(Meteor.isServer){
    Meteor.publish('Flipkart_Products',function(){
        return FlipkArt_Products.find();
    });

    Meteor.publish('Flipkart_Products_Prices',function(){
        return FlipkArt_Products_Prices.find();
    });
}