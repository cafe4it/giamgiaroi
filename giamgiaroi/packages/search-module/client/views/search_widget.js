Template.pricebuddy_search_widget.events({
    'click #btnGetProduct' : function(e,t){
        e.preventDefault();
        var pUrl = $('#txtProductUrl').val();
        if(!pUrl || _.isEmpty(pUrl)) return;
        var checkUrl = SeachWidget.helpers.isSupportProductUrl(pUrl);
        console.info(checkUrl)
    },
    'keyup #txtProductUrl' : function(e,t){
        
    }
});

