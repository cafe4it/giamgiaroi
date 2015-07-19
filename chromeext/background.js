chrome.browserAction.onClicked.addListener(function(tab) {
    // No tabs or host permissions needed!
    console.log('Turning ' + tab.url + ' red!');
    alert(tab.url)
    chrome.tabs.executeScript({
        code: 'document.body.style.backgroundColor="red"'
    });
});

/*
chrome.browserAction.onClicked.addListener(function(){
    alert('12312312')
})*/
