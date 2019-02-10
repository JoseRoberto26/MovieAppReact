var axios = require('axios');
const apiKey = '5a240d5ac38592ee034f80a46ddeadbd';

module.exports = {
    getPopularMovies: function(){
        var encodedURI = window.encodeURI('https://api.themoviedb.org/3/movie/popular?api_key='+apiKey+'&language=pt-BR');

        return axios.get(encodedURI).then(function(response){
            return response.data.results;
        })
    },

    getMovies: function (query) {
        var encodedURI = window.encodeURI('https://api.themoviedb.org/3/search/movie?api_key='+apiKey+'&language=pt-BR&query='+query);

        return axios.get(encodedURI).then(function (response) {
            return response.data.results;
        })
    }
}