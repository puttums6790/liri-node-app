//connect to .env file
require("dotenv").config();
//packages & keys
var keys = require("./keys.js");
var fs = require("fs");
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require("request");
var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);
//command choices
switch (process.argv[2]) {
    case "my-tweets":
        twitter();
        break;
    case "spotify-this-song":
        spotifythis();
        break;
    case "movie-this":
        movieThis();
        break;
    case "do-what-it-says":
        doit();
       	break;
}
function twitter() {
    var params = { handle: 'nucodetestjrk', count: 20 };
    client.get('statuses/user_timeline', params, function (error, tweets, response) {
        if (!error) {
            for (var i = 0; i < tweets.length; i++) {
                console.log("Time/Date: " + tweets[i].created_at);
                console.log(tweets[i].text);
            }
        }
    });
}
function spotifythis() {
	//default
    if (process.argv[3] == null) {
        process.argv[3] = 'Ace of Base the Sign';
    }
    spotify.search({ type: 'track', query: process.argv[3], limit: 1 }, function (err, data) {
        if (err) {
            console.log('Error occurred: ' + err);
            return;
        }
        console.log("Artist: " + data.tracks.items[0].artists[0].name);
        console.log("Song Name: " + data.tracks.items[0].name);
        console.log("Preview: " + data.tracks.items[0].external_urls.spotify);
        console.log("Album: " + data.tracks.items[0].album.name);
    });
}
function movieThis() {
	var title = "";
	for (var i = 3; i < process.argv.length; i++) {
		title += process.argv[i] + "+";
	}
	// DEFAULT MR NOBODY CODE
	if (title === "") { 
			title = "Mr. Nobody"; 
		}
	var queryUrl = "http://www.omdbapi.com/?t=" + title + "&y=&plot=short&apikey=trilogy";
	request(queryUrl, function(error, response, body) {
		if (!error) {
		console.log("Title: " + JSON.parse(body).Title);
		console.log("Year: " + JSON.parse(body).Year);
		console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
		// THIS IS WHERE THE ROTTENTOMATOES SCORE SHOULD BE, I COMMENTED OUT THE CODE BECAUSE IT KEPT GIVING ME ERRORS.
		//console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
		console.log("Country: " + JSON.parse(body).Country);
		console.log("Language: " + JSON.parse(body).Language);
		console.log("Plot: " + JSON.parse(body).Plot);
		console.log("Actors: " + JSON.parse(body).Actors);
		}
	});
}
function doit() {
    fs.readFile("random.txt", "utf8", function (error, data) {
        if (error) {
            return console.log(error);
        }
        if (data.split(",")[0] === 'spotify-this-song') {
            process.argv[3] = data.split(",")[1]; spotifythis();
        }
    });
}