//import 'bootstrap-datepicker';
import SimpleSchema from 'simpl-schema';
SimpleSchema.extendOptions(['autoform', 'index', 'unique', 'denyInsert', 'denyUpdate']);

import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
//import 'meteor/aldeed:autoform-bs-datetimepicker';
//import 'eonasdan-bootstrap-datetimepicker';

export const MeteorInfoCollections = {};
export const MeteorInfoSchemas = {};

MeteorInfoCollections.Info = new Mongo.Collection('pkg_meteor_infoupdates');
MeteorInfoSchemas.Info = new SimpleSchema({
	'type': {
		type: String,
		allowedValues: ['info','bug','other'],
		autoform: {
			type: 'select', 
		}
	},  
	'text': {
		type: String,
		autoform: {
			afFieldInput: {
				type: "textarea",
				rows: 4
			}
		}
	},	
	'draft': {
		type: Boolean,
		optional: true,
	},	
	'createdAt': {
		type: Date,
		label: 'Date',
		autoValue: function () {
			if (this.isInsert) 
				return new Date();
		},
		autoform: {
			omit: true,
		}
	},  
	'scheduledAt': {
		type: Date,
		label: 'Date',
		index: true,
	},
	"userId": {
		type: String,
		optional: true,
		autoform: {
			omit: true
		},
		autoValue: function () {
			if (Meteor.isClient && this.isInsert) 
				return Meteor.userId();
		},
	},
});
MeteorInfoCollections.Info.attachSchema(MeteorInfoSchemas.Info);
MeteorInfoCollections.Info.allow({
  insert: function (userId, doc) {
		if (Roles.userIsInRole(userId, ['admin', 'editor'], 'admGroup') || Roles.userIsInRole(userId, ['admin', 'editor'])) 
			return true;
  },
  update: function (userId, doc) {
		if (Roles.userIsInRole(userId, ['admin', 'editor'], 'admGroup') || Roles.userIsInRole(userId, ['admin', 'editor'])) 
			return true;
  },
  remove: function (userId, doc) {
		if (Roles.userIsInRole(userId, ['admin', 'editor'], 'admGroup') || Roles.userIsInRole(userId, ['admin', 'editor'])) 
			return true;
  }
});

MeteorInfoCollections.Userupdates = new Mongo.Collection('pkg_meteor_userupdates');
MeteorInfoSchemas.Userupdates = new SimpleSchema({
	userId: {
		type: String,
		index: true,
	},  
	infoId: {
		type: String,
	},	
	pushed: {
		type: Boolean,
		optional: true,
		index: true
	},	
});
MeteorInfoCollections.Userupdates.attachSchema(MeteorInfoSchemas.Userupdates);
MeteorInfoCollections.Userupdates.allow({
  insert: function (userId, doc) {
		if (Roles.userIsInRole(userId, ['admin', 'editor'], 'admGroup') || Roles.userIsInRole(userId, ['admin', 'editor'])) 
			return true;
  },
  update: function (userId, doc) {
		if (userId == doc.userId) 
			return true;
  },
  remove: function (userId, doc) {
		if (userId == doc.userId) 
			return true;
  }
});

