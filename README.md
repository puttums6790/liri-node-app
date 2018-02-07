# liri-node-app

This is a app which uses node to complete the following commands:

node liri.js my-tweets

	this will display up to your last 20 tweets

	You can edit the twitter handle on line 27

node liri.js spotify-this-song '<song name here>'

		this will show the following info:

			Artist(s)
			The song's name
			A preview link of the song from Spotify
			The album that the song is from

node liri.js movie-this '<movie name here>'

	This will output the following information to your terminal/bash window:

   * Title of the movie.
   * Year the movie came out.
   * IMDB Rating of the movie.
   * Rotten Tomatoes Rating of the movie.
   * Country where the movie was produced.
   * Language of the movie.
   * Plot of the movie.
   * Actors in the movie.

 node liri.js do-what-it-says
	 Using the fs Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.