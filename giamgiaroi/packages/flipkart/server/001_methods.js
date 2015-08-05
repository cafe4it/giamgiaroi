if (Meteor.isServer) {
    function product_detail_link(pid, slug) {
        var detail_link = FlowRouter.path('flipkart_product_detail', {productId: pid, slug: slug});
        return Meteor.absoluteUrl(detail_link.substr(1))
    }

    Meteor.methods({
        getProductLink: function (path, productId) {
            var tmp = _.template(FlipkArtApi.ProductLinkTmp);
            return tmp({path: path, pId: productId, affId: FlipkArtApi.Id});
        },
        FlipkArt_ProductFeeds: function () {
            try {
                var rs = Async.runSync(function (done) {
                    var productFeedsUrl = FlipkArtApi.urls.ProductFeedsAPI();
                    HTTP.call('GET', productFeedsUrl, function (err, result) {
                        if (err) throw new Meteor.Error(err);
                        done(null, result);
                    })
                })
                return {
                    msg: 'Success',
                    data: rs.result
                }
            } catch (ex) {
                console.log(ex)
            }
            return {
                msg: 'Fail',
                data: []
            }
        },
        FlipkArt_getProductById: function (pId) {
            try {
                check(pId, String);
                var rs = Async.runSync(function (done) {
                    var productUrl = FlipkArtApi.urls.ProductById(pId),
                        authenticate = FlipkArtApi.helpers.HeadersAuthenticate();
                    HTTP.call('GET', productUrl, {
                        headers: authenticate
                    }, function (err, result) {
                        if (err) throw new Meteor.Error(err);
                        done(null, result);
                    })
                })
                return {
                    msg: 'Success',
                    data: rs.result
                }
            } catch (ex) {
                console.log(ex)
            }
            return {
                msg: 'Fail',
                data: {}
            }
        },
        FlipkArt_getDotd : function(){
            try{
                var rs = Async.runSync(function(done){
                    var dotd_Url = 'https://affiliate-api.flipkart.net/affiliate/offers/v1/dotd/json',
                        authenticate = FlipkArtApi.helpers.HeadersAuthenticate();
                    HTTP.call('GET', dotd_Url, {
                        headers : authenticate
                    },function(err, result){
                        if(err) throw new Meteor.Error(err);
                        if(result.data.dotdList){
                            done(null, result.data.dotdList);
                        }
                    })
                })
                return {
                    msg : 'Success',
                    data : rs.result
                }
            }catch(ex){
                console.log(ex)
            }
            return {
                msg : 'Fail',
                data : []
            }
        },
        FlipkArt_getTopOffers : function(){
            try{
                var rs = Async.runSync(function(done){
                    var dotd_Url = 'https://affiliate-api.flipkart.net/affiliate/offers/v1/top/json',
                        authenticate = FlipkArtApi.helpers.HeadersAuthenticate();
                    HTTP.call('GET', dotd_Url, {
                        headers : authenticate
                    },function(err, result){
                        if(err) throw new Meteor.Error(err);
                        if(result.data.topOffersList){
                            done(null, result.data.topOffersList);
                        }
                    })
                })
                return {
                    msg : 'Success',
                    data : rs.result
                }
            }catch(ex){
                console.log(ex)
            }
            return {
                msg : 'Fail',
                data : []
            }
        },
        Extension_initProduct: function (product) {
            try {
                check(product, {
                    pid: String,
                    title: String,
                    originalTitle : String,
                    description: String,
                    price: String,
                    maxPrice: String,
                    thumbnail: String,
                    pathName: String,
                    seller : {
                        id : String,
                        name : String
                    },
                    sellertables : String
                });
                var p = FlipkArt_Products.findOne({productId: product.pid}),
                    productLinkDetail = '';
                if (!p) {
                    var slug = s.slugify(product.title),
                        updatedAt = new Date;
                    var pid = FlipkArt_Products.insert({
                        productId: product.pid,
                        title: product.title,
                        originalTitle: product.originalTitle,
                        slug: slug,
                        path: product.pathName,
                        description: product.description,
                        thumbnail: product.thumbnail,
                        updatedAt: updatedAt
                    });
                    var price = (s.startsWith(product.price, 'Rs.')) ? s.strRight(product.price, 'Rs.').trim() : product.price,
                        maxPrice = (s.startsWith(product.maxPrice, 'Rs.')) ? s.strRight(product.maxPrice, 'Rs.').trim() : product.maxPrice;
                    var sellers = [];
                    if(product.sellertables === ''){
                        var oneSeller = {
                            seller_id : product.seller.id,
                            seller_name : product.seller.name,
                            price : priceToNumber(price),
                            max_price : priceToNumber(maxPrice),
                            isDefault : true
                        }
                        sellers.push(oneSeller);
                    }else{
                        var sellertables = JSON.parse(product.sellertables);
                        if(_.has(sellertables,'dataModel')){
                            sellers = _.map(sellertables.dataModel,function(seller){
                                return {
                                    seller_id : seller.sellerInfo.link,
                                    seller_name : seller.sellerInfo.name,
                                    price : priceToNumber(seller.priceInfo.sellingPrice),
                                    max_price : priceToNumber(seller.priceInfo.price),
                                    isDefault : (seller.sellerInfo.link === product.seller.id)
                                }
                            })
                        }
                    }
                    FlipkArt_Products_Prices.upsert({productId: product.pid}, {
                        $set: {
                            productId: product.pid,
                            sellers : sellers,
                            updatedAt: updatedAt
                        }
                    });
                    productLinkDetail = product_detail_link(product.pid, slug);
                } else {
                    productLinkDetail = product_detail_link(p.productId, p.slug);
                }
                Meteor.call('FlipkArt_addRecentProduct', product.pid);
                return productLinkDetail;
            } catch (ex) {
                console.log(ex)
            }
        },
        getProductInfoByIdFromExtension: function (productId) {
            check(productId, String);
            var product = FlipkArt_Products.findOne({productId: productId});
            if (product) {
                var productDetail = product_detail_link(product.productId, product.slug);
                return productDetail;
            }
            return {};
        },
        FlipkArt_addRecentProduct : function(productId){
            check(productId, String);
            var clientAddress = this.connection.clientAddress,
                userId = this.userId || '',
                isExists = undefined;
            if(_.isEmpty(userId)){
                isExists = FlipkArt_Products_Recent.findOne({productId : productId, clientAddress : clientAddress});

            }else{
                isExists = FlipkArt_Products_Recent.findOne({productId : productId, userId : userId});
            }

            if(isExists){
                FlipkArt_Products_Recent.update({_id : isExists._id},{
                    $set : {
                        updatedAt : new Date
                    }
                });
            }else{
                FlipkArt_Products_Recent.insert({
                    productId : productId,
                    clientAddress : clientAddress,
                    userId : userId,
                    updatedAt : new Date
                });
            }
        }
    })
}

function priceToNumber(price){
    return parseFloat(price.toString().replace(/,/g, ''))
}