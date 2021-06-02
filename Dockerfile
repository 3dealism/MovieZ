FROM node:14.17-alpine3.13
WORKDIR src/app
COPY package*.json .
RUN npm install
COPY . .
EXPOSE 4200
CMD ["npm", "start"]

