var nowindows=1;
var lastwindow=true;
var tabList = new Array();
var enabled=true;
urls=new Array();
var extensionid='kkegendjkldolnjfcnjmjddodaddldgg';
chrome.tabs.onUpdated.addListener(function(tabid,info)
{
	if(lastwindow&&enabled)
	{
		lastwindow=false;
		chrome.windows.getAll({populate: true}, function(winarray)
		{
			if(winarray.length==1)
			{
					var window=winarray[0];
					tabList = new Array();
					if(typeof(window) != "undefined")
					{
						var tabsarray=window.tabs;
						var j=0;
							for(j=0;j<tabsarray.length;j++)
						{
							if(tabsarray[j].url.match(/chrome\u003A\u002F\u002F/g))
							{
								continue;
							}
							else
							{
								tabList.push({title:tabsarray[j].title,url:tabsarray[j].url});
							}

						}
						chrome.storage.local.set({'tabs': tabList});
					}
			}
		});
		lastwindow=true;
	}
});
chrome.windows.onCreated.addListener(function(window)
{
	enabled=false;
	chrome.alarms.create('enablescript', {delayInMinutes:1});
});
chrome.alarms.onAlarm.addListener(function (alarm)
{
	if(alarm.name=='enablescript')
	{
		enabled=true;
	}
});