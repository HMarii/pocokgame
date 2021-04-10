<?php
	session_start();
	header('Content-Type: text/html; charset=utf-8');
	header('location:login.php');

	$con = mysqli_connect('localhost', 'root', 'erike600');
	$db = "members";
	mysqli_select_db($con, $db);

	$email = $_POST['email'];
	$pass = $_POST['password'];
	$name = $_POST['name'];
	$age = $_POST['age'];
	$city = $_POST['city'];
	$haspet = $_POST['haspet'];

	$s = 'SELECT * FROM accounts WHERE email = "$email"';

	$result = mysqli_query($con, $s);

	$num = mysqli_num_rows($result);

	if($num == 1) {
		echo "Ez az email már foglalt!";
	} else {
		$reg = "insert into accounts(email, password, name, age, city, haspet) VALUES ('$email', '$pass', '$name', '$age', '$city', '$haspet')";
		mysqli_query($con, $reg);
		echo "Sikeres regisztráció!";
	}
?>