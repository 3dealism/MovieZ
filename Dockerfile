FROM node:14.16.0-alpine3.13
WORKDIR /app
COPY package*.json .
COPY proxy.config.json .
RUN npm install
COPY . .
EXPOSE 4200
CMD ["npm", "start"]

