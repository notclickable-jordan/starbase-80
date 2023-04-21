#!/bin/sh

sed -i -e 's/HTMLTITLE/'"${TITLE}"'/g' /app/index.html
sed -i -e 's/HTMLTITLE/'"${TITLE}"'/g' /app/src/main.tsx

exec "$@"