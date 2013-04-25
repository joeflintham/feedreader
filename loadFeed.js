

/* LOAD A FEED AND CONVERT TO HTML */

function loadFeeds(feedData) {

    /* exit quietly if no feed data / url is supplied */
    if ((!feedData && feedData.feedUrl)) return false;

    var feedUrl = feedData.feedUrl;
    var defaultImageUrl = feedData.defaultImageUrl;
    var defaultImageWidth = (feedData.defaultImageWidth) ? feedData.defaultImageWidth : 153;
    var defaultImageHeight = (feedData.defaultImageHeight) ? feedData.defaultImageHeight : 102;
    var defaultFeedWidth = (feedData.defaultFeedWidth) ? feedData.defaultFeedWidth : 406;
    var itemTextWidth = defaultFeedWidth - defaultImageWidth - 14;         // accounts for margins etc
    var feedContainerID = (feedData.feedContainerID) ? feedData.feedContainerID : '';
    var defaultLinkToSource = (feedData.defaultLinkToSource) ? feedData.defaultLinkToSource : '';
    var defaultSourceLinkText = (feedData.defaultSourceLinkText) ? feedData.defaultSourceLinkText : '';

    var feed = new google.feeds.Feed(feedUrl);
    feed.setNumEntries(10);
    feed.load(function(result) {

	if (!result.error) {

	    /* read feed source / name */
	    if (result.feed){
		channelLink = (result.feed.link) ? result.feed.link : '';
		channelDescription = (result.feed.description) ? result.feed.description : '';
		channelTitle = (result.feed.title) ? result.feed.title : '';
		linkToMore = (defaultLinkToSource) ? defaultLinkToSource : channelLink;
		moreLinkText = (defaultSourceLinkText) ? defaultSourceLinkText : 'Read more from ' + channelTitle + ' - ' + channelDescription;
	    }


	    /* create a container for the feed, use passed in id or append to body */
	    var container = document.getElementById(feedContainerID);
	    if (!container) {
		container = document.createElement("div");
		document.body.appendChild(container);
	    }
	    container.style.width = defaultFeedWidth + "px";

	    /* loop through items */
	    for (var i = 0; i < result.feed.entries.length; i++) {

		/* get item data */
		var entry = result.feed.entries[i];		
		
		/* create container for item */
		var itemBlockEl = document.createElement("div");
		var oddEvenClass = (i % 2) ? "table_even" : "table_odd";
		itemBlockEl.setAttribute("class", "body_article "+oddEvenClass);
		
		/* create container for news item text content */
		itemBlockText = document.createElement("div");
		itemBlockText.setAttribute("class", "body_itemtextarea");
		itemBlockText.style.width = itemTextWidth + "px";
		
		/* Set up title and content elements */
		var titleEl = document.createElement("a");
		var bodyEl = document.createElement("p");
		var dateEl = document.createElement("span");
				
		/* Set up title element */
		titleEl.setAttribute("href", entry.link);
		titleEl.setAttribute("title", entry.title);
		titleEl.setAttribute("class", "body_itemarticle_title");
		titleEl.appendChild(document.createTextNode(entry.title));
		itemBlockText.appendChild(titleEl);
				
		/* Set up date element */
		dateEl.setAttribute("class", "body_smalltext item_date");
		dateEl.appendChild(document.createTextNode(formatDate(new Date(entry.publishedDate))));
		itemBlockText.appendChild(dateEl);
			
		/* Set up content element */
		bodyEl.setAttribute("class", "body_featurebox2_text");
		bodyEl.innerHTML = entry.content;

		/* set up image */
		var imgEls = bodyEl.getElementsByTagName("IMG");
		if (imgEls.length == 0 && defaultImageUrl != '') { 
		    /* feed contains no image but a default image has been set */
		    imgEls = [];
		    imgEls[0] = document.createElement("img");
		    imgEls[0].setAttribute("src", defaultImageUrl);
		}
		if (imgEls.length > 0) { 
		    imgEls[0].setAttribute("width", defaultImageWidth);
		    imgEls[0].setAttribute("height", defaultImageHeight);
		    imgEls[0].setAttribute("alt", entry.title);
		    itemBlockEl.appendChild(imgEls[0]); 
		}

		/* set up news text content */
		itemBlockEl.appendChild(itemBlockText);
		itemBlockText.appendChild(bodyEl);
		itemBlockEl.innerHTML += "<br class='clear' />";
	        
		/* add item to feed container */
		container.appendChild(itemBlockEl);
	    }

	    /* 'more' link */
	    if (linkToMore != ''){
		moreEl = document.createElement("p");
		moreEl.setAttribute("class", "link_to_more");
		    
		moreLinkEl = document.createElement("a");
		moreLinkEl.setAttribute("href", linkToMore);
		moreLinkEl.appendChild(document.createTextNode(moreLinkText));
		moreEl.appendChild(moreLinkEl);
		container.appendChild(moreEl);
	    }


	}
    });
}


/**
 * Format a date as DD MMMM YYYY
 */
formatDate = function(date) {   
    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];  
    var hours = date.getHours() > 12 ? date.getHours() - 12 : date.getHours();  
    return date.getDate() + ' ' + months[date.getMonth()] + ' ' + date.getFullYear();  
} 


