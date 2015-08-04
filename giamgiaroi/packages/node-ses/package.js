Package.describe({
  name: 'cafe4it:node-ses',
  version: '0.0.2',
  // Brief, one-line summary of the package.
  summary: 'An Amazon SES api for nodejs with proper error handling.',
  // URL to the Git repository containing the source code for this package.
  git: 'https://github.com/aheckmann/node-ses.git',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Npm.depends({'node-ses' : 'v1.0.2'});

Package.onUse(function(api) {
  api.versionsFrom('1.1.0.3');
  api.addFiles('node-ses.js',['server']);
  api.export('Amazon_Ses','server');
});
/*
Package.onTest(function(api) {
  api.use('tinytest');
  api.use('cafe4it:node-ses');
  api.addFiles('node-ses-tests.js');
});*/
