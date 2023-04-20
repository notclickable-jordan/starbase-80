FROM node:18-alpine

WORKDIR /app

COPY package.json .
RUN npm i

COPY . .

ENV NODE_ENV production

EXPOSE 4173

CMD ["npm", "run", "start"]