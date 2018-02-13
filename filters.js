
var filters = {
        gameMode: "5v5_pvp_casual",
        createdStart: new Date(new Date().setDate(new Date().getDate() - 27)).toISOString(), //This returns the ISO string date from 27 days ago. The max search date range is 28 days.
        patch: "3.0",
        apiKey: "Bearer aaa.bbb.ccc"
}