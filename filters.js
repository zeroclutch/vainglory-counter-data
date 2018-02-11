vgAPI.key = "Bearer aaa.bbb.ccc";
var filters = {
        gameMode: "ranked",
        createdStart: new Date(new Date().setDate(new Date().getDate() - 27)).toISOString(), //This returns the ISO string date from 27 days ago. The max search date range is 28 days.
        patch: "2.12"
}