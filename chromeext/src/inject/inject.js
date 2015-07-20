var pageUrl = window.location.href,
    amazonRegex = RegExp("http://www.amazon.(com|co.uk|es|co.jp|it|in|de|fr|cn|ca|com.br)/([\\w-]+/)?(dp|gp/product|gp/offer-listing)/(\\w+/)?(\\w{10})"),
    m = pageUrl.match(amazonRegex);
initAmazonButtons(m);
$(document).ready(function () {
    setInterval(function () {
        if (m && $('#giamgiaroi').length !== 1) {
            initAmazonButtons(m);
        }
    }, 2000);

    $('#sltCondition').change(function () {
        $('#productCondition').val($('#sltCondition option:selected').val());
    })
})

function initAmazonButtons(m) {
    if (m) {
        var buttonUrl = chrome.extension.getURL('/src/html/buttons.html');
        $.get(buttonUrl, function (data) {
            var model = {
                productTitle: $('span#productTitle').text() || $('span#btAsinTitle').text() || undefined,
                productPrice: productAmazonPrice(),
                productASIN: $('input#ASIN').val() || $("input[name='ASIN.0']").val() || undefined,
                productUrl: m[0].replace(m[5], this.productASIN) || undefined,
                productImage: productAmazonImage()
            }
            if (!model.productASIN || !model.productPrice) return;
            if (model.productPrice.trim() == 'FREE') return;
            if (m[3] != 'gp/offer-listing') {
                var compiled = dust.compile(data, 'buttons');
                dust.loadSource(compiled);
                model.productPrice = parseAmazonPrice(m[1],model.productPrice);
                console.log(model.productPrice);
                dust.render('buttons', model, function (err, out) {
                    var places = ['#price', '#priceBlock', '#combinedPriceBlock', '#price_feature_div'];
                    var place = _.find(places, function (p) {
                        return $(p).length === 1;
                    });
                    $(place).after(out)
                });
            } else {
                $('p.olpShippingInfo').after(data)
            }
        })
    }
}

function parseAmazonPrice(locale,priceStr) {
    if(locale && priceStr){
        var currency = [
            {locale : 'com', sign : '$'},
            {locale : 'co.uk', sign : '£'},
            {locale : 'es', sign : 'EUR '},
            {locale : 'co.jp', sign : '￥ '},
            {locale : 'cn', sign : '￥ '},
            {locale : 'it', sign : 'EUR '},
            {locale : 'in', sign : ''},
            {locale : 'de', sign : 'EUR '},
            {locale : 'fr', sign : 'EUR '},
            {locale : 'ca', sign : 'CDN$ '},
            {locale : 'com.br', sign : 'R$ '},
        ]
        var f = _.find(currency, function(c){
            return c.locale == locale
        });
        return {
            sign : f.sign.trim(),
            price : priceStr.replace(f.sign,'').trim()
        }
    }else{
        var signs = ['$', 'EUR ', '￥ ', '£', '￥', 'CDN$ '];
        var sign = _.find(signs, function (s) {
            return priceStr.indexOf(s) !== -1;
        });
    }
}

function productAmazonImage() {
    var selectors = ['div.imgTagWrapper > img', 'img#main-image', 'img#imgBlkFront', '#combinedPriceBlock span.a-size-medium.a-color-price'];
    var selector = _.find(selectors, function (s) {
        return $(s).length === 1;
    });
    return $(selector).attr('src') || '';
}

function productAmazonPrice() {
    var selectors = ['span#priceblock_ourprice', 'span#priceblock_saleprice', 'b.priceLarge','span#priceblock_dealprice'];
    var selector = _.find(selectors, function (s) {
        return $(s).length === 1;
    });

    return $(selector).text().trim() || undefined;
}