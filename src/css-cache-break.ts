import CleanCSS from "clean-css";
import * as path from "path";
import { sbMakeFolder, sbReadFile, sbRemoveAllCSS, sbWriteFile } from "./shared/files";

const mainCSSFilename = `main.${new Date().getTime()}.css`;

const cssFilePath = path.join(__dirname, "../public/css");
const cssFileInPath = path.join(__dirname, "../public", "main.css");
const cssFileOutPath = path.join(cssFilePath, mainCSSFilename);
const indexFileInOutPath = path.join(__dirname, "../public", "index.html");

async function start(): Promise<void> {
	await sbRemoveAllCSS(cssFilePath);
	await sbMakeFolder(cssFilePath);

	const css = await sbReadFile(cssFileInPath);
	await sbWriteFile(cssFileOutPath, new CleanCSS().minify(css).styles);

	const index = await sbReadFile(indexFileInOutPath);
	const cssLink = `<link rel="stylesheet" href="./main.css" crossorigin="">`;
	const cssLinkReplacement = `<link rel="stylesheet" href="./css/${mainCSSFilename}" crossorigin="" />`;

	await sbWriteFile(indexFileInOutPath, index.replace(cssLink, cssLinkReplacement));
}

start();
