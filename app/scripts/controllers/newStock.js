app.controller('newStockCtrl',['$scope','$http', '$state', '$rootScope',
    function($scope, $http, $state, $rootScope){
    	var maxResults = 10;
var startIndex = 0;
var totalBooks = 0;
var apiKey = "AIzaSyAY-BLl9HgepqEFBxR5YJbC_qdE4PZF_6g";
var searchKey, operation;

var hideButton = function(button) {
	button.attr("style", "display:none;"); 
}

var showButton = function(button) {
	button.attr("style", ""); 
}

var buttonToggle = function() {
	console.log(startIndex);

	var previousButton = $('#previous-page');
	var nextButton = $('#next-page');

	//previous button
	if (startIndex == 0) {
		hideButton(previousButton);
	} else {
		showButton(previousButton);
	}
	//next button
	if (startIndex + maxResults > totalBooks) {
		hideButton(nextButton);
	} else {
		showButton(nextButton);
	}
}

var htmlConvert = function(thumbnail, title, publisher, isbn) {
	var htmlTemplate =  "<div class=\"col-lg-2 col-md-3 col-xs-4\" style=\""+
	    					"margin-top: 12px;" +
    						"margin-bottom: 0px;" +
    						"margin-right: 0px;" +
    						"margin-left: 12px;" +

    						"padding-top: 20px;" +
    						"padding-bottom: 20px;" +
    						"padding-right: 20px;" + 
    						"padding-left: 20px;" +

							"border-style: solid;" +

							"height: 348px;\">" + 

							"<div class=\"book-info\" >" +							    
								"<div class=\"thumbnail\" style=\"height: 200px;\" ><img src=\""+ thumbnail + "\"></div>" +
								 
								"<div class=\"title\" style=\"" +

								    "display: -webkit-box;" +
    								"-webkit-line-clamp: 3;" +
    								"-webkit-box-orient: vertical;" + 
									"overflow: hidden;" +
									"text-overflow:ellipsis;" +
    								
									
									"max-height: 60px;" +
									"min-height: 20px;\">" + 
									"Title:" + title + "</div>" + 
								"<div class=\"publisher\" style=\"" +
									"overflow: hidden;" +
									"max-height: 40px;" +
									"min-height: 20px;\">" + 
									"Publisher: " + publisher + "</div>" +				
							"</div>" +
						"</div>";

	return htmlTemplate;
}

var showResult = function(data) {
	buttonToggle();
	var books = data.items;
	// no books || no matched items
	if (totalBooks == 0) {
		$('#result').append("book not found");
	} 
	else {
		var i, j, book, thumbnail, title, publisher, isbn;
		for (i = 0; i < books.length; i++) {
			book = books[i];
			console.log(book);
			// no thumbnail
			if (book.volumeInfo.imageLinks == undefined) {
				// this is "not available" image
				thumbnail = "http://webmaster.ypsa.org/wp-content/uploads/2012/08/no_thumb.jpg";
			} else {
				thumbnail = book.volumeInfo.imageLinks.smallThumbnail;
			}

			title = book.volumeInfo.title;

			// no isbn
			if (book.volumeInfo.industryIdentifiers == undefined) {
				isbn = "not available";
			} else {
				isbn = book.volumeInfo.industryIdentifiers[0].identifier;
			}

			// no publisher
			if (book.volumeInfo.publisher == undefined) {
				publisher = "not available";
			} else {
				publisher = book.volumeInfo.publisher;
			}

			var html = htmlConvert(thumbnail, title, publisher, isbn);
			$('#result').append(html);
		}
	}
}

var clearResult = function() {
	$('#result').html("");
}

var getBooks = function(searchKey, operation, startIndex, maxResults, apiKey) {
	$.get("https://www.googleapis.com/books/v1/volumes?q=" + operation + ":" + searchKey + 
		"&maxResults=" + maxResults + "&startIndex=" + startIndex + 
			"&key=" + apiKey, function(data) {
		//data is the matched items that returned from Google books API	
		totalBooks = data.totalItems;
		showResult(data);
	});
}

$('#search-button').click(function() {
	clearResult();
	// if the search button is clicked, then show the pagination buttons
	$('.pagination').each(function() {
		$(this).attr("style", "");
	});
	searchKey = $('#search-field').val();
	operation = $('input:checked').attr("value");
	getBooks(searchKey, operation, startIndex, maxResults, apiKey);
});

//manual pagination
$('#next-page').click(function() {
	clearResult();
	startIndex += maxResults - 1;
	getBooks(searchKey, operation, startIndex, maxResults, apiKey);
});

//manual pagination
$('#previous-page').click(function() {
	clearResult();
	startIndex -= maxResults - 1;
	getBooks(searchKey, operation, startIndex, maxResults, apiKey);
});
}]);
