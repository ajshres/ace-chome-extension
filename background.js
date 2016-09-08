chrome.app.runtime.onLaunched.addListener(function (){
	chrome.app.window.create('app.html',{
		'outerBounds':{
			'width':320,
			'height':480
		}
	},function (appWindow){
		appWindow.setAlwaysOnTop(true);
	});
});