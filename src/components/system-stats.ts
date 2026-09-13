const ICONS = {
	cpu: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="6" y="6" width="12" height="12" rx="1.5"></rect><rect x="9" y="9" width="6" height="6" rx="0.5"></rect><path d="M9 2v3M12 2v3M15 2v3M9 19v3M12 19v3M15 19v3M2 9h3M2 12h3M2 15h3M19 9h3M19 12h3M19 15h3"></path></svg>`,
	memory: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="8" width="18" height="9" rx="1"></rect><path d="M7 8V5M11 8V5M15 8V5M17 8V5M7 17v2M11 17v2M15 17v2M17 17v2"></path></svg>`,
	disk: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="12" cy="6" rx="9" ry="3"></ellipse><path d="M3 6v12c0 1.66 4.03 3 9 3s9-1.34 9-3V6"></path><path d="M3 12c0 1.66 4.03 3 9 3s9-1.34 9-3"></path></svg>`,
};

function StatRow(icon: string, key: string, label: string): string {
	return `
		<div class="flex items-center gap-3 flex-1 min-w-[170px]" data-stat-row="${key}">
			<span class="shrink-0 w-5 h-5 text-slate-500 dark:text-slate-400">${icon}</span>
			<div class="flex-1 min-w-0">
				<div class="flex items-baseline justify-between gap-2">
					<span class="font-medium tabular-nums text-sm" data-stat-value>—</span>
					<span class="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wide">${label}</span>
				</div>
				<div class="mt-1 h-1 w-full rounded-full bg-slate-200 dark:bg-slate-700">
					<div class="h-1 rounded-full bg-slate-500 dark:bg-slate-400 transition-all duration-700" data-stat-bar style="width:0%"></div>
				</div>
			</div>
		</div>
	`;
}

export const SystemStats = function (): string {
	return `
		<div id="system-stats" class="w-full flex flex-wrap gap-4 mt-2">
			${StatRow(ICONS.cpu, "cpu", "CPU")}
			${StatRow(ICONS.memory, "memory", "RAM")}
			<div data-disk-container class="contents"></div>
		</div>
		<script>
		(function () {
			var REFRESH_MS = 1500;
			var container = document.getElementById("system-stats");
			if (!container) return;
			var diskContainer = container.querySelector("[data-disk-container]");
			var cpuRow = container.querySelector('[data-stat-row="cpu"]');
			var memRow = container.querySelector('[data-stat-row="memory"]');

			function prettyBytes(bytes, binary) {
				if (typeof bytes !== "number" || !isFinite(bytes)) return "—";
				var base = binary ? 1024 : 1000;
				var units = binary ? ["B", "KiB", "MiB", "GiB", "TiB", "PiB"] : ["B", "KB", "MB", "GB", "TB", "PB"];
				if (Math.abs(bytes) < base) return Math.round(bytes) + " " + units[0];
				var exponent = Math.min(Math.floor(Math.log(Math.abs(bytes)) / Math.log(base)), units.length - 1);
				var value = Number((bytes / Math.pow(base, exponent)).toPrecision(3));
				return value + " " + units[exponent];
			}

			function formatUsedOfTotal(usedBytes, totalBytes, binary) {
				if (typeof usedBytes !== "number" || typeof totalBytes !== "number" || !isFinite(totalBytes)) return "—";
				var base = binary ? 1024 : 1000;
				var units = binary ? ["B", "KiB", "MiB", "GiB", "TiB", "PiB"] : ["B", "KB", "MB", "GB", "TB", "PB"];
				var exponent = totalBytes >= base ? Math.min(Math.floor(Math.log(totalBytes) / Math.log(base)), units.length - 1) : 0;
				var divisor = Math.pow(base, exponent);
				var used = Number((usedBytes / divisor).toPrecision(3));
				var total = Number((totalBytes / divisor).toPrecision(3));
				return used + " / " + total + " " + units[exponent];
			}

			function setRow(row, value, percent) {
				if (!row) return;
				var valueEl = row.querySelector("[data-stat-value]");
				var barEl = row.querySelector("[data-stat-bar]");
				if (valueEl) valueEl.textContent = value;
				if (barEl) barEl.style.width = Math.max(0, Math.min(100, percent)) + "%";
			}

			function diskRowHTML(disk, index) {
				return (
					'<div class="flex items-center gap-3 flex-1 min-w-[170px]" data-disk-index="' + index + '">' +
					'<span class="shrink-0 w-5 h-5 text-slate-500 dark:text-slate-400">${ICONS.disk}</span>' +
					'<div class="flex-1 min-w-0">' +
					'<div class="flex items-baseline justify-between gap-2">' +
					'<span class="font-medium tabular-nums text-sm" data-stat-value>—</span>' +
					'<span class="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wide">' + (disk.label || "Disk") + '</span>' +
					'</div>' +
					'<div class="mt-1 h-1 w-full rounded-full bg-slate-200 dark:bg-slate-700">' +
					'<div class="h-1 rounded-full bg-slate-500 dark:bg-slate-400 transition-all duration-700" data-stat-bar style="width:0%"></div>' +
					'</div></div></div>'
				);
			}

			function ensureDiskRows(disks) {
				if (diskContainer.children.length === disks.length) return;
				diskContainer.innerHTML = disks.map(diskRowHTML).join("");
			}

			function refresh() {
				fetch("/api/stats", { cache: "no-store" })
					.then(function (response) {
						if (!response.ok) throw new Error("bad response");
						return response.json();
					})
					.then(function (data) {
						if (data.cpu) {
							setRow(cpuRow, Math.round(data.cpu.usagePercent) + "%", data.cpu.usagePercent);
						}
						if (data.memory) {
							setRow(memRow, formatUsedOfTotal(data.memory.usedBytes, data.memory.totalBytes, true), data.memory.usedPercent);
						}
						if (Array.isArray(data.disks)) {
							ensureDiskRows(data.disks);
							data.disks.forEach(function (disk, index) {
								var row = diskContainer.querySelector('[data-disk-index="' + index + '"]');
								if (!row) return;
								if (disk.found === false) {
									setRow(row, "N/A", 0);
									return;
								}
								setRow(row, formatUsedOfTotal(disk.usedBytes, disk.totalBytes, false), disk.usedPercent);
							});
						}
					})
					.catch(function () {});
			}

			refresh();
			setInterval(refresh, REFRESH_MS);
		})();
		</script>
	`;
};
