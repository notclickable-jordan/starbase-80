FROM node:18-alpine

WORKDIR /app

COPY package.json .
RUN npm i

COPY . .

ENV NODE_ENV production

ENV TITLE "My Website"

EXPOSE 4173

RUN sed -i -e 's/HTMLTITLE/'"${TITLE}"'/g' ./index.html
RUN sed -i -e 's/HTMLTITLE/'"${TITLE}"'/g' ./src/main.tsx

CMD ["npm", "run", "start"]