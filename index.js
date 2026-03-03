import http from "node:http";
import * as fs from "node:fs/promises";

const pagesDir = "./pages/";
const opt = { encoding: "utf8" };

const style = `<style> 
			html {min-height: 100vh}
			header{ background-color: black; color: white; padding: 1.5em} 
			nav {
				display: flex; flex-wrap: wrap; justify-content: space-between;
			 	align-items: center; gap: 2em;			 
			 }
			.logo {
				width: 200px;
				height: auto;
			}

			ul {
				display: flex;
				list-style: none;
				gap: 1.5em;
				font-size: 1.5em;
				padding: 0;

				a {
					text-decoration: none;
					color: white;

					&:hover {
					text-decoration: underline}
				}
			}
			body { height: 100%; margin: 0; background-color: white; color: black; display: flex;
				flex-direction: column
			}  
			h1 { color:white;} 
			main { padding: 1.5em; display: flex; justify-content: center; align-items:center; flex: 1;
				font-size: 3em; font-weight: bold;
			} 
			@media (max-width: 500px) {
				nav {
					justify-content: center;
				}
			}
		</style>`;

const server = http.createServer(async (req, res) => {
	try {
		let filePath = "";

		switch (req.url) {
			case "/":
				res.statusCode = 200;
				filePath = pagesDir + "index.html";
				break;

			case "/about":
				res.statusCode = 200;
				filePath = pagesDir + "about.html";
				break;

			case "/contact-me":
				res.statusCode = 200;
				filePath = pagesDir + "contact-me.html";
				break;

			case "/assets/nodeLogo.svg":
				res.statusCode = 200;
				filePath = "./assets/nodeLogo.svg";
				break;

			default:
				res.statusCode = 404;
				filePath = pagesDir + "404.html";
				break;
		}

		const file = await fs.readFile(filePath, opt);

		if (filePath === "./assets/nodeLogo.svg") {
			res.setHeader("Content-Type", "image/svg+xml");
			res.end(file);
			return;
		}

		res.setHeader("Content-Type", "text/html");
		res.write(style);
		res.end(file);
	} catch (err) {
		console.error(err);
		res.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
		res.end("500 - Internal Server Error");
	}
});

const host = "0.0.0.0";
const port = process.env.PORT ?? 3000;

server.listen(port, host, () => {
	console.log(`Listen for request on http://${host}:${port}`);
});
