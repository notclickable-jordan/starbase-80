#!/bin/sh

# Escape slashes
LOGO=${LOGO//\//\\/}

# HTML replacement
sed -i -e 's/HTMLTITLE/'"${TITLE}"'/g' /app/index.html

# TypeScript replacement
sed -i -e 's/(PAGETITLE = ")My Website(")/'"$1${TITLE}$2"'/g' /app/src/variables.ts
sed -i -e 's/(PAGEICON = ")\/logo\.png(")/'"$1${LOGO}$2"'/g' /app/src/variables.ts
sed -i -e 's/(SHOWHEADER = )false/'"$1${HEADER}"'/g' /app/src/variables.ts
sed -i -e 's/(CATEGORIES = ")normal(")/'"$1${CATEGORIES}$2"'/g' /app/src/variables.ts

# CSS replacement
sed -i -e 's/(background-color: )#f8fafc/'"$1${BGCOLOR}"'/g' /app/src/tailwind.css
 #f8fafc

exec "$@"