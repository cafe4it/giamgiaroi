Top_Offers = new Meteor.Collection(null);

Template.flipkart_top_offers.onCreated(function(){
    var self = this;
    self.limit = new ReactiveVar(8);
    self.loaded = new ReactiveVar(0);

    self.autorun(function(c){
/*        var items = PromiseHelper(function(){
            var promise = Meteor.call('FlipkArt_getTopOffers');
            return promise.then(function(result){
                return result.data;
            })
        });

        _.each(items, function(i){
            Top_Offers.insert(i);
        });
        c.stop();*/
        Meteor.call('FlipkArt_getTopOffers',function(e,r){
            var items = r.data;
            _.each(items, function(i){
                Top_Offers.insert(i);
                console.log(Top_Offers.find().count())
            });
            c.stop();
        })
    });

    self.items = function(){
        return Top_Offers.find({},{limit : self.limit.get()});
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