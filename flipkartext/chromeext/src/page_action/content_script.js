/**
 * Created by nxcong on 25/07/2015.
 */
(function(){

    chrome.runtime.sendMessage({
        from:    'content',
        subject: 'showPageAction'
    });

    /* Listen for message from the popup */
    chrome.runtime.onMessage.addListener(function(msg, sender, response) {
        /* First, validate the message's structure */
        if ((msg.from === 'popup') && (msg.subject === 'ProductId')) {
            /* Collect the necessary data
             * (For your specific requirements `document.querySelectorAll(...)`
             *  should be equivalent to jquery's `$(...)`) */
            var productId = getQueryVariable('pid');
            /* Directly respond to the sender (popup),
             * through the specified callback */
            response({pid : productId});
        }
    });
})();

function getQueryVariable(variable)
{
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i=0;i<vars.length;i++) {
        var pair = vars[i].split("=");
        if(pair[0] == variable){return pair[1];}
    }
    return(false);
}