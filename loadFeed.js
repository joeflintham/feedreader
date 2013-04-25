

/* Load the news listing */
function loadFeeds(feedUrl) {
	//feedUrl += '?nocache='+(new Date).getTime();	// uncomment this line if cache causes unreasonable delays
	var feed = new google.feeds.Feed(feedUrl);
	feed.setNumEntries(10);
	feed.load(function(result) {
		if (!result.error) {
			var container = document.getElementById("news-feed");
			for (var i = 0; i < result.feed.entries.length; i++) {
				var entry = result.feed.entries[i];
				var newsBlockEl = document.createElement("div");
				var oddEvenClass = (i % 2) ? "table_even" : "table_odd";
				newsBlockEl.setAttribute("class", "body_newsarticle "+oddEvenClass);
				
				// Set up title and content elements
				var titleEl = document.createElement("a");
				var bodyEl = document.createElement("p");
				var dateEl = document.createElement("span");
				
				// Set up title element
				titleEl.setAttribute("href", entry.link);
				titleEl.setAttribute("title", entry.title);
				titleEl.setAttribute("class", "body_newsarticle_title");
				titleEl.appendChild(document.createTextNode(entry.title));
				newsBlockEl.appendChild(titleEl);
				
				// Set up date element
				dateEl.setAttribute("class", "body_smalltext");
				dateEl.appendChild(document.createTextNode(formatDate(new Date(entry.publishedDate))));
				newsBlockEl.appendChild(dateEl);
				
				// Set up content element
				bodyEl.setAttribute("class", "body_featurebox2_text");
				bodyEl.innerHTML = entry.content;
				var imgEls = bodyEl.getElementsByTagName("IMG");
				if (imgEls.length == 0) {
					imgEls[0] = document.createElement("img");
					imgEls[0].setAttribute("width", "153");
					imgEls[0].setAttribute("height", "102");
					imgEls[0].setAttribute("alt", entry.title);
					imgEls[0].setAttribute("src", "http://assets.bournemouth.ac.uk/aqua-retrofit/images/news-default-small.jpg");
				}
				newsBlockEl.insertBefore(imgEls[0],titleEl);
				newsBlockEl.appendChild(bodyEl);
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
				
				container.appendChild(newsBlockEl);
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


