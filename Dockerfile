FROM node:14.18.2

ENV PORT=3000

WORKDIR /usr/src/app
COPY . .
RUN npm install

CMD [ "npm", "run", "start" ]
