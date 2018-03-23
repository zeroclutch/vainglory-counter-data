# Vainglory Hero Counter Data

## What is this
This is a webapp that uses the Vainglory API to search Vainglory matches and retrieve data about hero matchups. It looks at 5v5 matches from patch 3.0 (which can be changed in filters.js, but will require an API key).

## Try it out
Try it at [zeroclutch.github.io/vainglory-counter-data](https://zeroclutch.github.io/vainglory-counter-data/).

If you have a [Vainglory API key](https://developer.vainglorygame.com/), you can search more matches to get additional data. Open the Javascript console and enter:
```js
filters.apiKey = 'YourAPIKey'
```
If you want to restart the search with your own filters, enter this in console:
```js
filters.gameMode = "5v5_pvp_casual"; /*try casual, ranked, casual_aral, blitz_pvp_ranked, 5v5_pvp_casual*/
filters.patch = "3.0";
filters.apiKey = "YourAPIKey"; /*to get an API key, see above*/
restartSearch();
```
To analyze some data, try the following commands in console:
```js
getWeakestCounter('Alpha');  //Find the weakest matchup against Alpha
getStrongestCounter('Rona'); //Find the best counter to Rona
getMostFrequentMatchup();    //Find the most common hero v. hero matchup by match coun
getLeastFrequentMatchup();   //Find the least common hero v. hero matchup by match count
getBestMatchup();            //Find the highest winrate hero v. hero matchup
getWorstMatchup();           //Find the lowest winrate hero v. hero matchup
```
To find player skill tier data, try looking at the following variables in console:
```js
skillTiers         //Find relative numbers of players in a specific skill tier (numbers do not represent the actual number of players in a tier, but can be used to calculate percentage data)
numberedSkillTiers //Find relative numbers of players at specific VST scores (VST scores are approximated to the nearest tier)
```
Type `help()` in console for more useful commands.

If you want to get it locally, fork it or download it and add your Vainglory API key to filters.js. Then open index.html in any browser. Register for a key at [developer.vainglorygame.com](https://developer.vainglorygame.com/).

Data is always saved to local storage, so feel free to close the window and reopen it at any time without worrying about losing data.
