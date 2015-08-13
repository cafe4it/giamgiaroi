Package.describe({
    name: 'pricebuddy:lazada',
    version: '0.0.1',
    // Brief, one-line summary of the package.
    summary: '',
    // URL to the Git repository containing the source code for this package.
    git: '',
    // By default, Meteor will default to using README.md for documentation.
    // To avoid submitting documentation, set this field to null.
    documentation: 'README.md'
});

Package.onUse(function (api) {
    api.versionsFrom('1.1.0.3');
    api.use('meteorhacks:async', ['server']);
    api.use('ongoworks:security', ['server']);
    api.use('percolate:synced-cron', ['server']);
    api.use('cafe4it:xray', ['server']);
    api.use('pricebuddy:node-scrapy', ['server']);
    api.use('pricebuddy:osmosis', ['server']);
    api.use('http', ['server']);
    api.use('templating', ['client']);
    api.use('sacha:spin', ['client']);
    api.use('blaze', ['client']);
    api.use('tap:i18n', ['client']);
    api.use('kadira:flow-router', ['client', 'server']);
    api.use('kadira:blaze-layout', ['client']);
    api.use('reactive-var', ['client']);
    api.use('deanius:promise', ['client']);
    api.use('arillo:flow-router-helpers', ['client']);
    api.use('dburles:collection-helpers', ['server']);
    api.use('underscore', ['client', 'server']);
    api.use('underscorestring:underscore.string', ['client', 'server']);
    api.use('gadicohen:headers', ['client', 'server']);

    api.addFiles('lib/000_routes.js',['client','server']);
    api.addFiles('server/001_methods.js',['server']);
    api.addFiles('client/views/lazada_home.html',['client']);
    api.addFiles('client/views/lazada_home.js',['client']);

});