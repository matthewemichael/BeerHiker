import axios from "axios";
export default {
    getBreweries: function(state, city, name, type) {
      return axios.get("https://api.openbrewerydb.org/breweries?by_name="+name+"&by_state="+state+"&by_city="+city+"&by_type=" + type);
    },
    saveSearch: function(searchData, id) {
      return axios.put("/api/searches/"+id, searchData);
    },
    getSearchData: function(id) {
      return axios.get("api/searches/"+id);
    },
    saveResults: function(id, resultData) {
      return axios.put("api/maps/"+id, resultData);
    },
    saveFavorites: function(id, favoriteData) {
      return axios.put("api/saved/"+id, favoriteData);
    }
    

  };