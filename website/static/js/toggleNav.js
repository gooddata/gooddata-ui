document.addEventListener('DOMContentLoaded', function() {
    var navToggler = document.getElementById('navToggler');

    if(navToggler) {
    	navToggler.addEventListener('click', function() {
	        document.body.classList.toggle('toggleNavOpen');
	    });
    }
});
