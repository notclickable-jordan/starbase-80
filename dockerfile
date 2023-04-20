FROM node

WORKDIR /app

COPY package.json .
RUN npm i

COPY . .

RUN npm run build

EXPOSE 4173

CMD ["npm", "run", "start"]