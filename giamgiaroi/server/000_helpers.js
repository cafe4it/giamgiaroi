var FlipkArt_Url = {};
var FlipkArt_Helpers = {}
FlipkArt_Url.ProductFeedsAPI = function () {
    var tpl = _.template('https://affiliate-api.flipkart.net/affiliate/api/<%=Id%>.json');
    return tpl({Id: FlipkArtApi.Id});
}

FlipkArt_Url.ProductById = function(pId){
    var tpl = _.template('https://affiliate-api.flipkart.net/affiliate/product/json?id=<%=Id%>')
    return tpl({Id : pId});
}

FlipkArt_Helpers.HeadersAuthenticate = function(){
    return {
        "Fk-Affiliate-Id" : FlipkArtApi.Id,
        "Fk-Affiliate-Token" : FlipkArtApi.Token
    }
}

FlipkArtApi = _.extend(FlipkArtApi, {urls: FlipkArt_Url, helpers : FlipkArt_Helpers});