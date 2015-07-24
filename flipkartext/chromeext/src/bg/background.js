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

/*
var i = 1;
var rule1 = {
    conditions: [
        new chrome.declarativeContent.PageStateMatcher({
            pageUrl: {hostEquals: 'www.flipkart.com', schemes: ['http'], queryContains :'pid='}
        })
    ],
    actions: [new chrome.declarativeContent.ShowPageAction()]
};

chrome.runtime.onInstalled.addListener(function (details) {
    chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
        chrome.declarativeContent.onPageChanged.addRules([rule1]);
    });
});*/

chrome.runtime.onMessage.addListener(function(msg, sender) {
    /* First, validate the message's structure */
    if ((msg.from === 'content') && (msg.subject === 'showPageAction')) {
        /* Enable the page-action for the requesting tab */
        chrome.pageAction.show(sender.tab.id);
    }
});
