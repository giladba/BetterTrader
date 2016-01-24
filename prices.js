/**
 * Created by giladba on 1/2/2016.
 */
module.exports = function(id, time, bid, ask) {
    return {
        id    : id,
        time : time,
        bid  : bid,
        ask  : ask,
        asString : function() {
            return    "ID \t\t\t: " + id + "\n"
                    + "time \t\t: " + time + "\n"
                    + "ask \t\t: " + ask + "\n"
                    + "bid \t: " + bid + "\n";
        }
    }
};
