FROM nginx:alpine

LABEL maintainer="DarrenYing 823875304@qq.com"

COPY ./dist/ /usr/share/nginx/html/

RUN sed -Ei 's/user[[:space:]]+nginx/user root/g' /etc/nginx/nginx.conf
