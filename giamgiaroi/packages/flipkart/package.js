Package.describe({
    name: 'cafe4it:flipkart',
    version: '0.0.1',
    // Brief, one-line summary of the package.
    summary: 'Price Tracker for Flipkart',
    // URL to the Git repository containing the source code for this package.
    git: '',
    // By default, Meteor will default to using README.md for documentation.
    // To avoid submitting documentation, set this field to null.
    documentation: 'README.md'
});

Package.onUse(function (api) {
    api.versionsFrom('1.1.0.2');

    api.use('meteorhacks:async', ['server']);
    api.use('ongoworks:security', ['server']);
    api.use('http', ['server']);
    api.use('templating', ['client']);
    api.use('blaze', ['client']);
    api.use('tap:i18n', ['client']);
    api.use('meteorhacks:flow-router', ['client', 'server']);
    api.use('meteorhacks:flow-layout', ['client']);
    api.use('deanius:promise', ['client','server']);
    api.use('arillo:flow-router-helpers', ['client']);
    api.use('dburles:collection-helpers', ['server']);
    api.use('underscore', ['client', 'server']);
    api.use('underscorestring:underscore.string', ['client', 'server']);

    api.addFiles('private/flipkart.json', 'server', {isAsset: true});

    api.addFiles('server/000___.js', ['server']);
    api.addFiles('server/000__startup.js', ['server']);
    api.addFiles('server/000_helpers.js', ['server']);
    api.addFiles('server/000_publication.js', ['server']);
    api.addFiles('lib/routes.js', ['server','client']);
    api.addFiles('server/001_methods.js', ['server']);
    api.addFiles('lib/schemas.js', ['server','client']);
    api.addFiles('server/000_security.js', ['server']);

    api.addFiles('client/views/flipkart_home.html', ['client']);
    api.addFiles('client/views/flipkart_home.js', ['client']);
    api.addFiles('client/helper/helpers.js', ['client']);
    api.addFiles('client/views/flipkart_product_detail.html', ['client']);
    api.addFiles('client/views/flipkart_product_detail.js', ['client']);


});

Package.onTest(function (api) {
    api.use('tinytest');
    api.use('cafe4it:flipkart');
    api.addFiles('flipkart-tests.js');
});
