FROM node:18-alpine

WORKDIR /app

COPY package.json .
RUN npm i

COPY . .

ENV NODE_ENV production

ENV TITLE "My Website"
ENV LOGO "/logo.png"
ENV HEADER "true"
ENV HEADERLINE "true"
ENV CATEGORIES "normal"
ENV BGCOLOR "#f8fafc"

EXPOSE 4173

RUN chmod +x /app/docker-entrypoint.sh
ENTRYPOINT ["/app/docker-entrypoint.sh"]

CMD ["npm", "run", "start"]