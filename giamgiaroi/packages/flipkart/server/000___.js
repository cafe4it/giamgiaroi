var cfg = JSON.parse(Assets.getText("private/flipkart.json"));
FlipkArtApi = {};
FlipkArtApi = _.extend(FlipkArtApi, {
    Id : cfg.Id,
    Token : cfg.Token,
    ProductLinkTmp : cfg.ProductLinkTmp
});