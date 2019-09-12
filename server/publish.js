import '../common/collections.js';
import {MeteorInfoCollections} from '../common/collections.js';
import {MeteorInfoSchemas} from '../common/collections.js';

Meteor.publish('infoupdates', function(params) {
	var params = params || {};
	
	if (params.get)
		params.limit = 100;
	else
		params.limit = params.limit || 1;
	
	var list = {};
	var options = {sort: {scheduledAt: -1}, limit: params.limit};
	list = {draft: false, scheduledAt: {$lte: new Date}};

	if (Roles.userIsInRole(this.userId, ['admin', 'editor'], 'admGroup') || Roles.userIsInRole(this.userId, ['admin', 'editor']))
		list = {};
	
	var data = MeteorInfoCollections.Info.find(list, options);
	if (params.debug) 
		console.log('[publish] info', params, this.userId, list, data.count(), '\n');

	return data;
});
Meteor.publish('userupdates', function (){
	//this.unblock();	
	const data = MeteorInfoCollections.Userupdates.find({userId: this.userId});
	//console.log('[publish] userupdates', this.userId, data.count(), '\n');
	return data;
});

