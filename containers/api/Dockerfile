FROM node:22

WORKDIR /usr/src/app

# Установить необходимые инструменты для сборки
RUN apt-get update && apt-get install -y build-essential python3

COPY api/package*.json ./
RUN npm install

COPY api .

# Переменные окружения (укажи файл в docker-compose.yml через `env_file`)
ENV NODE_ENV=production

EXPOSE 3010

CMD npx dotenv npx node-pg-migrate up && node server.js
