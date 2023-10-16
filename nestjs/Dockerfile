FROM node:18-alpine3.17

RUN mkdir -p /var/app/nestjs

COPY . /var/app/nestjs/

WORKDIR /var/app/nestjs

RUN npm i

RUN npx mikro-orm migration:create

RUN npm run build

ENTRYPOINT ["/var/app/nestjs/start.sh"]