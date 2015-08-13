if(Meteor.isServer){
    Meteor.methods({
        'Lazada_getProductByUrl' : function(url){
            try{
                var rs = Async.runSync(function(done){
                    /*var x = new Xray();
                    x(url, {
                        title : 'title',
                        price : '#product_price'
                    })(function(err, obj){
                        if(err) throw new Meteor.Error(err);
                        console.log(obj);
                        done(null, obj);
                    })*/
                   /* Scrapy.scrape(url, {
                        title : {
                            selector : 'meta[property="og:title"]',
                            get : 'content'
                        }
                    },function(err, obj){
                        if(err) throw new Meteor.Error(err);
                        console.log(obj);
                        done(null, obj);
                    })*/
                    osmosis
                        .get(url)
                        .set({
                            productId : '#selectedSku@value',
                            title : 'title',
                            thumbnail : '//*[@id="productImageBox"]/span/@data-image',
                            price : '#product_price',
                            price_display : '#special_price_box',
                            currency : '#product-price-box > div.hidden > span > meta:nth-child(3)@content'
                        })
                        .data(function(obj){
                            pbj = _.extend(obj, {slug : s.slugify(obj.title)});
                            done(null, obj);
                        })
                })
                return rs.result;
            }catch(Ex){
                console.error(Ex);
            }
        }
    })
}