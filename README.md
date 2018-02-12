# Vainglory Hero Counter Data

## What is this
This is a webapp that uses the Vainglory API to search Vainglory matches and retrieve data about hero matchups. It looks at ranked matches from patch 2.12 (which can be changed in filters.js).

## Try it out
Try it at [zeroclutch.github.io/vainglory-counter-data](https://zeroclutch.github.io/vainglory-counter-data/).

If you have a [Vainglory API key](https://developer.vainglorygame.com/), you can search more matches to get additional data. Open the Javascript console and enter:
```js
filters.apiKey = 'Bearer YourAPIKey'
```
If you want to restart the search with your own filters, enter this in console:
```js
filters.gameMode = "ranked"; /*try casual, ranked, casual_aral, blitz_pvp_ranked, 5v5_pvp_casual*/
filters.patch = "2.12";
filters.apiKey = "Bearer YourAPIKey"; /*to get an API key, see above*/
restartSearch();
```

Type `help()` in console for more useful commands.

If you want to get it locally, fork it or download it and add your Vainglory API key to filters.js. Then open index.html in any browser. Register for a key at [developer.vainglorygame.com](https://developer.vainglorygame.com/).

Data is always saved to local storage, so feel free to close the window and reopen it at any time without worrying about losing data.