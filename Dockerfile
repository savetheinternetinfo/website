MAINTAINER The Internet <contact@savetheinternet.info>
FROM node:8-alpine
WORKDIR /app
COPY package*.json /app/
COPY . /app/
RUN npm install
EXPOSE 80
CMD ["npm", "start"]
