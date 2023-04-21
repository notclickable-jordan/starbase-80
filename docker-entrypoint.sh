#!/bin/sh

echo "Replacing HTMLTITLE with ${title} in /app/index.html"
sed -i -e 's/HTMLTITLE/'"${TITLE}"'/g' /app/index.html

echo "Replacing HTMLTITLE with ${title} in /app/src/main.tsx"
sed -i -e 's/HTMLTITLE/'"${TITLE}"'/g' /app/src/main.tsx

# Escape slashes... apparently
LOGO=${LOGOFILE//\//\\/}

echo "Replacing LOGO with ${LOGO} in /app/src/main.tsx"
sed -i -e 's/LOGO/'"${LOGO}"'/g' /app/src/main.tsx

exec "$@"