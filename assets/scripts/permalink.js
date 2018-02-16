//Get URL params
function getHero () {
    var url = window.location.href.split("hero=")[1];
    heroPageData.currentHero = url;
}