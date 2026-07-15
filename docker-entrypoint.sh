#!/bin/sh

# PID tracking for proper signal handling
nginx_pid=""

# Signal handler for fast shutdown
cleanup() {
    echo "Received shutdown signal, stopping nginx..."
    if [ -n "$nginx_pid" ]; then
        kill -QUIT "$nginx_pid" 2>/dev/null
        wait "$nginx_pid" 2>/dev/null
    fi
    exit 0
}

# Set up signal traps
trap cleanup TERM INT QUIT

# Escape slashes
LOGO=$(echo "${LOGO}" | sed 's/\//\\\//g')

# HTML replacement
sed -i -e 's/My Website/'"${TITLE}"'/g' /app/index.html
sed -i -e 's/\/logo\.png/'"${LOGO}"'/g' /app/index.html

# TypeScript replacement
sed -i -e 's/PAGETITLE = "My Website"/PAGETITLE = "'"${TITLE}"'"/g' /app/src/variables.ts
sed -i -e 's/PAGEICON = "\/logo\.png"/PAGEICON = "'"${LOGO}"'"/g' /app/src/variables.ts
sed -i -e 's/SHOWHEADER = true/SHOWHEADER = '"${HEADER}"'/g' /app/src/variables.ts
sed -i -e 's/SHOWHEADERLINE = true/SHOWHEADERLINE = '"${HEADERLINE}"'/g' /app/src/variables.ts
sed -i -e 's/SHOWHEADERTOP = false/SHOWHEADERTOP = '"${HEADERTOP}"'/g' /app/src/variables.ts
sed -i -e 's/CATEGORIES = "normal"/CATEGORIES = "'"${CATEGORIES}"'"/g' /app/src/variables.ts
sed -i -e 's/NEWWINDOW = true/NEWWINDOW = '"${NEWWINDOW}"'/g' /app/src/variables.ts

# CSS replacement
# Tailwind v4 removed the theme(colors.x.y) function. Translate any legacy
# theme(colors.x.y) color values (built-in defaults or user-supplied) into the
# v4 var(--color-x-y) equivalent so existing configs keep working. Hex codes and
# already-migrated var(...) values pass through unchanged.
translate_color() {
	printf '%s' "$1" | sed -E \
		-e 's/theme\(colors\.([a-zA-Z]+)\.([0-9]+)\)/var(--color-\1-\2)/g' \
		-e 's/theme\(colors\.([a-zA-Z]+)\)/var(--color-\1)/g'
}

BGCOLOR=$(translate_color "${BGCOLOR}")
BGCOLORDARK=$(translate_color "${BGCOLORDARK}")
CATEGORYBUBBLECOLORLIGHT=$(translate_color "${CATEGORYBUBBLECOLORLIGHT}")
CATEGORYBUBBLECOLORDARK=$(translate_color "${CATEGORYBUBBLECOLORDARK}")

sed -i -e 's/background-color: var(--color-slate-50)/background-color: '"${BGCOLOR}"'/g' /app/src/tailwind.css
sed -i -e 's/background-color: var(--color-gray-950)/background-color: '"${BGCOLORDARK}"'/g' /app/src/tailwind.css
sed -i -e 's/background-color: var(--color-white)\; \/\* category light \*\//background-color: '"${CATEGORYBUBBLECOLORLIGHT}"\;'/g' /app/src/tailwind.css
sed -i -e 's/background-color: var(--color-black)\; \/\* category dark \*\//background-color: '"${CATEGORYBUBBLECOLORDARK}"\;'/g' /app/src/tailwind.css

# Light/dark theme
if [ "$THEME" = "dark" ]; then sed -i -e 's/darkMode: "media"/darkMode: "selector"/g' /app/tailwind.config.mjs; fi
if [ "$THEME" = "dark" ]; then sed -i -e 's/<html class="auto"/<html class="dark"/' /app/index.html; fi
if [ "$THEME" = "light" ]; then sed -i -e 's/darkMode: "media"/darkMode: "selector"/g' /app/tailwind.config.mjs; fi
if [ "$THEME" = "light" ]; then sed -i -e 's/<html class="auto"/<html class="light"/' /app/index.html; fi

# Hover effect
if [ "$HOVER" = "underline" ]; then sed -i -e 's/@apply no-underline;/@apply underline;/g' /app/src/tailwind.css; fi

# Validate the config files before building. If a config file contains invalid
# JSON, tsc fails with a cryptic error and nginx would otherwise start anyway,
# serving a 403. Fail loudly and stop the container instead.
validate_config() {
	config_file="$1"

	# Skip files that don't exist (the legacy config is optional)
	if [ ! -f "$config_file" ]; then
		return 0
	fi

	if ! node -e 'JSON.parse(require("fs").readFileSync(process.argv[1], "utf8"))' "$config_file" 2>/tmp/config-error; then
		echo "========================================================================"
		echo "ERROR: $config_file is not valid JSON."
		echo ""
		sed 's/^/  /' /tmp/config-error
		echo ""
		echo "Please fix the formatting of your config file and restart the container."
		echo "A common mistake is a missing comma or curly brace."
		echo "========================================================================"
		exit 1
	fi
}

validate_config /app/src/config.json
validate_config /app/src/config/config.json

# Build the application
echo "Building application..."
if ! npm run build; then
	echo "========================================================================"
	echo "ERROR: The build failed. The container will stop instead of serving a"
	echo "broken page. Check the build output above for details."
	echo "========================================================================"
	exit 1
fi

# Start nginx and track its PID
echo "Starting nginx..."
"$@" &
nginx_pid=$!

# Wait for nginx to finish, but respond to signals
wait "$nginx_pid"