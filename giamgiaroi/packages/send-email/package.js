Package.describe({
  name: 'cafe4it:send-email',
  version: '0.0.1',
  // Brief, one-line summary of the package.
  summary: '',
  // URL to the Git repository containing the source code for this package.
  git: '',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.1.0.3');
  api.use('accounts-base',['server']);
  api.use('accounts-password',['server']);
  api.use('wylio:mandrill',['server']);

  api.addFiles('private/smtp.json', ['server'], {isAsset: true});

  api.addFiles('server/000__.js', ['server']);
});