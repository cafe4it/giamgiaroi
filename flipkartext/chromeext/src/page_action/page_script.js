/**
 * Created by nxcong on 24/07/2015.
 */
(function () {
    window.addEventListener('DOMContentLoaded', function() {
        /* ...query for the active tab... */
        chrome.tabs.query({
            active: true,
            currentWindow: true
        }, function(tabs) {
            /* ...and send a request for the DOM info... */
            chrome.tabs.sendMessage(
                tabs[0].id,
                {from: 'popup', subject: 'ProductId'},
                /* ...also specifying a callback to be called
                 *    from the receiving end (content script) */
                function(response){
                    document.getElementById('ProductId').textContent = response.pid;
                });
        });
    });
})();