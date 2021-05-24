FROM node:alpine

WORKDIR '/app'

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

# /app/build > will have the entire frontend build in the container

FROM nginx

EXPOSE 3000

COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf

COPY --from=0 /app/build /usr/share/nginx/html