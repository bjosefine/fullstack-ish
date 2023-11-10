FROM node as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
CMD [ "npm", "run", "build"]

FROM nginx as frontend
WORKDIR /usr/share/nginx/html
COPY --from=build /app/dist/ .
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80