FROM node:18 as builder
WORKDIR /usr/app
ENV TZ=Asia/Seoul
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

COPY package.json yarn.lock tsconfig.json tsconfig.build.json nest-cli.json ./

COPY apps/auth-server ./apps/auth-server

RUN yarn install
RUN yarn build auth-server


FROM node:18-alpine as runner

COPY --from=builder /usr/app/node_modules ./node_modules
COPY --from=builder /usr/app/dist/apps/auth-server ./dist/apps/auth-server
COPY --from=builder /usr/app/apps/auth-server/.env ./.env

CMD ["node", "/dist/apps/auth-server/main.js"]
