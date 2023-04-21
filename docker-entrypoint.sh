#!/bin/sh

# Escape slashes
LOGO=${LOGO//\//\\/}

# HTML replacement
sed -i -e 's/HTMLTITLE/'"${TITLE}"'/g' /app/index.html

# TypeScript replacement
sed -i -e 's/(PAGETITLE = ")My Website(")/'"$1${TITLE}$2"'/g' /app/src/variables.ts
sed -i -e 's/(PAGEICON = ")\/logo\.png(")/'"$1${LOGO}$2"'/g' /app/src/variables.ts
sed -i -e 's/(SHOWHEADER = )true/'"$1${HEADER}"'/g' /app/src/variables.ts
sed -i -e 's/(SHOWHEADERLINE = )true/'"$1${HEADERLINE}"'/g' /app/src/variables.ts
sed -i -e 's/(CATEGORIES = ")normal(")/'"$1${CATEGORIES}$2"'/g' /app/src/variables.ts
sed -i -e 's/(THEME = ")light(")/'"$1${THEME}$2"'/g' /app/src/variables.ts

# CSS replacement
sed -i -e 's/(background-color: )theme\(colors\.slate\.50\)/'"$1${BGCOLOR}"'/g' /app/src/tailwind.css

exec "$@"