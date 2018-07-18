document.addEventListener('DOMContentLoaded', function() {

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

	// HEADER ACTIONS
	sendGAEvent(document.querySelector(".nav-site-internal a[href*='/gooddata-ui/docs/about_gooddataui.html']"), "click", "Tab Docs");
	sendGAEvent(document.querySelector("a.featuresLink[href*='https://gooddata-examples.herokuapp.com']"), "click", "Tab Live Examples");
	sendGAEvent(document.querySelector(".homeContainer a.button[href*='/gooddata-ui/docs/about_gooddataui.html']"), "click on header", "Get Started");
	sendGAEvent(document.querySelector('a[href*="https://github.com/gooddata/gooddata-react-components"]'), "click on header", "Github");

	// BODY ACTIONS
	sendGAEvent(document.querySelector(".homeWrapper a.button-link[href*='https://help.gooddata.com/display/doc/GoodData+Platform+Overview']"), "click", "Develop with GoodData");
	sendGAEvent(document.querySelector(".button-more-charts"), "click", "More Charts");
	sendGAEvent(document.querySelector(".productShowcaseExample a[href*='https://gooddata-examples.herokuapp.com']"), "click in tutorial", "Live Examples");

	// FOOTER ACTIONS
	sendGAEvent(document.querySelector(".getStartedSection a.button[href*='/gooddata-ui/docs/about_gooddataui.html']"), "click on footer", "Get Started");
	sendGAEvent(document.querySelector(".social-button.github"), "click on footer", "Github");
	sendGAEvent(document.querySelector(".social-button.twitter"), "click on footer", "Twitter Dev");
	sendGAEvent(document.querySelector(".social-button.stackoverflow"), "click on footer", "Stack Overflow");
	sendGAEvent(document.querySelector("a[href*='https://github.com/gooddata/gooddata-react-components/blob/master/LICENSE']"), "click on footer", "Licence");
});
