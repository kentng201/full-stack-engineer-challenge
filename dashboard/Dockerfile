FROM node:8-alpine

WORKDIR /app

COPY . /app
RUN npm run build
RUN npm install -g serve --silent

EXPOSE 3000
CMD ["serve", "-s", "build"]