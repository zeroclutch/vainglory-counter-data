var simplifiedData;
var simplePreloadData;
var saveButton = document.querySelector("#save-file");
var preloadButton = document.querySelector("#preload-file");

function simplifyData(data) {
    //Decode stored data
    data.replace("\n","");
    data.replace("====","==");
    var outputData = data.split("===");
    outputData[0] = JSON.parse(outputData[0]);
    outputData[1] = outputData[1].split("==");
    return outputData;
}

if(localStorage.getItem("saveFile")){
    simplifiedData = simplifyData(localStorage.getItem("saveFile"));
    saveButton.style.visibility = "visible";
    saveButton.innerHTML = "Restore data from " + simplifiedData[2] + " matches";
}

if(!localStorage.getItem("preloadFile")){
    simplePreloadData = simplifyData(preloadedData);
    preloadButton.style.visibility = "visible";
    preloadButton.innerHTML = "Restore data from " + simplePreloadData[2] + " matches";
}

//Set button content
preloadButton.innerHTML = "Restore data from " + simplePreloadData[2] + " matches";

saveButton.addEventListener("click", function() {
    output = simplifiedData[0];
    IGNs = simplifiedData[1];
    totalMatches = simplifiedData[2];
    ignIndex = 0;
    ignIndexCounter = 0;
    getHero();
    
    document.querySelector(".entry-screen").style.display = "none";
    document.querySelector("#hero-data-holder").style.display = "block";
    
    if(filters.apiKey !== "Bearer aaa.bbb.ccc"){
        loopHeroes();
    } else {
        updateWebpage();
    }
    delayData();
});

preloadButton.addEventListener("click", function() {
    output = simplePreloadData[0];
    IGNs = simplePreloadData[1];
    totalMatches = simplePreloadData[2];
    ignIndex = simplePreloadData[3];
    ignIndexCounter = simplePreloadData[3];
    getHero();
    
    document.querySelector(".entry-screen").style.display = "none";
    document.querySelector("#hero-data-holder").style.display = "block";
    
    if(filters.apiKey !== "Bearer aaa.bbb.ccc") {
        loopHeroes();
    } else {
        updateWebpage();
    }
    delayData();
});