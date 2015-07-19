var pageUrl = window.location.href,
    amazonRegex = RegExp("http://www.amazon.com/([\\w-]+/)?(dp|gp/product|gp/offer-listing)/(\\w+/)?(\\w{10})"),
    m = pageUrl.match(amazonRegex);

if(m){
    var buttonUrl = chrome.extension.getURL('/src/html/buttons.html');
    $.get(buttonUrl,function(data){
        if(m[2] !== 'gp/offer-listing'){
            $('#price').after(data)
        }else{
            $('p.olpShippingInfo').after(data)
        }
    })
}
