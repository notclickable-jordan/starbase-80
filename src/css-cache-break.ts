import CleanCSS from "clean-css";
import * as path from "path";
import { sbReadFile, sbRename, sbWriteFile } from "./shared/files";

const mainCSSFilename = `main.${new Date().getTime()}.css`;

const cssFileInPath = path.join(__dirname, "../", "./public", "main.css");
const cssFileOutPath = path.join(__dirname, "../", "./public", mainCSSFilename);
const indexFileInOutPath = path.join(__dirname, "../", "./public", "index.html");

async function start(): Promise<void> {
	await sbRename(cssFileInPath, cssFileOutPath);
	const css = await sbReadFile(cssFileOutPath);
	await sbWriteFile(cssFileOutPath, new CleanCSS().minify(css).styles);

	const index = await sbReadFile(indexFileInOutPath);
	const cssLink = `<link rel="stylesheet" href="./main.css" crossorigin="">`;
	const cssLinkReplacement = `<link rel="stylesheet" href="./${mainCSSFilename}" crossorigin="" />`;

	await sbWriteFile(indexFileInOutPath, index.replace(cssLink, cssLinkReplacement));
}

start();
