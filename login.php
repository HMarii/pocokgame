<!DOCTYPE html>
<html>
<head>
	<title>Bejelentkezés & Regisztráció</title>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
	<style type="text/css">
		body {
			background: linear-gradient(rgba(0, 0, 50, 0.5),rgba(0, 0, 50, 0.5)),url(registrationbg2.jpg);
			background-size: cover;
			background-position: center;
		}

		.login-box {
			max-width: 700px;
			float: none;
			margin: 150px auto;
		}

		.login-left {
			background-color: #FFF;
			padding: 30px;
		}
		.login-right {
			background:rgba(211, 211, 211, 0.2);
			padding: 30px;
		}

		.form-control {
			background-color: transparent !important;
		}
	</style>
</head>
<body>
	<div class="container">
		<div class="login-box">
		<div class="row">
			<div class="col-md-6 login-left">
				<h2 class="text-warning">Jelentkezz be</h2>
				<form action="validation.php" method="post">
					<div class="form-group">
						<label class="text-info">Email cím</label>
						<input type="email" name="email" class="form-control" required>
					</div>
					<div class="form-group">
						<label class="text-info">Jelszó</label>
						<input type="password" name="password" class="form-control" required>
					</div>
					<button type="submit" class="btn btn-primary">Belépés</button>
				</form>
			</div>

			<div class="col-md-6 login-right">
				<h2 class="text-success">Regisztrálj</h2>
				<form action="registration.php" method="post">
					<div class="form-group">
						<label class="text-info">Email cím</label>
						<input type="email" name="email" class="form-control" required>
					</div>
					<div class="form-group">
						<label class="text-info">Jelszó</label>
						<input type="password" name="password" class="form-control" required>
					</div>
					<button type="submit" class="btn btn-success">Regisztráció</button>
				</form>
			</div>
		</div>
	</div>
	</div>

</body>
</html>