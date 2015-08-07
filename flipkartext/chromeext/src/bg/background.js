// if you checked "fancy-settings" in extensionizr.com, uncomment this lines

// var settings = new Store("settings", {
//     "sample_setting": "This is how you use Store.js to remember values"
// });


//example of using a message handler from the inject scripts

/*alert('12312')

 chrome.extension.onMessage.addListener(
 function(request, sender, sendResponse) {
 chrome.pageAction.show(sender.tab.id);
 sendResponse();
 });*/

var ddpConnection = undefined;
var productInfo = undefined;
var isShowPageAction = false;
chrome.runtime.onMessage.addListener(function (msg, sender, cb) {
    /* First, validate the message's structure */
    //chrome.pageAction.hide(sender.tab.id);
    if ((msg.from === 'content') && (msg.subject === 'showPageAction')) {
        isShowPageAction = true;
        if (ddpConnection === undefined && window.ddpConnection === undefined) {
            ddpConnection = new Asteroid("pricebuddy.xyz");
            window.ddpConnection = ddpConnection;
        }
        if (msg.product) {
            var rs = ddpConnection.call('Extension_initProduct', msg.product);
            rs.result.then(function (productDetailLink) {
                cb(productDetailLink);
                chrome.pageAction.show(sender.tab.id);
                console.log('-------show Page Action--------')
            });
            return true;
        }
    }
});

/*var i = 1;
var rule1 = {
    conditions: [
        new chrome.declarativeContent.PageStateMatcher({
            pageUrl: {hostEquals: 'www.flipkart.com', schemes: ['http'], queryContains: 'pid='}
        })
    ],
    actions: [new chrome.declarativeContent.ShowPageAction()]
};

chrome.runtime.onInstalled.addListener(function (details) {
    chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
        chrome.declarativeContent.onPageChanged.addRules([rule1]);
    });
});*/



