if (Meteor.isServer) {

    Meteor.startup(function(){
        //initAdmin();
        initFlipkArtCfg();
    });
}

var initFlipkArtCfg = function(){
    var cfg = JSON.parse(Assets.getText("private/flipkart.json"));
    FlipkArtApi = _.extend(FlipkArtApi, {
        Id : cfg.Id,
        Token : cfg.Token
    });
}