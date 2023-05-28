FROM node:14-buster

RUN apt update && apt upgrade -y

WORKDIR /var/www/baktalk-client

COPY package.json .
RUN yarn install

COPY . .

RUN yarn build

EXPOSE 3001

CMD [ "yarn", "start" ]
