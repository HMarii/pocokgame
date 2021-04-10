// Akkor fut le, ha a doksi betöltődött
document.addEventListener('DOMContentLoaded', () => {
	const grid = document.querySelector('.grid');
	document.getElementById("grid").style.display = "none";
	let width = 10;
	let bombAmount = 20;
	let flags = 0;
	let squares = [];
	let isGameOver = false;
	let isCreated = false;
	
	let startBtn = document.getElementById("startbtn");


	//var img = document.createElement("img");
	//img.src = "banan.png";
	// Pálya (Board)
	function createBoard() {
		// Bombák tömbbe
		const bombsArray = Array(bombAmount).fill('bomb');
		// Üres négyzetek (Négyzetek- Bombák)
		const emptyArray = Array(width*width - bombAmount).fill('valid');
		// Üres négyzetek+ Bombás négyzetek
		const gameArray = emptyArray.concat(bombsArray);
		// Bombák randomizálása a tömbben, hogy ne legyen unalmas
		const shuffledArray = gameArray.sort(() => Math.random() -0.5);
		



		// Végigmegyünk a táblán, a táblát feltöltjük négyzetekkel 
		//(Az index lesz az id-jük) (100) és az összes négyzetet berakjuk egy tömbbe
		for(let i = 0; i < width*width; i++) {
			const square = document.createElement('div');
			square.setAttribute('id', i);
			square.classList.add(shuffledArray[i]);
			grid.appendChild(square);
			squares.push(square);


			// Normál klikk
			square.addEventListener('click', function(e) {
				click(square);
			})

			// ctrl és bal klikk
			square.oncontextmenu = function(e) {
				e.preventDefault();
				addFlag(square);
			}
		}
		// Számok
		for(let i = 0; i < squares.length; i++) {
			let total = 0;
			const isLeftEdge = (i % width === 0);
			const isRightEdge = (i % width === -1);

			if(squares[i].classList.contains('valid')) { // Ha nem banán
				if(i > 0 && !isLeftEdge && squares[i - 1].classList.contains('bomb'))total++; // Bal oldalt
				if(i > 9 && !isRightEdge && squares[i +1 -width].classList.contains('bomb')) total++; // DNY
				if(i > 10 && squares[i -width].classList.contains('bomb')) total ++; // Fölötte
				if(i > 11 && !isLeftEdge && squares[i - 1-width].classList.contains('bomb')) total++;	
				if(i < 98 && !isRightEdge && squares[i +1].classList.contains('bomb'))total++; // Jobbra
				if(i < 90 && !isLeftEdge && squares[i - 1 +width].classList.contains('bomb')) total++ ;//ÉK	
				if(i < 88 && !isRightEdge && squares[i + 1 + width].classList.contains('bomb')) total++;
				if(i < 89 && squares[i + width].classList.contains('bomb')) total++; // Alatta	
					squares[i].setAttribute('data', total);
					console.log(squares[i]);
			} 

		}

	}
	// Start game
	startbtn.addEventListener("click", function() {
		if(isCreated) {
			return;
		} else {
			document.getElementById("startbtn").style.display = "none";
			document.getElementById("grid").style.display = "flex";
			createBoard();
			isCreated = true;
		}

	});

	// Zászló jelölés jobb klikkel
	function addFlag(square) {
		if(isGameOver) return;
		if(!square.classList.contains('checked') && (flags < bombAmount)) {
			if(!square.classList.contains('flag')) {
				square.classList.add('flag');
				square.innerHTML = "<img src=jager.png>"; // Zászló emoji
				flags++;
				checkForWin();
			} else {
				square.classList.remove('flag');
				square.innerHTML = "";
				flags--;

			}
		}

	}

	//Négyzetre klikkelés
	function click(square) {
		let currentId = square.id;
		if(isGameOver) return;
		if(square.classList.contains('checked') || square.classList.contains('flag')) return
		// Ha bombára kattint
		if(square.classList.contains('bomb')) {
			gameOver(square);
		} else {
			let total = square.getAttribute('data');
			// Ha bomba van körülötte
			if (total != 0) {
				square.classList.add('checked');
				square.innerHTML = "<b>"+total+"</b>"; // Beleírjuk a négyzetbe mennyi
				return;
			}
			checkSquare(square, currentId);
			
		}
		square.classList.add('checked');
	}


	//Szomszédos négyzetek vizsgálata, ha négyzetre klikkelt
	function checkSquare(square, currentId) {
		const isLeftEdge = (currentId % width === 0);
		const isRightEdge = (currentId % width === width -1);

		setTimeout(() => {
			if(currentId > 0 && !isLeftEdge) {
				const newId = squares[parseInt(currentId) - 1].id;
				const newSquare = document.getElementById(newId);
				click(newSquare);
			}

			if(currentId > 9 && !isLeftEdge) {
				const newId = squares[parseInt(currentId) + 1 - width].id;
				const newSquare = document.getElementById(newId);
				click(newSquare);
			}

			if(currentId > 10) {
				const newId = squares[parseInt(currentId - width)].id;
				const newSquare = document.getElementById(newId);
				click(newSquare);
			}

			if(currentId > 11 && !isLeftEdge) {
				const newId = squares[parseInt(currentId) - 1 - width].id;
				const newSquare = document.getElementById(newId);
				click(newSquare);
			}

			if(currentId < 98 && !isRightEdge) {
				const newId= squares[parseInt(currentId) + 1].id;
				const newSquare = document.getElementById(newId);
				click(newSquare);
			}

			if(currentId < 90 && !isLeftEdge) {
				const newId = squares[parseInt(currentId) - 1 + width].id;
				const newSquare = document.getElementById(newId);
				click(newSquare);
			}

			if(currentId < 88 && !isRightEdge) {
				const newId = squares[parseInt(currentId) + 1 + width].id;
				const newSquare = document.getElementById(newId);
				click(newSquare);
			}

			if(currentId < 89) {
				const newId = squares[parseInt(currentId) + width].id;
				const newSquare = document.getElementById(newId);
				click(newSquare);
			}
		}, 10)
	}

	// Játék vége

	function gameOver(square) {
		alert("A pöcök megtalált!")
		isGameOver = true;
		//Mutasd az összes banánt, ha a játékos vesztett
		squares.forEach(square => {
			if(square.classList.contains('bomb')) {
				//src.appendChild(img); // Banán emoji
				square.innerHTML = "<img src=pocok.png>";
				addReset();
			}
		})
	}

	// Ha nyert 
	function checkForWin() {
		let matches = 0;
		for(let i = 0; i < squares.length; i++) {
			// Ha zászlót tett a bombára
			if(squares[i].classList.contains('flag') && squares[i].classList.contains('bomb')) {
				matches++;
			}
			// Ha az összes bomba zászlós
			if( matches === bombAmount) {
				alert('Nyertél! A pöcökek gratulálnak.');
			}
		}
	}


	function addReset() {
		startBtn.classList.add("centerize");
		startBtn.style.display = "inline";
		startBtn.innerHTML = "Újra";
		startBtn.addEventListener("click", function() {
			location.reload();
		})
	}



})

