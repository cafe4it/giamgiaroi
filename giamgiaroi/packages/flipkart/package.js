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
    api.use('http', ['server']);
    api.use('templating', ['client']);
    api.use('blaze', ['client']);
    api.use('tap:i18n', ['client']);
    api.use('arillo:flow-router-helpers', ['client']);
    api.use('underscore', ['client', 'server']);

    api.addFiles('private/flipkart.json', 'server', {isAsset: true});

    api.addFiles('server/000___.js', ['server']);
    api.addFiles('server/000__startup.js', ['server']);
    api.addFiles('server/000_helpers.js', ['server']);
    api.addFiles('server/001_methods.js', ['server']);

    api.addFiles('client/views/flipkart_home.html', ['client']);


});

Package.onTest(function (api) {
    api.use('tinytest');
    api.use('cafe4it:flipkart');
    api.addFiles('flipkart-tests.js');
});
