var editorArray = [];
var MAX_TABS = 3;
var tabCount = 1;
var tabIndex = 2;

var editor = ace.edit("editor");
var activeInstance = editor;
editorArray.push({
			id:'editor',
			instance:editor
		});
// editor.setTheme("ace/theme/monokai");
editor.getSession().setMode("ace/mode/javascript");

editor.getSession().setUseWrapMode(true);
editor.setShowPrintMargin(false);
// editor.renderer.setShowGutter(false);
// editor.setFontSize(14);


$(function(){
 
/*	document.querySelector('.monokai').addEventListener('click',function (e){
		editor.setTheme("ace/theme/monokai");
	});

	document.querySelector('.none').addEventListener('click',function (e){
		editor.setTheme("");
	});
*/

	/*document.querySelector('.size-plus').addEventListener('click',function (e){
		editor.setFontSize(editor.getFontSize()+1);
	});

	document.querySelector('.size-minus').addEventListener('click',function (e){
		editor.setFontSize(editor.getFontSize()-1);
	});*/

	document.querySelector('.btn-settings').addEventListener('click',function (e){
		editor.execCommand("showSettingsMenu");
	});
	document.querySelector('.add-button').addEventListener('click',function (e){
		if(tabCount>=MAX_TABS){
			console.log('Max Tab allowed is: '+ MAX_TABS);
			return;
		}
		var getUniqueId = getUniqueIdentifier();
		var tab = '<div class="tab" data-id="'+getUniqueId+'">Tab '+tabIndex+'</div>';
		var tabContent  = '<div id="'+getUniqueId+'" class="ace-content"></div>';
		$('.tabs').append(tab);
		$('.btn-settings').before(tabContent);
		tabIndex++;
		var instance = ace.edit(getUniqueId);
		/*for(var i = 0, len = editorArray.length;i<len;i++){
			editorArray[i].active = false;
		}*/
		editorArray.push({
			id:getUniqueId,
			instance:instance,
			active:true
		});

		$('.tabs .tab').removeClass('active');
		$('.tabs').find('[data-id="'+getUniqueId+'"]').addClass('active');

		$('.ace-content').removeClass('ace-content-active');
		$('#'+getUniqueId).addClass('ace-content-active');

		activeInstance = instance;
		tabCount++;

	});

	$('body').on('click','.tab',function(){
		var id = $(this).data('id');
		var instance = getInstance(id);
		$('.tabs .tab').removeClass('active');
		$('.tabs').find('[data-id="'+id+'"]').addClass('active');

		$('.ace-content').removeClass('ace-content-active');
		$('#'+id).addClass('ace-content-active');
		activeInstance = instance;
	});

	$('body').on('dblclick','.tab',function(){
		var id = $(this).data('id');
		if(id=='editor'){
			return;
		}
		var instance = getInstance('editor');
		$('.tabs .tab:first-child').addClass('active');
		$('.tabs').find('[data-id="'+id+'"]').remove();

		$('.ace-content').removeClass('ace-content-active');
		$('#editor').addClass('ace-content-active');
		$('#'+id).remove();
		activeInstance = instance;
		tabCount--;
	});

	window.addEventListener('keyup',function (e){
		var size = activeInstance.getFontSize();

		if(e.ctrlKey && e.keyCode==187){
			size++;
			activeInstance.setFontSize(size);
		}

		if(e.ctrlKey && e.keyCode==189){
			size--;
			activeInstance.setFontSize(size);
		}

	});

	/* Add event listner for Ctrl + zoom gester*/
});



var identifiers = [];
function getInstance(id){
	var returnInstance;
	for(var i=0,len = editorArray.length,flag = true;  i<len&&flag;   i++){
		if(id == editorArray[i].id){
			returnInstance = editorArray[i].instance;
			flag = false;
		}
	}
	return returnInstance;

}
function getRandomString(){
    return buildTimestampIdentifier() + buildUniqueIdentifier() + buildUniqueIdentifier();
}
function buildUniqueIdentifier(){
	return Math.floor((1 + Math.random()) * 0x10000)
			.toString(16)
			.substring(1);
}
function buildTimestampIdentifier(){
	var newDate =  new Date().getTime()
				.toString(16);
	var length = newDate.length;
	return newDate.substring(length-8,length);
}
function getUniqueIdentifier(){
	var identifier = null;
	do {
		identifier = getRandomString();
	} while(identifiers.indexOf(identifier)!=-1);
	return identifier;
}