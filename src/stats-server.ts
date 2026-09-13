import * as http from "http";
import * as si from "systeminformation";

const PORT = 4174;
const HOST = "127.0.0.1";

interface IDiskTarget {
	path: string;
	label: string;
}

function parseDiskTargets(): IDiskTarget[] {
	const raw = process.env.STATSDISK || "/:Root";

	return raw
		.split(",")
		.map(entry => entry.trim())
		.filter(entry => entry.length > 0)
		.map(entry => {
			const separatorIndex = entry.indexOf(":");

			if (separatorIndex === -1) {
				return { path: entry, label: defaultLabel(entry) };
			}

			const path = entry.slice(0, separatorIndex).trim();
			const label = entry.slice(separatorIndex + 1).trim();

			return { path, label: label.length > 0 ? label : defaultLabel(path) };
		});
}

function defaultLabel(path: string): string {
	if (path === "/") {
		return "Root";
	}

	const segments = path.split("/").filter(segment => segment.length > 0);

	return segments.length > 0 ? segments[segments.length - 1] : path;
}

async function getDiskStats(targets: IDiskTarget[]) {
	const fsSize = await si.fsSize();

	return targets.map(target => {
		const match =
			fsSize.find(fs => fs.mount === target.path) ||
			fsSize
				.filter(fs => target.path === fs.mount || target.path.startsWith(fs.mount.endsWith("/") ? fs.mount : `${fs.mount}/`))
				.sort((a, b) => b.mount.length - a.mount.length)[0];

		if (!match) {
			return { path: target.path, label: target.label, found: false };
		}

		return {
			path: target.path,
			label: target.label,
			found: true,
			totalBytes: match.size,
			freeBytes: match.available,
			usedBytes: match.size - match.available,
			usedPercent: match.size > 0 ? ((match.size - match.available) / match.size) * 100 : 0,
		};
	});
}

async function getStats() {
	const [currentLoad, mem, disks] = await Promise.all([si.currentLoad(), si.mem(), getDiskStats(parseDiskTargets())]);

	return {
		cpu: {
			usagePercent: currentLoad.currentLoad,
		},
		memory: {
			totalBytes: mem.total,
			freeBytes: mem.available,
			usedBytes: mem.total - mem.available,
			usedPercent: mem.total > 0 ? ((mem.total - mem.available) / mem.total) * 100 : 0,
		},
		disks,
	};
}

const server = http.createServer((req, res) => {
	if (req.url !== "/api/stats" || req.method !== "GET") {
		res.writeHead(404, { "Content-Type": "application/json" });
		res.end(JSON.stringify({ error: "Not found" }));
		return;
	}

	getStats()
		.then(stats => {
			res.writeHead(200, { "Content-Type": "application/json" });
			res.end(JSON.stringify(stats));
		})
		.catch(exception => {
			console.error("Could not gather system stats:", exception);
			res.writeHead(500, { "Content-Type": "application/json" });
			res.end(JSON.stringify({ error: "Could not gather system stats" }));
		});
});

server.listen(PORT, HOST, () => {
	console.log(`Stats server listening on ${HOST}:${PORT}`);
});

function shutdown() {
	server.close(() => process.exit(0));
}

process.on("SIGTERM", shutdown);
process.on("SIGINT", shutdown);
