FROM node:alpine

WORKDIR /usr/app

COPY package.json yarn.lock ./

RUN yarn

COPY ./src .

EXPOSE 3333

CMD ["yarn", "dev"]
