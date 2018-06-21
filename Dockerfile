FROM node:alpine

WORKDIR /app

#RUN apk add --no-cache git

COPY package*.json /app/
RUN npm install

COPY . /app/

EXPOSE 3000

CMD ["npm", "start"]