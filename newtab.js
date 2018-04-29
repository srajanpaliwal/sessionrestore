var data=null;
var url=null;
window.onload = function() 
{
	chrome.tabs.getCurrent(function(tab) 
	{
		var urljson=tab.url.split('##')[1];
		data=JSON.parse(decodeURI(urljson));
		url=data.url;
		document.title= data.title;
		var icon =document.createElement("link");
		icon.setAttribute('rel','icon');
		icon.setAttribute('type','img/ico');
		icon.setAttribute('href','chrome://favicon/'+url);
		document.getElementsByTagName('head')[0].appendChild(icon);
		if(data.pinned)
		{
			chrome.tabs.update(tab.id,{pinned:true});
		}
		if(data.load)
		{
			window.location.href=url;
		}
	});
}
var hidden, visibilityChange; 
if (typeof document.hidden !== "undefined") 
{ 
  hidden = "hidden";
  visibilityChange = "visibilitychange";
}
else if (typeof document.mozHidden !== "undefined")
{
  hidden = "mozHidden";
  visibilityChange = "mozvisibilitychange";
}
else if (typeof document.msHidden !== "undefined")
{
  hidden = "msHidden";
  visibilityChange = "msvisibilitychange";
}
else if (typeof document.webkitHidden !== "undefined")
{
  hidden = "webkitHidden";
  visibilityChange = "webkitvisibilitychange";
}
function handleVisibilityChange() 
{
	if ((!document[hidden])&&url) 
	{
		window.location.href=url;
	}
}
if (typeof document.addEventListener === "undefined" || typeof document[hidden] === "undefined") 
{
  alert("This extension requires a browser, such as Google Chrome, that supports the Page Visibility API.");
} 
else
{
  document.addEventListener(visibilityChange, handleVisibilityChange, false);
}