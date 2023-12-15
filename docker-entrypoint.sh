#!/bin/sh

# Escape slashes
LOGO=${LOGO//\//\\/}

# HTML replacement
sed -i -e 's/My Website/'"${TITLE}"'/g' /app/index.html

# TypeScript replacement
sed -i -e 's/PAGETITLE = "My Website"/PAGETITLE = "'"${TITLE}"'"/g' /app/src/variables.ts
sed -i -e 's/PAGEICON = "\/logo\.png"/PAGEICON = "'"${LOGO}"'"/g' /app/src/variables.ts
sed -i -e 's/SHOWHEADER = true/SHOWHEADER = '"${HEADER}"'/g' /app/src/variables.ts
sed -i -e 's/SHOWHEADERLINE = true/SHOWHEADERLINE = '"${HEADERLINE}"'/g' /app/src/variables.ts
sed -i -e 's/SHOWHEADERTOP = false/SHOWHEADERTOP = '"${HEADERTOP}"'/g' /app/src/variables.ts
sed -i -e 's/CATEGORIES = "normal"/CATEGORIES = "'"${CATEGORIES}"'"/g' /app/src/variables.ts
sed -i -e 's/NEWWINDOW = true/NEWWINDOW = '"${NEWWINDOW}"'/g' /app/src/variables.ts

# CSS replacement
sed -i -e 's/background-color: theme(\(colors\.slate\.50\))/background-color: '"${BGCOLOR}"'/g' /app/src/tailwind.css
sed -i -e 's/background-color: theme(\(colors\.gray\.950\))/background-color: '"${BGCOLORDARK}"'/g' /app/src/tailwind.css

exec "$@"