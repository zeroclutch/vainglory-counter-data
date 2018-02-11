// Distributed under CC-BY 4.0
// https://creativecommons.org/licenses/by/4.0/
// Made by P G
//
// All functions return fail, even in success.
var vgAPI = {
    //Determines if the data returned should be the full object (including error codes) or the pure data returned from the server
    autoParseJSON: true,
    key: "Bearer aaa.bbb.ccc", //Developer Key

    /** Parameters allowed: 
     * url  - The URL of the server to contact
     * done - Success function which must be: function( data ){parameters.done(data);}
     */
    retrieve: function (parameters) {
        $.ajax({
            type: "GET"
            , url: parameters.url
            , dataType: "application/vnd.api+json"
            , headers: {
                "Authorization": vgAPI.key
                , "X-TITLE-ID": "semc-vainglory"
                , "Accept": "application/vnd.api+json"
            }
        }).done(function (data) {}).fail(function (data) {
            data = (vgAPI.autoParseJSON ? jQuery.parseJSON(data.responseText) : null);
            parameters.done ? parameters.done(data) : null; // First time code is iterated, parameters.done does not exist yet. There's probably a better way to do this, but idc it works ok
        })
    }, //Special retrieve function with extra parameters for match sorting
    //*Be sure to test once functionality is implemented
    /** Parameters allowed: 
     * pageOffset           - Allows paging over results
     * pageLimit            - The default (and current maximum) is 50. Values less than 50 and great than 2 are supported.
     * sort 	               - By default, Matches are sorted by creation time ascending.
     * filterCreatedAtStart - Must occur before end time. Format is iso8601 e.g. 2017-01-01T08:25:30Z
     * filterCreatedAtEnd]  - Queries search the last 3 hrs. Format is iso8601 e.g. 2017-01-01T13:25:30Z
     * filterPlayerNames	   - Filters by player name. e.g. player1,player2,…
     * filterteamnames       - Filters by team names. 
     * filterGameMode       - Filters by team names. 
     * done                 - Success function; done: function( data ) {...}
     */
    retrieveMatches: function (parameters) {
        $.ajax({
            type: "OPTIONS"
            , url: "https://api.dc01.gamelockerapp.com/status"
            , dataType: "application/vnd.api+json"
        , }).done(function (data) {}).fail(function (data) {
            vgAPI.retrieve({
                //There is probably a better way to do this.
                url: "https://api.dc01.gamelockerapp.com/shards/na/matches" + "?sort=createdAt" + (parameters.pageOffset ? "&page[offset]=" + parameters.pageOffset : "") + //will change to page[offset] later
                    (parameters.pageLimit ? "&page[limit]=" + parameters.pageLimit : "") + (parameters.sort ? "&sort=" + parameters.sort : "") + (parameters.filterCreatedAtStart ? "&filter[createdAt-start]=" + parameters.filterCreatedAtStart : "") + (parameters.filterCreatedAtEnd ? "&filter[createdAt-end]=" + parameters.filterCreatedAtEnd : "") + (parameters.filterPlayerNames ? "&filter[playerNames]=" + parameters.filterPlayerNames : "") + (parameters.filterteamnames ? "&filter[teamNames]=" + parameters.filterteamnames : "") + (parameters.filterteamnames ? "&filter[gameMode]=" + parameters.filterGameMode : "")
                , done: function (data) {
                    parameters.done ? parameters.done(data) : null;
                    /*console.log("https://api.dc01.gamelockerapp.com/shards/na/matches" + "?data" + (parameters.pageOffset ? "&page[offset]=" + parameters.pageOffset : "") + //will change to page[offset] later
                    (parameters.pageLimit ? "&page[limit]=" + parameters.pageLimit : "") + (parameters.sort ? "&sort=" + parameters.sort : "") + (parameters.filterCreatedAtStart ? "&filter[createdAt-start]=" + parameters.filterCreatedAtStart : "") + (parameters.filterCreatedAtEnd ? "&filter[createdAt-end]=" + parameters.filterCreatedAtEnd : "") + (parameters.filterPlayerNames ? "&filter[playerNames]=" + parameters.filterPlayerNames : "") + (parameters.filterteamnames ? "&filter[teamNames]=" + parameters.filterteamnames : "") + (parameters.filterteamnames ? "&filter[gameMode]=" + parameters.filterGameMode : ""));*/
                }
            });
        })
    }, //Retrieves basic player info
    /** Parameters allowed: 
     * id   - The ID number of the player
     * done - Success function; done: function( data ) {...}
     */
    getPlayerInfo: function (parameters) {
        vgAPI.retrieve({
            url: "https://api.dc01.gamelockerapp.com/shards/na/players/" + parameters.id
            , done: function (data) {
                parameters.done(data);
            }
        })
    }, //This is basically an alias function for retrieveMatches
    /** Parameters allowed: 
     * pageOffset           - Allows paging over results
     * pageLimit            - The default (and current maximum) is 50. Values less than 50 and great than 2 are supported.
     * sort 	               - By default, Matches are sorted by creation time ascending.
     * filterCreatedAtStart - Must occur before end time. Format is iso8601 e.g. 2017-01-01T08:25:30Z
     * filterCreatedAtEnd  - Queries search the last 3 hrs. Format is iso8601 e.g. 2017-01-01T13:25:30Z
     * filterPlayerNames	   - Filters by player name. e.g. player1,player2,…
     * filterteamnames       - Filters by team names. 
     * filterGameMode       - Filters by team names. 
     * done                 - Success function; done: function( data ) {...}
     */
    getMatchList: function (parameters) {
        vgAPI.retrieveMatches({
            pageOffset: parameters.pageOffset
            , pageLimit: parameters.pageLimit
            , sort: parameters.sort
            , filterCreatedAtStart: parameters.filterCreatedAtStart
            , filterCreatedAtEnd: parameters.filterCreatedAtEnd
            , filterPlayerNames: parameters.filterPlayerNames
            , filterteamnames: parameters.filterteamnames
            , filterGameMode: parameters.filterGameMode
            , done: parameters.done
        })
    }, //Returns the data of a single match
    /** Parameters allowed: 
     * id   - The ID number of the match
     * done - Success function; done: function( data ) {...}
     */
    getMatchInfo: function (parameters) {
        vgAPI.retrieve({
            url: "https://api.dc01.gamelockerapp.com/shards/na/matches/" + parameters.id
            , done: function (data) {
                parameters.done(data);
            }
        })
    }, //Returns the data of a list of teams (as of 1-15-16, no filters, they likely will be added)
    /** Parameters allowed: 
     * done - Success function; done: function( data ) {...}
     */
    getTeamList: function (parameters) {
        vgAPI.retrieve({
            url: "https://api.dc01.gamelockerapp.com/shards/na/teams/" + parameters.id
            , done: function (data) {
                parameters.done(data);
            }
        })
    }
    , getTeamList: function (parameters) {
        vgAPI.retrieve({
            url: "https://api.dc01.gamelockerapp.com/shards/na/teams/" + parameters.id
            , done: function (data) {
                parameters.done(data);
            }
        })
    }

        //Returns a list of characters used in a specific time frame. Returns an array.
        /** Parameters allowed: 
     * pageOffset           - Allows paging over results
     * pageLimit            - The default (and current maximum) is 50. Values less than 50 and great than 2 are supported.
     * sort 	               - By default, Matches are sorted by creation time ascending.
     * filterCreatedAtStart - Must occur before end time. Format is iso8601 e.g. 2017-01-01T08:25:30Z
     * filterCreatedAtEnd]  - Queries search the last 3 hrs. Format is iso8601 e.g. 2017-01-01T13:25:30Z
     * filterPlayerNames	   - Filters by player name. e.g. player1,player2,…
     * filterteamnames       - Filters by team names. 
     * done                 - Success function; done: function( data ) {...}
     */
    , getActorList: function (parameters) {
        vgAPI.retrieveMatches({
            pageOffset: parameters.pageOffset
            , pageLimit: parameters.pageLimit
            , sort: parameters.sort
            , filterCreatedAtStart: parameters.filterCreatedAtStart
            , filterCreatedAtEnd: parameters.filterCreatedAtEnd
            , filterPlayerNames: parameters.filterPlayerNames
            , filterteamnames: parameters.filterteamnames
            , done: function (data) {
                var items = [];
                $.each(data.included, function (key, val) {
                    var actor = val.attributes.actor;
                    if (actor == "*Sayoc*") {
                        items.push("Taka");
                    } else if (actor == "*Hero009*") {
                        items.push("Krul");
                    } else if (actor == "*Hero010*") {
                        items.push("Skaarf");
                    } else if (actor == "*Hero016*") {
                        items.push("Rona");
                    } else if (actor) {
                        items.push(actor.replace(/\*/g,""))
                    }
                })
                data = items;
                parameters.done( data );
            }
        });
    }
}