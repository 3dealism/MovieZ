FROM node:14.16.0-alpine3.13
WORKDIR /app
COPY package.json .
COPY /images ./images/
RUN npm cache clean --force
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
