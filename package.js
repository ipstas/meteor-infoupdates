Package.describe({
  name: 'meteor-infoupdates',
  version: '0.0.4',
  // Brief, one-line summary of the package.
  summary: 'Keep users updated about new developments',
  // URL to the Git repository containing the source code for this package.
  git: 'https://github.com/ipstas/meteor-infoupdates',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom(['1.6', '1.8']);
  api.use('ecmascript');
  api.mainModule('meteor-infoupdates.js');
  api.mainModule('server.js','server');//,{lazy: true});
  api.mainModule('client.js','client');//,{lazy: true});	
	//api.mainModule('common.js',['client','server']);//,{lazy: true});
	
	Npm.depends({
		//'bootstrap-datepicker': '1.8.0',
		//'cloudinary': '1.13.2',
		//'medium-editor': '5.23.3',
		//'jquery-ui-bundle': '1.12.1-migrate',
		'cron': '1.8.2',
		//'medium-editor-insert-plugin': '2.5.1'
		//'eonasdan-bootstrap-datetimepicker': '4.17.47'
	});
	
	api.use([
		'ecmascript',
		'check',
		'mongo',
		'templating@1.3.0',
		'blaze@2.3.0',
		'underscore',
		//'reactive-dict',
		'aldeed:autoform@6.3.0',
		//'aldeed:autoform-bs-datetimepicker',
		//'aldeed:autoform-bs-datepicker',`
		//'mediumeditor:mediumeditor@5.2.0',
		//'tomwasd:flow-router-seo',
		//'tomwasd:flow-router-seo'
	]);
	
	api.addFiles([
		'client/info.css',
	], 'client');
	
	//api.export('MeteorBlogCollections', 'server');
});

Package.onTest(function(api) {
  api.use('ecmascript');
  api.use('tinytest');
  //api.use('meteor-infoupdates');
  api.mainModule('meteor-infoupdates-tests.js');
});
