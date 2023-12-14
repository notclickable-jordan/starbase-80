import { exec } from "child_process";
import fs from "fs/promises";
import puppeteer from "puppeteer";

function runNpmCommand(command) {
	return new Promise((resolve, reject) => {
		exec(`npm ${command}`, (error, stdout, stderr) => {
			if (error) {
				console.error(`Error executing command: ${error}`);
				reject(error);
			} else {
				console.log(`Command output: ${stdout}`);
				resolve(stdout);
			}
		});
	});
}

async function renderHomePage() {
	const browser = await puppeteer.launch({
		headless: true,
		args: ["--no-sandbox", "--disable-setuid-sandbox"],
		executablePath: "chromium",
	});
	const page = await browser.newPage();

	await page.goto("http://localhost:4173", { waitUntil: "networkidle0" });

	// Wait for any additional content to load
	await page.waitForNetworkIdle();

	// Get the rendered HTML content
	const renderedHTML = await page.content();

	// Save the rendered HTML to a file
	fs.writeFile("./dist/index.html", renderedHTML);

	await browser.close();
}

async function runCommands() {
	try {
		console.log("Building React site");
		await runNpmCommand("run build");

		setTimeout(async () => {
			console.log("Taking snapshot");
			await renderHomePage();
			await runNpmCommand("run html");
			await runNpmCommand("run replace");
		}, 2000);

		console.log("Starting web server");
		await runNpmCommand("run serve");
	} catch (err) {
		// Handle errors
		console.error("An error occurred:", err);
	}
}

runCommands();
