import moment from 'moment';
import $ from 'jquery';
import 'jquery-ui-bundle';

import { Random } from 'meteor/random';
import { ReactiveVar } from 'meteor/reactive-var';
import {MediumEditor} from 'meteor/mediumeditor:mediumeditor';

import {MeteorInfoCollections} from '../common/collections.js';
window.MeteorInfoCollections = MeteorInfoCollections;
import {MeteorInfoSchemas} from '../common/collections.js';
import './infoupdates.html';

const activated = new ReactiveVar();
const editorUrl = '//cdnjs.cloudflare.com/ajax/libs/summernote/0.8.11/summernote-bs4.js';

let editor;
const blogEditor = function(){
/* 	if (editor) {
		editor.setup(); 
		return console.warn('[blog editor] exists:', editor);
	} */
	
	editor = new MediumEditor('.mededitable', {
		placeholder: {
			text: 'Type your text',
			hideOnClick: true
		},
		autoLink: false,
		diffLeft: 10,
		diffTop: 10,
		firstButtonClass: 'medium-editor-button-first',
		lastButtonClass: 'medium-editor-button-last',
		relativeContainer: null,
		standardizeSelectionStart: false,
		//static: true,
		//align: 'center',
		toolbar: {
			buttons: [
				'bold',
				'italic',
				{
					name: 'h1',
					action: 'append-h2',
					aria: 'header type 1',
					tagNames: ['h2'],
					contentDefault: '<b>H1</b>',
					classList: ['custom-class-h1'],
					attrs: {
						'data-custom-attr': 'attr-value-h1'
					}
				},
				{
					name: 'h2',
					action: 'append-h3',
					aria: 'header type 2',
					tagNames: ['h3'],
					contentDefault: '<b>H2</b>',
					classList: ['custom-class-h2'],
					attrs: {
						'data-custom-attr': 'attr-value-h2'
					}
				},
				
				'justifyLeft',
				'justifyCenter',
				'justifyRight',
				'removeFormat',
				'quote',
				'anchor',
				'image'
			]
		},
	});	
	console.log('[blog editor]', editor);
	
/*   extensions: {
    insert: new MediumInsert()
  } */
	
	//windot.meteorBlogEditor = editor;
/* 	Meteor.setTimeout(()=>{
		$('.mededitable').mediumInsert({
			editor: editor
		});	
	},500) */

	return editor;
	
}

//import {MediumEditor} from 'medium-editor';

const typeBtn = [
	{ id: 'content', color: 'info', title:'Content', val:'blogContent', },
	{ id: 'aggregated', color: 'info', title:'Aggregated', val:'blogAggregated'},
	{ id: 'edit', color: 'info', title:'New', val:'blogEdit'},
	{ id: 'queue', color: 'info', title:'Queue', val:'blogQueue'},
	{ id: 'status', color: 'info', title:'Status', val:'blogStatus'},
	{ id: 'settings', color: 'info', title:'Settings', val:'blogSettings'},
];

Template.infoUpdates.onCreated(function () {
	window.prerenderReady = false;
	let t = Template.instance();
	t.selector = new ReactiveVar();
	t.editselector = new ReactiveVar();
	t.selectTag = new ReactiveVar();
	t.mediumeditor = new ReactiveVar();
	t.ready = new ReactiveVar();
	t.newRecord = new ReactiveVar();
	t.editRecord = new ReactiveVar();
	t.autorun(()=>{
		let params = {caller: 'infoupdates.onCreated', get: FlowRouter.getQueryParam('get'), debug: Session.get('debug')};
		let sub = PostSubs.subscribe('infoupdates', params);	
		t.ready.set(sub.ready());
	})

	if (Session.get('debug')) console.log('[blogIt.onCreated] data', t.data);

});
Template.infoUpdates.onRendered(function () {
	let t = Template.instance();
});
Template.infoUpdates.helpers({
	activated(){
		if (activated.get())
			return '';
	},
	ready(){
		let t = Template.instance();
		return t.ready.get();
	},
	infos(){
		return MeteorInfoCollections.Info.find();
	},
	newRecord(){
		let t = Template.instance();
		return t.newRecord.get();
	},
	editRecord(){
		let t = Template.instance();
		//console.log('editRecord', t.editRecord.get());
		return t.editRecord.get();
	},
	collection() {
    return MeteorInfoCollections.Info;
  },
  schema() {
    return MeteorInfoSchemas.Info;
  },
});
Template.infoUpdates.events({
	'click .newInfoRecord'(e, t) {
		t.newRecord.set(true);
		t.editRecord.set();
		e.preventDefault();
		e.stopPropagation();
		let self = this;
		$.ajax({
			url: editorUrl,
			dataType: 'script',
			cache: true,
			success:function(script, status, jqXHR){
				console.log('[infoupdates] summernote loaded', status, jqXHR);
				Meteor.setTimeout(()=>{
					$('textarea').summernote();
				},500);
				console.log('clicked newRecord', self);
				t.editRecord.set();	
				t.newRecord.set(true);	
			},
			error:function(err){
				console.warn('[infoupdates] import err', e, self);
			}
		})
		.done(()=>{
			
		})
	},
	'click .editInfoRecord'(e, t) {
		e.preventDefault();
		e.stopPropagation();
		let self = this;
		$.ajax({
			url: editorUrl,
			dataType: 'script',
			cache: true,
			success:function(script, status, jqXHR){
				console.log('[infoupdates] summernote loaded', status, jqXHR);
				Meteor.setTimeout(()=>{
					$('textarea').summernote();
				},500);
				console.log('clicked editRecord', self);
				t.editRecord.set(self._id);	
				t.newRecord.set();	
			},
			error:function(err){
				console.warn('[infoupdates] import err', e, self);
			}
		})
		.done(()=>{
	
		})
	},
/* 	'submit'(e,t){
		Meteor.call('user.infoupdate');
		t.newRecord.set();
		t.editRecord.set();
	}, */
	'click .cancel'(e, t) {
		t.editRecord.set();	
		t.newRecord.set();	
	},
	'click .delInfoRecord'(e, t) {
		e.preventDefault();
		e.stopPropagation();
		MeteorInfoCollections.Info.remove({_id: this._id});
	}
});

Template.infoPost.onCreated(function () {
	window.prerenderReady = false;
	let t = Template.instance();	
});
Template.infoPost.onRendered(function () {

});
Template.infoPost.helpers({

});
Template.infoPost.events({
	'click .ack'(e,t){
		
	},
});

Template.infoNav.onCreated(function () {
	window.prerenderReady = false;
	const t = Template.instance();	
	const params = {caller: 'infoNav.onCreated', debug: Session.get('debug')};
	Meteor.subscribe('infoupdates', params);			
});
Template.infoNav.onRendered(function () {

});
Template.infoNav.helpers({
	activatedClass(){
		const userupdates = MeteorInfoCollections.Userupdates.find({_id: Meteor.userId()});
		if (userupdates && userupdates.infoId){
			let update = MeteorInfoCollections.Info.findOne({_id: userupdates.infoId, draft: false, scheduledAt: {$lte: new Date()}});
			if (update) {
				let msg = {title: update.type, body: update.text, click_action: "https://www.hundredgraphs.com/about?get=infoUpdates"};
				//Meteor.call('firebase.msg',{msg: msg});
				return 'infinite text-info';
			}
		}	
		return 'text-secondary';
	},
	count(){
		//if (Meteor.user() && Meteor.user().adds && Meteor.user().adds.info)
		return MeteorInfoCollections.Info.find({draft: false, scheduledAt: {$lte: new Date()}}).count();
	},
	activated(){
		return activated.get();
	}
});
Template.infoNav.events({
	'click .activateIt'(e,t){
		activated.set(!activated.get())
		if (window.analytics)
			analytics.track('info_visited', {
				referrer: document.referrer,
				category: "engagement",
				label: Meteor.user().username
			});	
	},
});

Template.infoPop.events({
	'click .ack'(e,t){
		activated.set();
		Meteor.call('user.infoack');
	},
});


