import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const hostname = "127.0.0.1";
const port = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const server = createServer(async (req, res) => {
	try {
		const url = new URL(req.url ?? "/", `http://${req.headers.host}`);

		if (url.pathname === "/") {
			const filePath = path.join(__dirname, "index.html");
			const html = await readFile(filePath, "utf8");

			res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
			res.end(html);
			return;
		}

		res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
		res.end("Not found");
	} catch (err) {
		console.error(err);
		res.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
		res.end("Internal server error");
	}
});

server.listen(port, hostname, () => {
	console.log(`Server running at http://${hostname}:${port}/`);
});
