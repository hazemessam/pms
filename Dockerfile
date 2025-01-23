FROM node:23-alpine

WORKDIR /app

COPY package*.json .


RUN npm install --legacy-peer-deps

COPY . .

RUN npm run build

CMD ["npm", "run", "start:prod"]
