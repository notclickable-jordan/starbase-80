# Build site using Node JS
FROM node:21-slim

# Install latest chrome dev package and fonts to support major charsets (Chinese, Japanese, Arabic, Hebrew, Thai and a few others)
# Note: this installs the necessary libs to make the bundled version of Chromium that Puppeteer
# installs, work.
RUN apt-get update \
    && apt-get install -y wget gnupg \
    && wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
    && sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' \
    && apt-get update \
    && apt-get install -y chromium fonts-ipafont-gothic fonts-wqy-zenhei fonts-thai-tlwg fonts-kacst fonts-freefont-ttf libxss1 \
      --no-install-recommends \
    && rm -rf /var/lib/apt/lists/*

ENV PUPPETEER_SKIP_DOWNLOAD true

# Install puppeteer so it's available in the container.
RUN npm init -y &&  \
    npm i -g puppeteer

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

CMD ["npm", "run", "start"]