FROM node:8.16-jessie

ENV CI=true
WORKDIR /var/www/html

COPY . .

RUN apt-get update
RUN npm install

CMD sh -c "npm install && npm start"