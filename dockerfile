# Build site using Node JS
FROM node:21-slim

# Install nginx
RUN apt-get update && apt-get install -y nginx

ARG BUILD_DATE

LABEL \
  maintainer="Jordan Roher <jordan@notclickable.com>" \
  org.opencontainers.image.authors="Jordan Roher <jordan@notclickable.com>" \
  org.opencontainers.image.title="starbase-80" \
  org.opencontainers.image.description="A nice app grid of icons for Docker services" \
  org.opencontainers.image.created=$BUILD_DATE

WORKDIR /app

COPY package.json .
RUN npm i

COPY . .

# Copy the nginx config to the correct folder
COPY default.conf /etc/nginx/conf.d/default.conf

ENV NODE_ENV production

ENV TITLE "My Website"
ENV LOGO "/logo.png"
ENV HEADER "true"
ENV HEADERLINE "true"
ENV HEADERTOP "false"
ENV CATEGORIES "normal"
ENV BGCOLOR "theme(colors.slate.50)"
ENV BGCOLORDARK "theme(colors.gray.950)"
ENV NEWWINDOW "true"

COPY version /
EXPOSE 4173

RUN chmod +x /app/docker-entrypoint.sh
ENTRYPOINT ["/app/docker-entrypoint.sh"]

CMD ["npm", "run", "build"]