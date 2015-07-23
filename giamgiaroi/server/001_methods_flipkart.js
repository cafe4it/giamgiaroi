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
        }
    })
}