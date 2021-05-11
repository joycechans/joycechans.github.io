// FUNCTION: Arrays for the activities category
$(document).ready(function() {
 	// list of movies
    var movie = [
		"1917",
		"6 Underground",
		"A Beautiful Mind",
		"A Quiet Place",
		"About Time",
		"Baby Driver",
		"Bad Genius",
		"Beautiful Boy",
		"Big Hero 6",
		"Bird Box",
		"Bohemian Rhapsody",
		"Brooklyn",
		"Brother of the Year",
		"Burlesque",
		"Cinema Paradiso",
		"Coco",
		"Crazy Rich Asians",
		"Dead Poets Society",
		"Death Becomes Her",
		"Django Unchained",
		"Dunkirk",
		"Fight Club",
		"Get Out",
		"Gone Girl",
		"Good Will Hunting",
		"Green Book",
		"Her",
		"Inception",
		"Inglorious Basterds",
		"Jojo Rabbit",
		"Joker",
		"Knives Out",
		"La La Land",
		"Les Misérable",
		"Mad Max Fury Road",
		"Memento",
		"Miss Congeniality",
		"Nottinghill",
		"One Day",
		"Parasite",
		"Pretty Woman",
		"Pulp Fiction",
		"Raya",
		"Taken",
		"The Blind Side",
		"The Firm",
		"The Grand Budapest Hotel",
		"The Invisible Guest",
		"The Lovebirds",
		"The Matrix",
		"The Notebook",
		"The Theory of Everything",
		"War Horse",
		"When Harry Met Sally",
		"Wonder",
		"Zootopia",
	];
	// list of online games
	var game = [
		"Among Us",
		"Club Penguin",
		"Skribbl.io",
		"Solitaire",
		"Codenames",
		"UNO",
		"Monopoly",
		"Jackbox",
		"Gravity Guys",
		"Fire Boy Ice Girl",
		"Moshi Monsters",
		"Poptropica",
		"Mahjong",
		"Cards Against Humanity",
		"Pokemon Go",
		"Houseparty",
		"Secret Hitler",
		"Spyfall",
		"Werewolf Telegram",
		"Psych",
		"Scrabble",
		"Trivia Night",
		"Game Pigeon",
		"Animal Crossing",
		"Mario Kart Tour",
		"Mario Party",
		"Word With Friends",
		"Draw Something",
		"8 Ball Pool",
		"Catan",
		"Scattergories",
		"Chess.com",
		"Head's Up",
		"Stay the Fuck Inside",
		"Picolo",
		"Keep Talking and Nobody Explodes",
		"Virtual Escape Room",
	];
	// list of exercises
	var exercise = [
		"15 crunches",
		"20 crunches",
		"30 crunches",
		"10 push ups",
		"15 push ups",
		"20 push ups",
		"15 squats",
		"20 squats",
		"25 squats",
		"20 jumping jacks",
		"25 jumping jacks",
		"30 jumping jacks",
		"20 lunges",
		"30 lunges",
		"20 sec plank",
		"30 sec plank",
		"40 sec plank",
		"50 sec plank",
		"60 sec plank",
		"40 sec side plank",
		"50 sec side plank",
		"60 sec side plank",
		"10 leg raises",
		"15 leg raises",
		"20 leg raises",
		"10 tricep dips",
		"15 tricep dips",
		"20 tricep dips",
		"15 bridges",
		"20 bridges",
		"25 bridges",
		"30 arm circles",
		"40 arm circles",
		"20 burpees",
		"30 burpees",
		"40 burpees",
		"50 burpees",
	];
	// number of days
	var day = [
		"1",
		"2",
		"3",
		"4",
		"5",
		"6",
		"7",
		"8",
		"9",
		"10",
		"11",
		"12",
		"13",
		"14",
		"15",
		"16",
		"17",
		"18",
		"19",
		"20",
		"21",
		"22",
		"23",
		"24",
		"25",
		"26",
		"27",
		"28",
		"29",
		"30",
		"31",
	]
	// FUNCTION: generate random combo

	// this function randomizes
	function select_random(x) {
		y = x[Math.floor(Math.random() * x.length)];
		return y;
	}
   // this function generates the table rows
	function generateTableRow(...entries) {
		const row = entries.map((entry) => {
			 // for each row, create the td element in the document and put the text inside it
			const td = document.createElement('td');
			td.textContent = entry;
			return td;
		});
		// create the tr element and display it in the html
		const tr = document.createElement('tr');
		tr.append(...row);
		return tr;
	}

	// this function shuffles all the arrays and that it randomizes without having any repeats. if there is a repeated array, it randomizes for a new one.
	function shuffleArray(array) {
		const newArray = array.map(i => i);
		for (let i = newArray.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[newArray[i], newArray[j]] = [newArray[j], newArray[i]];
		}
		return newArray;
	}
	// input value button
	// let result = document.querySelector("#result");
	let showDownloadbtn = document.getElementById("download-btn");
	document.getElementById('go').addEventListener('click', () => {
		// check for validity which doesn't allow the user to go past the value 31
		if (!document.getElementById('input').checkValidity()) return;
		// this clears any previous table results displayed
		clearTable(document.getElementById('activities'));
		// let the input value equal the number of days
		const numberOfDays = Number(document.getElementById('input').value);
		// randomize without repeats the movie array
		const randomizedMovies = shuffleArray(movie);
		// randomize without repeats the game array
		const randomizedGames = shuffleArray(game);
		// randomize without repeats the exercise array
		const randomizedExercises = shuffleArray(exercise);
		// create a table header for the different columns
		const tableHeader = generateTableHeader('Day', 'Movie', 'Game', 'Exercise');
		// create table rows for each array based on the number of days
		const tableRows = [...Array(numberOfDays).keys()].map((i) => generateTableRow(i + 1, randomizedMovies[i], randomizedGames[i], randomizedExercises[i]));
		// display these activties on the table header and table rows to the html
		document.getElementById('activities').append(tableHeader, ...tableRows);
		// show your activities for x amount of days in quarantine
		result.innerText = "Your activities for " + numberOfDays + " days in quarantine:"
		// display the download print button
		showDownloadbtn.style.display = "block";
		// when clicking the download button, it prints everything within the div with the content id
		showDownloadbtn.onclick = () => {
			printContent(document.getElementById('content'));
		};
	});
	// creating the table header and a function for clearing the table:
	// make the table header
	function generateTableHeader(...titles) {
		const header = titles.map((title) => {
			// create the th element onto the doc
			const th = document.createElement('th');
			// make them into columns
			th.setAttribute('scope', 'col');
			// within the header text are the titles
			th.textContent = title;
			return th;
		});
		// create the table rows element and append to html
		const tr = document.createElement('tr');
		tr.append(...header);
		return tr;
	}
	// this clears the table for any previous results and removes any child table
	function clearTable(table) {
		while (table.childNodes.length > 0) {
			table.removeChild(table.firstChild);
		}
	}
	// function for printing
	function printContent(...contents) {
		const clonedContents = contents.map((i) => i.cloneNode(true));
		// contents is everything you want to be printed
		contents.forEach((i) => i.style.display = 'none');
		console.log(clonedContents);
		// paper equals the div created in the document
		const paper = document.createElement('div');
    	// takes the class name print container
		paper.className = 'print-container';
   		// append all the cloned contents
		paper.append(...clonedContents);
		document.body.insertBefore(paper, document.body.firstChild);
		// print the window but remove that isn't included in the div you want
		window.print();
		paper.remove();
		contents.forEach((i) => i.style.display = '');
	}
});

// print button printing only a specific section not the whole window
var prtContent = document.getElementById("download=btn");
