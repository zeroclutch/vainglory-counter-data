function animateIgnScene () {
    var ignsScreen = document.getElementById("igns-screen");
    ignsScreen.innerHTML += "<span class='player-ign main-ign'>" + IGNs[0] + "</span>";
    
    setTimeout(function(){
        for(var i = 1; i < 500; i++) {
            setTimeout(function(){
                ignsScreen.innerHTML += "<span class='main-ign'>" + IGNs[i] + "</span>";
            }, 1000/(0.1*i))
        }
    }, 2000);
};

function populateStatistics() {
}

function delayData () {
    setTimeout(function(){
        document.querySelector("#table-content").style.visibility = "visible";
    }, 1400);
}

function introAnimation () {
    IGNs = [document.querySelector(".ign-entry").value];
    loopHeroes();
    document.querySelector(".entry-screen").style.display = "none";
    document.querySelector("#hero-data-holder").style.display = "block";
    
};

//document.querySelector("#ign-submit").addEventListener("click", function(){ introAnimation() });
//document.body.addEventListener("keydown", function(e){if(e.keyCode == "13"){ introAnimation() }});