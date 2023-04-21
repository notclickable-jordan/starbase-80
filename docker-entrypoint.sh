#!/bin/sh

echo "Replacing HTMLTITLE with ${title} in /app/index.html"
sed -i -e 's/HTMLTITLE/'"${TITLE}"'/g' /app/index.html

echo "Replacing HTMLTITLE with ${title} in /app/src/main.tsx"
sed -i -e 's/HTMLTITLE/'"${TITLE}"'/g' /app/src/main.tsx

# Escape slashes... apparently
LOGOFILE=${LOGOFILE//\//\\/}

echo "Replacing LOGOFILE with ${LOGOFILE} in /app/src/main.tsx"
sed -i -e 's/LOGOFILE/'"${LOGOFILE}"'/g' /app/src/main.tsx

exec "$@"