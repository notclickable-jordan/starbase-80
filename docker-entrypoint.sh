#!/bin/sh

# Set up signal handling for faster shutdown
trap 'nginx -s quit; exit 0' TERM QUIT

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
sed -i -e 's/background-color: theme(colors\.slate\.50)/background-color: '"${BGCOLOR}"'/g' /app/src/tailwind.css
sed -i -e 's/background-color: theme(colors\.gray\.950)/background-color: '"${BGCOLORDARK}"'/g' /app/src/tailwind.css
sed -i -e 's/background-color: theme(colors\.white)\; \/\* category light \*\//background-color: '"${CATEGORYBUBBLECOLORLIGHT}"\;'/g' /app/src/tailwind.css
sed -i -e 's/background-color: theme(colors\.black)\; \/\* category dark \*\//background-color: '"${CATEGORYBUBBLECOLORDARK}"\;'/g' /app/src/tailwind.css

# Dark theme
if [ "$THEME" = "dark" ]; then sed -i -e 's/darkMode: "media"/darkMode: "selector"/g' /app/tailwind.config.js; fi
if [ "$THEME" = "dark" ]; then sed -i -e 's/<html/<html class="dark"/' /app/index.html; fi

# Hover effect
if [ "$HOVER" = "underline" ]; then sed -i -e 's/@apply no-underline;/@apply underline;/g' /app/src/tailwind.css; fi

exec "$@"