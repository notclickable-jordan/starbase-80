#!/bin/sh

# Escape slashes
LOGO=${LOGO//\//\\/}

# HTML replacement
sed -i -e 's/HTMLTITLE/'"${TITLE}"'/g' /app/index.html

# TypeScript replacement
sed -i -e 's/PAGETITLE = "My Website"/'"${TITLE}"'/g' /app/src/variables.ts
sed -i -e 's/PAGEICON = "\/logo\.png"/'"${LOGO}"'/g' /app/src/variables.ts

exec "$@"