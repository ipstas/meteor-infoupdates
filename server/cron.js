import { CronJob } from 'cron';
import {MeteorInfoCollections} from '../common/collections.js';

const runJob = function(){
	//console.log('[infoupdates cron] running:', this);	
	//console.log('[infoupdates cron] not running:', update);	
	const userupdates = MeteorInfoCollections.Userupdates.find({pushed: false}).fetch();
	if (!userupdates.length) return ;
	
	//if (!update) return ;
	for (let userupdate of userupdates){
		if (userupdate.infoId){
			let update = MeteorInfoCollections.Info.findOne({_id: userupdate.infoId, scheduledAt: {$lte: new Date()}}, {sort: {scheduledAt: -1}});
			let msg = {title: update.type, body: update.text, click_action: "https://www.hundredgraphs.com/about?get=infoUpdates"};
			Meteor.call('firebase.msg',{userId: userupdate.userId, msg: msg, caller:'cron'});
			MeteorInfoCollections.Userupdates.update({_id: userupdate._id}, {$set: {pushed: true}});
		}	
	}
	console.log('[infoupdates cron] update:', update, userupdates.length, userupdates);
}

const cronJob = new CronJob({
	//cronTime: '00 45 9 * * *',
	cronTime: '*/10 * * * * *',
	onTick: async function() { 
		await runJob();
	},
	start: false,
	timeZone: 'America/Chicago'
	/*
	 * Runs every day
	 * at 10:45:00 AM. 
	 * 
	 */		
});

Meteor.startup(function(){
	let job = cronJob.start();
	console.log('[cron] startup job:', job);
});

