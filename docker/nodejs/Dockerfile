FROM node:alpine

WORKDIR /app

COPY package-lock.json package.json /app/

RUN apk add --no-cache make gcc g++ python3

RUN npm install

COPY . /app

EXPOSE 3000

CMD ["npm", "run", "start"]