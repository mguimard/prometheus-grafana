FROM node:20

WORKDIR /app

COPY package*.json ./
COPY *.js ./

RUN npm install

COPY --chown=node:node . .

EXPOSE 8484

ENV APP6_HOST=8484

CMD ["node", "main.js"]