document.addEventListener('DOMContentLoaded', function() {
    var homeSplash = document.getElementById('homeSplashFade'),
        homeSplashBgElem = document.getElementById('homeSplashFadeBg'),
        homeSplashHeight = homeSplash.offsetTop + homeSplash.offsetHeight,
        homeSplashBgOverflow = 30,
        y, percentage;

    window.addEventListener('scroll', function() {
        y = window.scrollY;

        if(y <= homeSplashHeight) {
            percentage = ((homeSplashBgOverflow / 2) * (-((homeSplashHeight - y) / homeSplashHeight))) * ((100 - homeSplashBgOverflow) / 100);
            homeSplashBgElem.style.transform = 'translate3d(0, ' + percentage + '%, 0)';
        }
    });
});