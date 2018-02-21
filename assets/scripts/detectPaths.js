//TODO: Sort alphabetically by hero name and have tags marking the hero - would require search restart
var purchasableItems = {
        weapon: ["Bonesaw","Breaking Point", "Poisoned Shiv", "Serpent Mask", "Spellsword", "Sorrowblade", "Tension Bow", "Tornado Trigger", "Tyrants Monocle", "Heavy Steel", "Six Sins", "Weapon Blade", "Weapon Infusion"],
        crystal: ["Aftershock","Alternating Current","Broken Myth","Clockwork","Dragon's Eye","Echo","Eve Of Harvest","Frostburn","Shatterglass","Spellfire","Heavy Prism", "Eclipse Prism", "Crystal Bit", "Crystal Infusion"],
        utility: ["War Treads", "Fountain of Renewal", "Crucible","Nullwave Gauntlet","Contraption","SuperScout 2000"]
    }, 
    viableHeroes = {
        Adagio: {weapon: 1, crystal: 1, utility: 1},
        Alpha: {weapon: 1, crystal: 1},
        Baptiste: {weapon: 1, crystal: 1, utility: 1},
        Baron: {weapon: 1, crystal: 1},
        Blackfeather: {weapon: 1, crystal: 1},
        Fortress: {crystal: 1, utility: 1},
        Glaive: {weapon: 1, crystal: 1, utility: 1},
        Grace: {weapon: 1, utility: 1},
        Grumpjaw: {weapon: 1, crystal: 1, utility: 1},
        Gwen: {weapon: 1, crystal: 1},
        Idris: {weapon: 1, crystal: 1},
        Kestrel: {weapon: 1, crystal: 1},
        Ringo: {weapon: 1, crystal: 1},
        Skye: {weapon: 1, crystal: 1},
        Varya: {weapon: 1, crystal: 1},
        Vox: {weapon: 1, crystal: 1}
    };

//Takes participant object as argument
function detectPath (participantInfo) {
    var buildInfo = {
        weapon: 0,
        crystal: 0,
        utility: 0,
        other: 0
    },
        hero = participantInfo.attributes.actor.replace(/[\W_]+/g, ""),
        heroBuild = participantInfo.attributes.stats.items;
    
    if(viableHeroes[hero]){
        //Find path by iterating over items
        for(var i = 0; i < heroBuild.length; i++) {
            //Check path of item and viability of hero in that path
            if (purchasableItems.weapon.includes(heroBuild[i]) && viableHeroes[hero].weapon) {
                buildInfo.weapon++;
                viableHeroes[hero].weapon++;
            } else if (purchasableItems.crystal.includes(heroBuild[i]) && viableHeroes[hero].crystal) {
                buildInfo.crystal++;
                viableHeroes[hero].crystal++;
            } else if (purchasableItems.utility.includes(heroBuild[i]) && viableHeroes[hero].utility) {
                buildInfo.utility++;
                viableHeroes[hero].utility++;
            }
        }
        
        var path = Object.keys(buildInfo).reduce(function(a, b) {
            return buildInfo[a] > buildInfo[b] ? a : b
        });
        
        if(viableHeroes[hero][path]) {
            return " " + path.charAt(0).toUpperCase() + path.substr(1).toLowerCase();
        } else {
            //If no path is found, default to the most common path
            var commonestPath = Object.keys(viableHeroes[hero]).reduce(function(a, b){
                return viableHeroes[hero][a] > viableHeroes[hero][b] ? a : b
            });
            return " " + commonestPath.charAt(0).toUpperCase() + commonestPath.substr(1).toLowerCase();
        }

        
    } else {
        return "";
    }
}