# Build environment
FROM node:18-alpine AS build
WORKDIR /app
COPY package.json yarn.lock .env ./
COPY public ./public
RUN yarn install --frozen-lockfile --network-timeout 600000
COPY jsconfig.json .prettierrc ./
COPY src ./src
RUN yarn build
COPY nginx.conf ./

# Production Env
FROM nginx:stable-alpine

COPY --from=build /app/nginx.conf /etc/nginx/conf.d/default.conf    
WORKDIR /usr/share/nginx
## Copy .env file and shell script to container
COPY ./scripts/env.sh .
COPY ./scripts/.env .

COPY --from=build /app/build ./html

## Make shell script executable and prevent windows encoding
RUN sed -i -e 's/\r$//' env.sh && sed -i -e 's/\r$//' .env && chmod +x env.sh

RUN sed -i.orig -e '/user[[:space:]]\+nginx/d' -e 's@pid[[:space:]]\+.*@pid /tmp/nginx.pid;@' /etc/nginx/nginx.conf && \
    diff -u /etc/nginx/nginx.conf.orig /etc/nginx/nginx.conf ||: && \
    chown nginx /usr/share/nginx/html/index.html && \
    chown -Rc nginx /var/cache/nginx
# Equivalent to 'USER nginx', see: https://github.com/InseeFrLab/onyxia-web/pull/279
USER 101

## non root users cannot listen on 80
EXPOSE 8080
USER nginx

# Start Nginx server
CMD ["/bin/bash", "-c", "/usr/share/nginx/html/env.sh && nginx -g \"daemon off;\""]