Template.flipkart_deals_of_day.helpers({
    products : PromiseHelper(function(){
        var promise = Meteor.call('FlipkArt_getDotd');
        return promise.then(function(result){
            return result.data;
        })
    })
})