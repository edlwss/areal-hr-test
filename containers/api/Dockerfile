FROM node:22

WORKDIR /usr/src/app

COPY api/package*.json ./
RUN npm install

COPY api .

# Переменные окружения (укажи файл в docker-compose.yml через `env_file`)
ENV NODE_ENV=production

EXPOSE 3010

CMD dotenv -e ../.env npx node-pg-migrate up && node server.js
