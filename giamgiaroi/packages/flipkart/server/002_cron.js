/**
 * Created by nxcong on 03/08/2015.
 */
if(Meteor.isServer){
    SyncedCron.add({
        name: 'Deals Of Day',
        schedule: function(parser) {
            // parser is a later.parse object
            return parser.text('every 12 hours');
        },
        job: function() {
            FlipkArt_Offers.remove({type : 'DEALSOFDAY'});
            var rs = Meteor.call('FlipkArt_getDotd'),
                items = rs._result.data;
            _.each(items, function(i){
                i = _.extend(i, {updatedAt : new Date, type : 'DEALSOFDAY'})
                FlipkArt_Offers.insert(i)
            });
            return 'Total items : ' + _.size(items);
        }
    });

    SyncedCron.add({
        name: 'Top Offers',
        schedule: function(parser) {
            // parser is a later.parse object
            return parser.text('every 22 hours');
        },
        job: function() {
            FlipkArt_Offers.remove({type : 'TOPOFFERS'});
            var rs = Meteor.call('FlipkArt_getTopOffers'),
                items = rs._result.data;
            _.each(items, function(i){
                i = _.extend(i, {updatedAt : new Date, type : 'TOPOFFERS'})
                FlipkArt_Offers.insert(i)
            });
            return 'Total items : ' + _.size(items);
        }
    });

    SyncedCron.start();
}