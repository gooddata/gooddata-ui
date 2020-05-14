document.addEventListener('DOMContentLoaded', function() {
    var navToggler = document.getElementById('navToggler');

    if(navToggler) {
    	var bodyClasses = document.body.classList;
		var NAV_OPEN = "toggleNavOpen";

    	navToggler.addEventListener('click', function() {
    		if(bodyClasses.contains(NAV_OPEN)) {
    			bodyClasses.remove(NAV_OPEN);
    		}
    		else {
    			bodyClasses.add(NAV_OPEN);
    		}
	    });
	}

	document.querySelector('header .logo').parentNode.href = "https://developer.gooddata.com/";
});
