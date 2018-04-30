var lastwindow=true;
var tabList = new Array();
var extensionid='Enter extension ID here';
function savetab()
{
	if(lastwindow)
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
						var temptab;
							for(j=0;j<tabsarray.length;j++)
						{
							if(tabsarray[j].url.match(/chrome\u003A\u002F\u002F/g))
							{
								continue;
							}
							else if(tabsarray[j].url.split('##')[1])
							{
								temptab=JSON.parse(tabsarray[j].url.split('##')[1]);
								tabList.push({title:temptab.title,url:temptab.url,pinned:tabsarray[j].pinned});
							}
							else
							{ 	
								tabList.push({title:tabsarray[j].title,url:tabsarray[j].url,pinned:tabsarray[j].pinned});
							}

						}
						chrome.storage.local.set({'tabs': tabList});
					}
			}
		});
		lastwindow=true;
	}
}
chrome.tabs.onUpdated.addListener(function(tabid,info)
{
	savetab();
});