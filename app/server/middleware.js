export default (req, res) => {
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
};
