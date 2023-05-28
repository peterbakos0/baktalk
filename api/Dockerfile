FROM node:14-buster

RUN apt update && apt upgrade -y

WORKDIR /var/www/baktalk-api

COPY package.json .
RUN yarn install

COPY . .

EXPOSE 3000

CMD [ "yarn", "start" ]
