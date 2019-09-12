import {MeteorInfoCollections} from '../common/collections.js';
import {MeteorInfoSchemas} from '../common/collections.js';
import { Random } from 'meteor/random';

Meteor.methods({	
	'user.infoinsert'(params){
		if (!Roles.userIsInRole(this.userId, ['admin'], 'admGroup')) return;
		//this.unblock;
		const inserted = MeteorInfoCollections.Info.insert({userId: this.userId, type: params.type, text: params.text, draft: params.draft, scheduledAt: params.scheduledAt, createdAt: new Date()});
		console.log('[user.infoinsert]', params);
		MeteorInfoCollections.Userupdates.upsert({userId: this.userId},{$set: {userId: this.userId, infoId: inserted, pushed: false}});
	},		
/* 	'user.infoupdate'(params){
		//this.unblock;
		Meteor.users.update({},{$set: {'adds.info': true}},{multi: true});
		console.log('[user.update]', params);
	},	 */	
	'user.infoack'(params){
		//this.unblock;
		MeteorInfoCollections.Userupdates.update({userId: this.userId},{$set: {infoId: false}});
		console.log('[user.ack]', params);
	},		
	
});