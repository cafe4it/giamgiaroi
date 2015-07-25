if(Meteor.isServer){

    Meteor.methods({
        FlipkArt_ProductFeeds : function(){
            try{
                var rs = Async.runSync(function(done){
                    var productFeedsUrl = FlipkArtApi.urls.ProductFeedsAPI();
                    HTTP.call('GET',productFeedsUrl,function(err,result){
                        if(err) throw new Meteor.Error(err);
                        done(null, result);
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
        FlipkArt_getProductById : function(pId){
            try{
                check(pId,String);
                var rs = Async.runSync(function(done){
                    var productUrl = FlipkArtApi.urls.ProductById(pId),
                        authenticate = FlipkArtApi.helpers.HeadersAuthenticate();
                    HTTP.call('GET',productUrl,{
                        headers : authenticate
                    },function(err, result){
                        if(err) throw new Meteor.Error(err);
                        done(null,result);
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
                data : {}
            }
        },
        Extension_initProduct : function(product){
            try{
                check(product,{
                    pid : String,
                    title : String,
                    price : Number,
                    thumbnail : String
                });
                var p = FlipkArt_Products.findOne({pid : product.pid});
                if(!p){
                    var slug = s.slugify(product.title),
                        updatedAt = new Date;
                    var pid = FlipkArt_Products.insert({
                        pid : product.pid,
                        title : product.title,
                        slug : slug,
                        thumbnail : product.thumbnail,
                        updatedAt : updatedAt
                    });

                    FlipkArt_Products_Prices.upsert({pid : pid},{
                        $set : {
                            pid : product.pid,
                            price : product.price,
                            updatedAt : updatedAt
                        }
                    });

                    return pid;
                }else{
                    return p._id;
                }
            }catch(ex){
                console.log(ex)
            }
        }
    })
}