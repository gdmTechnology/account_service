FROM node:16.14.0 AS build
ENV NODE_ENV=dev

RUN mkdir /app
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install --production
COPY . .

COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

ENTRYPOINT [ "/entrypoint.sh" ]