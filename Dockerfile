FROM nginx

RUN npm install && npm run build
COPY ./dist /usr/share/nginx/html



EXPOSE 80