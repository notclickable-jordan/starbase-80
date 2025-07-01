import * as path from "path";
import { IndexPage } from "./pages/index";
import { sbReadFile, sbWriteFile } from "./shared/files";
import { PAGEICON, PAGETITLE } from "./variables";

const indexFileInPath = path.join(__dirname, "../", "index.html");
const indexFileOutPath = path.join(__dirname, "../", "./public", "index.html");

async function start(): Promise<void> {
	// Add signal handlers for graceful shutdown during build
	process.on("SIGTERM", () => {
		console.log("Build process received SIGTERM, exiting...");
		process.exit(0);
	});

	process.on("SIGINT", () => {
		console.log("Build process received SIGINT, exiting...");
		process.exit(0);
	});

	const index = await sbReadFile(indexFileInPath);

	const newText = IndexPage({ icon: PAGEICON, title: PAGETITLE });
	const rootDiv = '<div id="root"></div>';
	const rootDivReplacement = '<div id="root">$1</div>';

	const newIndex = index.replace(rootDiv, rootDivReplacement.replace("$1", newText));

	await sbWriteFile(indexFileOutPath, newIndex);
}

start();
