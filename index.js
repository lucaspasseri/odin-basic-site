import http from "node:http";
import * as fs from "node:fs/promises";

const pagesDir = "./pages/";
const opt = { encoding: "utf8" };

const style = `<style> 
			html {min-height: 100vh}
			header{ background-color: black; color: white; padding: 2em} 
			body { height: 100%; margin: 0; background-color: white; color: black; display: flex; flex-direction: column}  
			h1 {color:white;} 
			main {padding: 2em; display: flex; justify-content: center; align-items:center; flex: 1 } 
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

			default:
				res.statusCode = 404;
				filePath = pagesDir + "404.html";
				break;
		}

		const page = await fs.readFile(filePath, opt);

		res.setHeader("Content-Type", "text/html");
		res.write(style);
		res.end(page);
	} catch (err) {
		console.error(err);
		res.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
		res.end("500 - Internal Server Error");
	}
});

const host = "127.0.0.1";
const port = 3000;

server.listen(port, host, () => {
	console.log(`Listen for request on http://${host}:${port}`);
});
