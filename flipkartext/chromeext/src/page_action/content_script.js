/**
 * Created by nxcong on 25/07/2015.
 */
(function () {

    chrome.runtime.sendMessage({
        from: 'content',
        subject: 'showPageAction',
        product: getProductInfo()
    }, function (res) {
        $('<input>').attr({
            type: 'hidden',
            id: 'productDetailLink',
            value: res
        }).appendTo('body');
    });

    /* Listen for message from the popup */
    chrome.runtime.onMessage.addListener(function (msg, sender, response) {
        /* First, validate the message's structure */
        if ((msg.from === 'popup') && (msg.subject === 'productInfo')) {
            /* Collect the necessary data
             * (For your specific requirements `document.querySelectorAll(...)`
             *  should be equivalent to jquery's `$(...)`) */
            var product = getProductInfo(),
                productDetail = $('input#productDetailLink').val() || '';
            $.extend(true, product, {productDetailLink: productDetail})
            /* Directly respond to the sender (popup),
             * through the specified callback */
            var template = chrome.extension.getURL('/src/page_action/template.html');
            $.get(template,function(source){
                var compiled = dust.compile(source, 'template');
                dust.loadSource(compiled);
                dust.render('template',product,function(err,out){
                    response(out);
                })
            });
            return true;
        }
    });
})();


function getProductInfo() {
    var productId = getQueryVariable('pid'),
        title = $('.product-details h1.title').text(),
        subtitle = $('.product-details span.subtitle').text() || '',
        description = $('.description-text').text() || $('p.description').text() || '',
        title = (subtitle === '' || title.lastIndexOf(subtitle) !== -1) ? title : title + ' ' + subtitle,
        price = $('.shop-section span.selling-price.omniture-field').text(),
        maxPrice = $('.shop-section span.price').text() || price,
        thumb = $('.productImages div.imgWrapper img.productImage.current').attr('src') || '',
        pathName = window.location.pathname
    return {
        pid: productId,
        title: title,
        description: description,
        price: price,
        maxPrice: maxPrice,
        thumbnail: thumb,
        pathName: pathName
    }
}

function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0] == variable) {
            return pair[1];
        }
    }
    return (false);
}