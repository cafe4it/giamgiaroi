Template.flipkart_top_offers.onCreated(function(){
    var self = this;
    self.limit = new ReactiveVar(8);
    self.loaded = new ReactiveVar(0);

    self.autorun(function(c){
        var limit = self.limit.get();
        console.log("Asking for "+limit+" Top Offer items…")
        var subscription = self.subscribe('FlipkArt_Offers_hasLimit','TOPOFFERS',limit);
        if(subscription.ready()){
            self.loaded.set(limit);
            console.log("> Received "+limit+" Top Offer items… \n\n");
        }else{
            console.log("> Subscription is not ready yet. \n\n");
        }

    });

    self.items = function(){
        return FlipkArt_Offers.find({type : 'TOPOFFERS'},{limit : self.loaded.get()})
    }
});

Template.flipkart_top_offers.helpers({
    items : function(){
        return Template.instance().items();
    },
    hasMoreItems : function(){
        return Template.instance().items().count() >= Template.instance().limit.get();
    }
})

Template.flipkart_top_offers.events({
    'click #btnLoadMore' : function(e,t){
        e.preventDefault();

        var limit = t.limit.get();
        limit += 8;
        t.limit.set(limit);
    }
})