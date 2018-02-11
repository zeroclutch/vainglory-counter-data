function help(){
    console.log("Hello there!\n----------\n\nSome useful commands:\n\n\
****************************************\n\
*TO BEGIN SEARCHING, enter filters.apiKey = 'Bearer YourAPIKey'. You'll need to register for an API key at developer.vainglorygame.com.\n\
****************************************\n\n\
*IGNs.indexOf('YourIGN') [If this returns -1, your IGN hasn't been indexed yet. If it returns a number, then that means your IGN has been indexed, or is in queue]\n\
*IGNs[ignIndex+1] = 'myIgn' [Add your IGN to next in the queue]\n\
*output [See the data as a JS object in the console. You can also stringify this with JSON.stringify(output)]\n\
*getWeakestCounter('Alpha') [Find the weakest matchup against Alpha]\n\
*getStrongestCounter('Rona') [Find the best counter to Rona]\n\
Type 'help()' to see this anytime.")
};

help();