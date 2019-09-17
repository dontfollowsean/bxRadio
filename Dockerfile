FROM nginx
COPY . /usr/share/nginx/html

# Expose ports.
EXPOSE 80