

/* Load the news listing */
function loadFeeds(feedData) {
    if ((!feedData && feedData.feedUrl)) return false;
    var feedUrl = feedData.feedUrl;
    var defaultImageUrl = feedData.defaultImageUrl;
    var defaultImageWidth = (feedData.defaultImageWidth) ? feedData.defaultImageWidth : 153;
    var defaultImageHeight = (feedData.defaultImageHeight) ? feedData.defaultImageHeight : 102;
    var defaultFeedWidth = (feedData.defaultFeedWidth) ? feedData.defaultFeedWidth : 406;
    var newsTextWidth = defaultFeedWidth - defaultImageWidth - 14; 
    var feedContainerID = (feedData.feedContainerID) ? feedData.feedContainerID : ''
 
	//feedUrl += '?nocache='+(new Date).getTime();	// uncomment this line if cache causes unreasonable delays
    var feed = new google.feeds.Feed(feedUrl);
    feed.setNumEntries(10);
    feed.load(function(result) {
	console.log(defaultFeedWidth)
	if (!result.error) {
	    var container = document.getElementById(feedContainerID);
	    if (!container) {
		container = document.createElement("div");
		document.body.appendChild(container);
	    }
	    container.style.width = defaultFeedWidth + "px";
	    for (var i = 0; i < result.feed.entries.length; i++) {
		var entry = result.feed.entries[i];
		var newsBlockEl = document.createElement("div");
		var oddEvenClass = (i % 2) ? "table_even" : "table_odd";
		newsBlockEl.setAttribute("class", "body_newsarticle "+oddEvenClass);
		newsBlockText = document.createElement("div");
		newsBlockText.setAttribute("class", "body_newstextarea");
		newsBlockText.style.width = newsTextWidth + "px";
		
		// Set up title and content elements
		
		var titleEl = document.createElement("a");
		var bodyEl = document.createElement("p");
		var dateEl = document.createElement("span");
				
			// Set up title element
			titleEl.setAttribute("href", entry.link);
			titleEl.setAttribute("title", entry.title);
			titleEl.setAttribute("class", "body_newsarticle_title");
			titleEl.appendChild(document.createTextNode(entry.title));
			newsBlockText.appendChild(titleEl);
				
			// Set up date element
			dateEl.setAttribute("class", "body_smalltext");
			dateEl.appendChild(document.createTextNode(formatDate(new Date(entry.publishedDate))));
			newsBlockText.appendChild(dateEl);
				
			// Set up content element
			bodyEl.setAttribute("class", "body_featurebox2_text");
			bodyEl.innerHTML = entry.content;

			var imgEls = bodyEl.getElementsByTagName("IMG");
			if (imgEls.length == 0 && defaultImageUrl != '') {
			    imgEls = [];
			    imgEls[0] = document.createElement("img");
			    imgEls[0].setAttribute("src", defaultImageUrl);
			}
			if (imgEls.length > 0) { 
			    imgEls[0].setAttribute("width", defaultImageWidth);
			    imgEls[0].setAttribute("height", defaultImageHeight);
			    imgEls[0].setAttribute("alt", entry.title);
			    newsBlockEl.appendChild(imgEls[0]); 
			}



			newsBlockEl.appendChild(newsBlockText);
			newsBlockText.appendChild(bodyEl);
			newsBlockEl.innerHTML += "<br class='clear' />";
		        container.appendChild(newsBlockEl);
		}
	}
});	
}

/* Load the index page news list */
function loadIndexFeeds(feedUrl, numEntries) {
	var feed = new google.feeds.Feed(feedUrl);
	feed.setNumEntries(numEntries);
	feed.load(function(result) {
		if (!result.error) {
			var container = document.getElementById("index-news-feed");
			for (var i = 0; i < result.feed.entries.length; i++) {
				var entry = result.feed.entries[i];
				var newsBlockEl = document.createElement("li");
				newsBlockEl.innerHTML = "&raquo; ";
				
				// Set up title element
				var titleEl = document.createElement("a");
				
				// Set up title element
				titleEl.setAttribute("href", entry.link);
				titleEl.setAttribute("title", entry.title);
				titleEl.appendChild(document.createTextNode(entry.title));
				newsBlockEl.appendChild(titleEl);
				
				container.appendChild(newsBlockText);
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


