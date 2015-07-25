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
            chrome.tabs.sendMessage(tabs[0].id, {from: 'popup', subject: 'productInfo'}, setProductInfo);
        });
    });
})();

function setProductInfo(res){
    document.getElementById('ProductId').textContent = res.pid;
    document.getElementById('ProductTitle').textContent = res.title;
    document.getElementById('ProductPrice').textContent = res.price;
    document.getElementById('ProductImage').textContent = res.thumbnail;
}