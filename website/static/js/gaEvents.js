document.addEventListener('DOMContentLoaded', function() {

	/*function handleOutboundLinkClicks(event) {
	  ga('send', 'event', {
	    eventCategory: 'Outbound Link',
	    eventAction: 'click',
	    eventLabel: event.target.href,
	    transport: 'beacon'
	  });
	}*/

	function sendGAEvent(item, action, category) {
		item.addEventListener("click", function () {
			ga('send', 'event', {
				eventCategory: category,
				eventAction: action,
				eventLabel:'GoodData.UI',
				transport: 'beacon'
			});
		});
	}

	sendGAEvent(document.querySelector('a[href*="https://github.com/gooddata/gooddata-react-components"]'), "click on header", "Github");
	sendGAEvent(document.querySelector("a[href*='https://github.com/gooddata/gooddata-react-components/blob/master/LICENSE']"), "click on footer", "Licence");
	sendGAEvent(document.querySelector("a.featuresLink[href*='https://gooddata-examples.herokuapp.com']"), "click", "Live Examples");
	sendGAEvent(document.querySelector(".button-more-charts"), "click", "More Charts");
	sendGAEvent(document.querySelector(".social-button.github"), "click on footer", "Github");
	sendGAEvent(document.querySelector(".social-button.twitter"), "click on footer", "Twitter Dev");
	sendGAEvent(document.querySelector(".social-button.stackoverflow"), "click on footer", "Stack Overflow");
	sendGAEvent(document.querySelector(".productShowcaseExample a[href*='https://gooddata-examples.herokuapp.com']"), "click in tutorial", "Live Examples");
	sendGAEvent(document.querySelector(".homeWrapper a.button-link[href*='https://help.gooddata.com/display/doc/GoodData+Platform+Overview']"), "click", "Develop with GoodData");

	



    /*var hrefs = document.querySelectorAll("a[href*='https://']");

    hrefs.forEach(function(item) {
    	item.addEventListener('click', function(event) {
        	handleOutboundLinkClicks(event);
    	});
    });*/
});