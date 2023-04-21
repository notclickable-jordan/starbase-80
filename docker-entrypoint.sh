#!/bin/sh

# Escape slashes
LOGO=${LOGO//\//\\/}

sed -i -e 's/PAGETITLE = "My Website"/'"${TITLE}"'/g' /app/index.html
sed -i -e 's/HTMLTITLE/'"${TITLE}"'/g' /app/src/variables.ts
sed -i -e 's/PAGEICON = "\/logo\.png"/'"${LOGO}"'/g' /app/src/variables.ts

exec "$@"