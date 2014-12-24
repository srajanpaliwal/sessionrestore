var urls=new Array();
var data={title:'',url:'',load:false,pinned:false};
var extensionid='kkegendjkldolnjfcnjmjddodaddldgg';
function loadtab(winarray)
{
	if(winarray.length==1)
	{
		chrome.storage.local.get('tabs',function(items)
		{
			var tabsarray=items['tabs'];
			if(typeof(tabsarray) != "undefined")
			{
				var j=0;
				for(j=0;j<tabsarray.length;j++)
				{
					data.title=tabsarray[j].title;
					data.url=tabsarray[j].url;
					data.pinned=tabsarray[j].pinned;
					if(j==0)
					{
						data.load=true;
					}
					urls.push('chrome-extension://'+extensionid+'/newtab.html##'+JSON.stringify(data));
					data.load=false;
				}
				if(winarray[0].tabs.length==1&&!(winarray[0].tabs[0].url.match(/chrome\u003A\u002F\u002F/g)))
				{
					urls.push(winarray[0].tabs[0].url);
				}
				chrome.windows.create({url:urls,focused:true},function(window)
				{
					chrome.windows.update(window.id, {state:"maximized"});
					chrome.windows.remove(winarray[0].id);
				});
			}
		});
	}
}
function addsave()
{
var s = document.createElement('script');
	s.src = chrome.extension.getURL("backsave.js");
	s.setAttribute("id", "exqwejkl");
	s.onload = function() 
	{
		this.parentNode.removeChild(this);
	};
	document.head.appendChild(s);	
}
chrome.windows.getAll({populate: true}, function(winarray)
{
	loadtab(winarray);
	addsave();
});
chrome.windows.onCreated.addListener(function(window)
{
	urls=new Array();
	chrome.windows.getAll({populate: true}, function(winarray)
	{
		loadtab(winarray);
		savetab();
	});
});
chrome.runtime.onInstalled.addListener(function(details)
{
	if(details.reason=="install")
	{
		chrome.tabs.create({url:"options.html"});
		addsave();
	}
} );
