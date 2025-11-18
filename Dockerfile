FROM node:20.11.1-alpine

RUN apk update && apk add --no-cache \
    chromium \
    nss \
    freetype \
    freetype-dev \
    harfbuzz \
    ca-certificates \
    ttf-freefont

ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser

WORKDIR /app

COPY . .
COPY .npmrc .npmrc

RUN npm install

ENV NODE_ENV=production

RUN rm .env

RUN npm run build

CMD ["node", "--max_old_space_size=2048" ,"dist/src/main.js"]
