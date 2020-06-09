Package.describe({
	name: 'ipstas:meteor-infoupdates',
	version: '0.0.5',
	summary: 'Keep users updated about new developments',
	git: 'https://github.com/ipstas/meteor-infoupdates',
	documentation: 'README.md'
});

Package.onUse(function(api) {
	api.versionsFrom(['1.6', '1.8']);

	api.mainModule('meteor-infoupdates.js');
	api.mainModule('server.js','server');//,{lazy: true});
	api.mainModule('client.js','client');//,{lazy: true});
	
	Npm.depends({
		//'bootstrap-datepicker': '1.8.0',
		//'cloudinary': '1.13.2',
		//'medium-editor': '5.23.3',
		'jquery-ui-bundle': '1.12.1-migrate',	
		//'medium-editor-insert-plugin': '2.5.1'
		//'eonasdan-bootstrap-datetimepicker': '4.17.47',
		//'cron': '1.8.2'
	});
	
	api.use([
		'ecmascript@0.1.0',
		'check@1.0.0',
		'mongo@1.4.0',
		'templating@1.0.0',
		'blaze@2.0.0',
		'mediumeditor:mediumeditor@5.0.0',
		'underscore@1.0.0',
		'aldeed:autoform@5.0.0'
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
