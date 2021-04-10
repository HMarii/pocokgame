<?php

	session_start();
	if(!isset($_SESSION['email'])) {
		header('location:login.php');
	}
	$name = strchr($_SESSION['email'], "@", true); /*A @ előtti karakterek kiszedése */



?>


<!DOCTYPE html>
<html>
<head>
	<title>Pöcöksweeper</title>
	<meta http-equiv="Cache-control" content="no-cache">
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
	<link rel="stylesheet" type="text/css" href="style.css">
	<script type="text/javascript" src="script.js"></script>
</head>
<body>
		<h1>Pöcökkereső</h1>
		<div class="clearfix">
		<a class="float-right" href="logout.php">Kilépés</a>
		<p class="float-left">Üdv, <?php echo "Bejelentkezve, mint:" $name; ?></p>
		</div>
		<p id="score"></p>
			<div class="centerize">
				<button id="startbtn">Mehet</button>
			</div>
			
		<div id="grid" class="grid">
		</div>
</body>
</html>