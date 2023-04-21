#!/bin/sh

# Escape slashes
LOGO=${LOGO//\//\\/}

# HTML replacement
sed -i -e 's/HTMLTITLE/'"${TITLE}"'/g' /app/index.html

# TypeScript replacement
sed -i -e 's/(PAGETITLE = ")My Website(")/'"$1${TITLE}$2"'/g' /app/src/variables.ts
sed -i -e 's/(PAGEICON = ")\/logo\.png(")/'"$1${LOGO}$2"'/g' /app/src/variables.ts
sed -i -e 's/(SHOWHEADER = )false/'"$1${HEADER}"'/g' /app/src/variables.ts

exec "$@"