Package.describe({
  name: 'meteor-infoupdates',
  version: '0.0.1',
  // Brief, one-line summary of the package.
  summary: 'Keep users updated about new developments',
  // URL to the Git repository containing the source code for this package.
  git: 'https://github.com/ipstas/meteor-infoupdates',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom(['1.6.0', '1.8.0']);
  api.use('ecmascript');
  api.mainModule('meteor-infoupdates.js');
});

Package.onTest(function(api) {
  api.use('ecmascript');
  api.use('tinytest');
  api.use('meteor-infoupdates');
  api.mainModule('meteor-infoupdates-tests.js');
});
