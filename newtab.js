var tab_pos=null;
var url=null;
var tabinfo;
window.onload = function() {
chrome.tabs.getCurrent(function(tab) {
	tab_pos=tab.index;
});
chrome.storage.local.get('tabs',function(items)
{
	var tabsarray=items['tabs'];
	tabinfo=tabsarray[tab_pos].title.split('##');
	url=tabinfo[1];
	document.title= tabsarray[tab_pos].title;
	var icon =document.createElement("link");
	icon.setAttribute('rel','icon');
	icon.setAttribute('type','img/ico');
	icon.setAttribute('href','chrome://favicon/'+tabinfo[1]);
	document.getElementsByTagName('head')[0].appendChild(icon);
	if(tab_pos==0)
	{
		window.location.href=url;
	}
});
}
var hidden, visibilityChange; 
if (typeof document.hidden !== "undefined") { 
  hidden = "hidden";
  visibilityChange = "visibilitychange";
} else if (typeof document.mozHidden !== "undefined") {
  hidden = "mozHidden";
  visibilityChange = "mozvisibilitychange";
} else if (typeof document.msHidden !== "undefined") {
  hidden = "msHidden";
  visibilityChange = "msvisibilitychange";
} else if (typeof document.webkitHidden !== "undefined") {
  hidden = "webkitHidden";
  visibilityChange = "webkitvisibilitychange";
}
function handleVisibilityChange() {
	if ((!document[hidden])&&url) {
	window.location.href=url;
}
}
if (typeof document.addEventListener === "undefined" || 
  typeof document[hidden] === "undefined") {
  alert("This demo requires a browser, such as Google Chrome or Firefox, that supports the Page Visibility API.");
} else {
  document.addEventListener(visibilityChange, handleVisibilityChange, false);
  }