import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.get("/", (_req, res) => {
	res.sendFile("/pages/index.html", { root: __dirname });
});

app.get("/about", (_req, res) => {
	res.sendFile("/pages/about.html", { root: __dirname });
});

app.get("/contact-me", (_req, res) => {
	res.sendFile("/pages/contact-me.html", { root: __dirname });
});

app.get("/assets/nodeLogo.svg", (_req, res) => {
	res.sendFile("/assets/nodeLogo.svg", { root: __dirname });
});

app.use((_req, res) => {
	res.sendFile("/pages/404.html", { root: __dirname });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
	console.log("Server is running on http://localhost:3000");
});
