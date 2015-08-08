if(!SearchWidget) SeachWidget = {};

var helpers = {};

helpers.parseUrl = function(url){
    return URI.parse(url);
}

helpers.isSupportProductUrl = function(url){
    var info = URI.parse(url);
    var result = {
        isSupport : false
    }
    switch(info.hostname){
        case 'www.flipkart.com':
        case 'flipkart.com':
            var pid = URI.parseQuery(info.query)['pid']
            if(info.path.indexOf('/p/') !== -1 && pid){
                result = {
                    isSupport : true,
                    hostname : info.hostname,
                    path : info.path,
                    pid : pid
                }
            }
            break;
        default:
            result = {
                isSupport : false
            }
            break;
    }
    return result;
}

helpers.getQueryVariable = function (query ,variable) {
    var info = URI.parse(url),
        result = URI.parseQuery(info.query);
    return result[variable];
}

SearchWidget = _.extend(SeachWidget, {helpers : helpers});


