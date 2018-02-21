//Global scope for IGNs
var IGNs = ["mrdollywaggit", "xDragonx2375"],
    ignIndex = 0,
    ignIndexCounter = 0,
    output = {},
    filters = {
        gameMode: "5v5_pvp_casual",
        createdStart: new Date(new Date().setDate(new Date().getDate() - 27)).toISOString(),
        patch: "3.0",
        apiKey: "Bearer aaa.bbb.ccc",
        minSkillTier: 0, //currently horrible
        rateLimit: 10
    },
    totalMatches = 0;


function restartSearch() {
    IGNs = ["FlashX","mrprgr"],
    ignIndex = 0,
    ignIndexCounter = 0,
    output = {},
    totalMatches = 0;
}

function loopHeroes () {
    var delay = Math.round(60/filters.rateLimit*2000);
    
    //Loop through heroes
    retrieveMatchHistory(IGNs[ignIndex], undefined, filters);
    ignIndex++;
    setTimeout(function () {
        retrieveMatchHistory(IGNs[ignIndex], undefined, filters);
        if(ignIndex < IGNs.length) { //Continue running until all IGNs in region are indexed
            loopHeroes();
        }
        ignIndex++;
    }, delay);
}

function updateWebpage() {
    var loopStarted = false;
    //Check if API key has been submit yet.
    setInterval(function(){
        if(filters.apiKey != "Bearer aaa.bbb.ccc" && !loopStarted) {
            loopHeroes();
            loopStarted = true;
            console.log("API Key entered! Now searching for matches.")
        } else {
            heroPageData.outputData = output;
            heroPageData.totalMatches = totalMatches;
            heroPageData.ignsDone = ignIndexCounter;
            heroPageData.ignsLeft = (IGNs.length-ignIndexCounter);
            heroPageData.ignList = IGNs;
            heroPageData.strongestCounter = getStrongestCounter(heroPageData.currentHero);
        }
    },2000);
}
//Actually use API
function retrieveMatchHistory(playerName, teamName, filters) {
    vgAPI.key = filters.apiKey;
    //Use API interface
    vgAPI.getMatchList({
        filterPlayerNames: playerName,
        //sort: "createdAt",
        filterCreatedAtStart: filters.createdStart,
        filterGameMode: "ranked",
        filterPatch: filters.patch,
        done: function (data) {
            //console.log(data);
            setTimeout(function () {
                getHeroData(data, playerName);
            }, 10);
        }
    });
    ignIndexCounter++;
}

function addIGN(currentInc) {
    var IGN = currentInc.attributes.name.replace(" ","").replace("\n","");
    if (IGNs.indexOf(IGN) == -1) {
        IGNs.push(IGN);
    }
}

//Find roster > participant, (and log hero names)
//Store roster values in array like ["winner",["loser","loser","loser"]]

//Find roster object through match to be able to reference participants and get heroes
function getRosters(data, playerName) { 
    outputMatchData = [];
    for (var i = 0; i < data.data.length; i++) {
        var currentRoster = data.data[i].relationships.rosters.data;
        outputMatchData.push([currentRoster[0].id, currentRoster[1].id]);
        totalMatches++;
    }
    return outputMatchData;
}

function mapParticipantHeroes(heroData, participants) {
    for (var i = 0; i < heroData.length; i++) {
        //Replace heroData participant ID with hero name
        var winnerName = participants[heroData[i][0]];
        //Add the heroes that lost to the data output
        if (heroData[i][1].length > 1 && winnerName) { //There is currently a bug that does not allow the heroData[i][1] from being replaced with the losing roster.
            for (var k = 0; k < heroData[i][1].length; k++) {
                var loserName = participants[heroData[i][1][k]];

                //Initialize winner hero object
                if (!output[winnerName] && winnerName) {
                    output[winnerName] = {};
                }
                
                //Initialize loser heroes inside winning hero
                if (!output[winnerName][loserName]) {
                    console.log(winnerName + " vs " + loserName + " created.")
                    output[winnerName][loserName] = {
                        matches: 0,
                        wins: 0,
                        winrate: 0
                    };
                }
                
                //Add 1 to the wins counter for the winning hero
                output[winnerName][loserName].wins++;
                output[winnerName][loserName].matches++;
                output[winnerName][loserName].winrate = (output[winnerName][loserName].wins / output[winnerName][loserName].matches * 100).toFixed(2);


                //Initialize loser hero object
                if (!output[loserName]) {
                    output[loserName] = {};
                }
                
                //Initialize winner heroes inside losing hero
                if (!output[loserName][winnerName]) {
                    output[loserName][winnerName] = {
                        matches: 0,
                        wins: 0,
                        winrate: 0
                    };
                    
                }
                //Add 1 to the matches counter for the losing hero
                output[loserName][winnerName].matches++;
                
                //Delete any undefined data
                delete output[winnerName][undefined];
                delete output[loserName][undefined];
                delete output[undefined];
                    
                //Sort by keys
                var sortedOutput = {};

                Object.keys(output).sort().forEach(function(key) {
                  sortedOutput[key] = output[key];
                });
                output = sortedOutput;
                
                //Sort by keys
                var sortedOutput = {};

                Object.keys(output[winnerName]).sort().forEach(function(key) {
                  sortedOutput[key] = output[winnerName][key];
                });
                output[winnerName] = sortedOutput;
                
                //Sort by keys
                var sortedOutput = {};

                Object.keys(output[loserName]).sort().forEach(function(key) {
                  sortedOutput[key] = output[loserName][key];
                });
                output[loserName] = sortedOutput;
            }
        }
    }

    console.log(output);
    console.log(totalMatches + " matches scanned. " + ignIndexCounter + " igns searched. " + (IGNs.length - ignIndexCounter) + " more igns to go.");

    //Update values on webpage
    Vue.nextTick(function () {
        heroPageData.outputData = output;
        heroPageData.totalMatches = totalMatches;
        heroPageData.ignsDone = ignIndexCounter;
        heroPageData.ignsLeft = (IGNs.length - ignIndexCounter);
        heroPageData.ignList = IGNs;
        heroPageData.strongestCounter = getStrongestCounter(heroPageData.currentHero);
    });

    //Save values in local. Only store last 200 IGNs to avoid excess data
    var saveData = JSON.stringify(output) + "===" + IGNs.slice(Math.max(IGNs.length - 200, 0)).join("==") + "===" + totalMatches + "===" + 0;
    localStorage.setItem("saveFile", saveData);
}

function getHeroData(data, playerName) {
    var rostersList = getRosters(data, playerName),
        adjustedRosters = rostersList.join();
    adjustedRosters = adjustedRosters.split(",");

    var outputHeroData = [],
        dataIndices = {},
        index = 0;

    var participantList = {};

    //Loop over all data twice to ensure all data is checked
    for (var i = 0, i2 = 0; i2 < data.included.length * 2; i2++) {
        i++;
        if (i2 == data.included.length) {
            i = 0;
        }
        currentInc = data.included[i];

        //Avoid errors (ReferenceError?) by checking if currentInc is defined first
        if (currentInc) {
            if (currentInc.type == "roster") {
                if (adjustedRosters.includes(currentInc.id)) {
                    //If it's the winning roster, store it in the array and 
                    if (currentInc.attributes.won == "true") {
                        dataIndices[currentInc.id] = []; //Store winning roster ID in dataIndices
                        for (var k = 0; k < currentInc.relationships.participants.data.length; k++) {
                            outputHeroData.push([[currentInc.relationships.participants.data[k].id], [currentInc.id]])
                            dataIndices[currentInc.id].push(index);
                            index++;
                        }
                        //If its the losing roster, find the winning roster in the array and put the corresponding loser's data
                    } else if (currentInc.attributes.won == "false") {
                        var loserParticipantsArray = [];
                        for (var k = 0; k < currentInc.relationships.participants.data.length; k++) {
                            loserParticipantsArray.push(currentInc.relationships.participants.data[k].id);
                        }

                        //Find other roster ID by looking at the other roster stored in the nested array in rostersList
                        var winningRoster;

                        if (adjustedRosters.indexOf(currentInc.id) % 2 == 0) {
                            winningRoster = rostersList[Math.floor(adjustedRosters.indexOf(currentInc.id) / 2)][1]
                        } else if (adjustedRosters.indexOf(currentInc.id) % 2 == 1) {
                            winningRoster = rostersList[Math.floor(adjustedRosters.indexOf(currentInc.id) / 2)][0]
                        }

                        //Make sure that data hasn't been written to this yet
                        if (dataIndices[winningRoster]) {
                            for (var l = 0; l < dataIndices[winningRoster].length; l++) {
                                outputHeroData[dataIndices[winningRoster][l]][1] = loserParticipantsArray;
                            }
                        }
                    }
                }

            } else if (currentInc.type == "participant" && currentInc.attributes.stats.skillTier >= filters.minSkillTier) {
                var heroName = currentInc.attributes.actor.replace(/[\W_]+/g, "") + detectPath(currentInc);
                participantList[currentInc.id] = heroName;
            } else if (currentInc.type == "participant" && currentInc.attributes.stats.skillTier < filters.minSkillTier) {
                delete participantList[currentInc.id];
            } else if (currentInc.type == "player") {
                addIGN(currentInc);
            }
        }
    }
    mapParticipantHeroes(outputHeroData, participantList);
}

//Console commands
function getStrongestCounter(hero) {
    var dataForHero = output[hero],
        bestHero = "";
    for (var enemyHero in dataForHero) {
        if (!bestHero || dataForHero[enemyHero].winrate < dataForHero[bestHero].winrate) {
            bestHero = enemyHero;
        }
    }
    return bestHero;
    console.log(bestHero)
}

function getWeakestCounter(hero) {
    var dataForHero = output[hero],
        bestHero = "";
    for (var enemyHero in dataForHero) {
        if (!bestHero || dataForHero[enemyHero].winrate > dataForHero[bestHero].winrate) {
            bestHero = enemyHero;
        }
    }
    return bestHero;
    console.log(bestHero)
}

function getMostFrequentMatchup() {
    var highestPoint = ["", 0];
    for (var a in output) {
        for (var b in output[a]) {
            if (output[a][b].matches > highestPoint[1]) {
                highestPoint[0] = a + " against " + b;
                highestPoint[1] = output[a][b].matches;
            }
        }
    }
    return highestPoint;
}

function getLeastFrequentMatchup() {
    var highestPoint = ["", 100000000];
    for (var a in output) {
        for (var b in output[a]) {
            if (output[a][b].matches < highestPoint[1]) {
                highestPoint[0] = a + " against " + b;
                highestPoint[1] = output[a][b].matches;
            }
        }
    }
    return highestPoint;
}

function getBestMatchup() {
    var highestPoint = ["", 0];
    for (var a in output) {
        for (var b in output[a]) {
            if (output[a][b].winrate > highestPoint[1]) {
                highestPoint[0] = a + " against " + b;
                highestPoint[1] = output[a][b].winrate;
            }
        }
    }
    return highestPoint;
}

function getWorstMatchup() {
    var highestPoint = ["", 1000];
    for (var a in output) {
        for (var b in output[a]) {
            if (output[a][b].winrate < highestPoint[1]) {
                highestPoint[0] = a + " against " + b;
                highestPoint[1] = output[a][b].winrate;
            }
        }
    }
    return highestPoint;
}

console.log("Searching with filters:", filters);
//loopHeroes();