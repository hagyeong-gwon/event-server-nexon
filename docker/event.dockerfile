FROM node:18 as builder
WORKDIR /usr/app
ENV TZ=Asia/Seoul
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

COPY package.json yarn.lock tsconfig.json tsconfig.build.json nest-cli.json ./

COPY apps/event-server ./apps/event-server

RUN ls -al /usr/app/apps/event-server

RUN yarn install
RUN yarn build event-server


FROM node:18-alpine as runner

COPY --from=builder /usr/app/node_modules ./node_modules
COPY --from=builder /usr/app/dist/apps/event-server ./dist/apps/event-server
COPY --from=builder /usr/app/apps/event-server/.env ./.env

CMD ["node", "/dist/apps/event-server/main.js"]
