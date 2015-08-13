Package.describe({
    name: 'pricebuddy:osmosis',
    version: '0.0.1',
    // Brief, one-line summary of the package.
    summary: '',
    // URL to the Git repository containing the source code for this package.
    git: '',
    // By default, Meteor will default to using README.md for documentation.
    // To avoid submitting documentation, set this field to null.
    documentation: 'README.md'
});

Npm.depends({'osmosis' : '0.0.8'});

Package.onUse(function (api) {
    api.versionsFrom('1.1.0.3');
    api.addFiles('osmosis.js', ['server']);

    api.export('osmosis', ['server']);
});
