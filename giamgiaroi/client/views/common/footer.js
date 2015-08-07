/**
 * Created by nxcong on 07/08/2015.
 */
Template.footer.helpers({
    serverUrl : ReactivePromise(function(){
        return Meteor.promise('RootUrl');
    })
})