FROM node:14-alpine

WORKDIR ./

COPY package*.json ./
COPY .env ./

RUN npm install

COPY . ./

RUN yarn build

RUN yarn global add serve

# running on port 7000
CMD ["serve", "-l", "7000", "-s", "build"]