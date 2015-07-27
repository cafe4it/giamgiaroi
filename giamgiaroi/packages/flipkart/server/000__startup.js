if (Meteor.isServer) {

    Meteor.startup(function(){
        if(FlipkArt_Keys.find().count() === 0){
            FlipkArt_Keys.insert({
                acc : 'cafe4it',
                id : FlipkArtApi.Id,
                tmp : FlipkArtApi.ProductLinkTmp
            });
        }
    });
}