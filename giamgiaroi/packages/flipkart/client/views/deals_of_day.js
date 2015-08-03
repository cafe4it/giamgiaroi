Template.flipkart_deals_of_day.onCreated(function(){
    var self = this;

    self.autorun(function(){
        var subscription = self.subscribe('FlipkArt_Offers','DEALSOFDAY');
        if(subscription.ready()){
            console.log('Deals Of Day items ready...')
        }
    });

    self.items = function(){
        return FlipkArt_Offers.find({type : 'DEALSOFDAY'});
    }
})

Template.flipkart_deals_of_day.helpers({
    items : function(){
        return Template.instance().items();
    }
})