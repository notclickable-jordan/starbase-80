import * as fs from "fs/promises";
import * as path from "path";
import { IndexPage } from "./pages/index";
import { PAGEICON, PAGETITLE } from "./variables";

const indexFilePath = path.join(__dirname, "../", "index.html");

async function writeIndexPage(contents: string): Promise<boolean> {
	return new Promise(async (resolve, reject) => {
		try {
			await fs.writeFile(indexFilePath, contents);
			return resolve(true);
		} catch (exception) {
			console.error("Could not write index.html file");
			reject(exception);
		}
	});
}

async function readIndexPage(): Promise<string> {
	return new Promise(async (resolve, reject) => {
		try {
			const index = await fs.readFile(indexFilePath);

			return resolve(index.toString());
		} catch (exception) {
			console.error("Could not read index.html file");
			reject(exception);
		}
	});
}

async function start(): Promise<void> {
	const index = await readIndexPage();

	const newText = IndexPage({ icon: PAGEICON, title: PAGETITLE });
	const rootDiv = '<div id="root"></div>';
	const rootDivReplacement = '<div id="root">$1</div>';

	const newIndex = index.replace(rootDiv, rootDivReplacement.replace("$1", newText));

	await writeIndexPage(newIndex);
}

start();
