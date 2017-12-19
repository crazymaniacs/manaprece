export default (req, res) => {
  if (process.env.NODE_ENV === 'development') {
    res.send(`
			<!doctype html>
			<html>
				<head>
          <title>My Universal App</title>
				</head>
        <body>
					<div id="root"></div>
					<script src='bundle.js'></script>
				</body>
			</html>
		`);
  } else if (process.env.NODE_ENV === 'production') {
    res.send(`
			<!doctype html>
			<html>
				<head>
					<title>My Universal App</title>
					<link rel='stylesheet' href='bundle.css'>
				</head>
        <body>
					<div id="root"></div>
					<script src='bundle.js'></script>
				</body>
			</html>
		`);
  }
};
