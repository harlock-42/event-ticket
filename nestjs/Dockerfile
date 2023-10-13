FROM node:20-alpine3.17

RUN mkdir -p /var/app/nestjs

COPY . /var/app/nestjs/

WORKDIR /var/app/nestjs

RUN npm i

RUN npx mikro-orm migration:create

RUN npm run build

ENTRYPOINT ["npm", "run", "start:prod"]
# ENTRYPOINT ["npx", "mikro-orm", "migration:up", "--", "npm", "run", "start:prod"]