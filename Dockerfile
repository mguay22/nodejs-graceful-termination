FROM node:18-alpine

RUN npm install -g pnpm

WORKDIR /usr/src/app

COPY pnpm-lock.yaml ./
COPY package.json ./

RUN pnpm install --prod

COPY . .

RUN pnpm run build

CMD ["pnpm", "run", "start:prod"]