/**
 * Created by giladba on 1/2/2016.
 */
module.exports = function(instrument, displayName, pip, maxTradeUnits) {
  return {
    instrument    : instrument,
    displayName   : displayName,
    pip  : pip,
    maxTradeUnits  : maxTradeUnits,
    asString : function() {
      return    "instrument \t\t\t: " + instrument + "\n"
        + "displayName \t\t: " + displayName + "\n"
        + "pip \t\t: " + pip + "\n"
        + "maxTradeUnits \t: " + maxTradeUnits + "\n";
    }
  }
};
