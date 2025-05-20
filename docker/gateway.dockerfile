FROM node:18 as builder
WORKDIR /usr/app
ENV TZ=Asia/Seoul
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

COPY package.json yarn.lock tsconfig.json tsconfig.build.json nest-cli.json ./

COPY apps/gateway-server ./apps/gateway-server

RUN ls -al /usr/app/apps/gateway-server

RUN yarn install
RUN yarn build gateway-server


FROM node:18-alpine as runner

COPY --from=builder /usr/app/node_modules ./node_modules
COPY --from=builder /usr/app/dist/apps/gateway-server ./dist/apps/gateway-server
COPY --from=builder /usr/app/apps/gateway-server/.env ./.env

RUN ls -al /


CMD ["node", "/dist/apps/gateway-server/main.js"]
