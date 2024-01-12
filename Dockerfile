FROM node:latest

WORKDIR /app

COPY package.json /app

RUN npm install
COPY . /app

EXPOSE 3031
CMD ["node", "bin/www"]
