import {MeteorInfoCollections} from '../common/collections.js';
import {MeteorInfoSchemas} from '../common/collections.js';
Meteor.startup(()=>{
	if (Meteor.userId())
		Meteor.subscribe('userupdates');
});