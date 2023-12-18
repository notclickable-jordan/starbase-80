import * as fs from "fs/promises";

export async function sbReadFile(fileName: string): Promise<string> {
	return new Promise(async (resolve, reject) => {
		try {
			const index = await fs.readFile(fileName);

			return resolve(index.toString());
		} catch (exception) {
			console.error(`Could not read file: ${fileName}`);
			reject(exception);
		}
	});
}

export async function sbWriteFile(fileName: string, contents: string): Promise<boolean> {
	return new Promise(async (resolve, reject) => {
		try {
			await fs.writeFile(fileName, contents);
			return resolve(true);
		} catch (exception) {
			console.error(`Could not write file: ${fileName}`);
			reject(exception);
		}
	});
}

export async function sbRename(fileNameOld: string, fileNameNew: string): Promise<boolean> {
	return new Promise(async (resolve, reject) => {
		try {
			await fs.rename(fileNameOld, fileNameNew);
			return resolve(true);
		} catch (exception) {
			console.error(`Could not rename file: ${fileNameOld} to ${fileNameNew}`);
			reject(exception);
		}
	});
}
