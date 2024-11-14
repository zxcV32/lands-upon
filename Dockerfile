FROM node as Build
WORKDIR /src
COPY _data/ ./_data/
COPY assets/ ./assets/
COPY styles/ ./styles/
COPY .eleventy.js .
COPY feed.xml .
COPY index.liquid .
COPY og.jpg .
COPY package*.json ./
COPY order.sh .
COPY script.js .
RUN npm install
RUN npm run build


FROM nginx:1.27.2-alpine3.20
WORKDIR /usr/share/nginx/html/
RUN rm -rf *
COPY --from=Build /src/_site .
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
