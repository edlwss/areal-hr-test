FROM node:22-alpine

WORKDIR /usr/src/app

RUN apk add --no-cache python3 make g++ bash

COPY api/package*.json ./
RUN npm install --production

COPY api .

ENV NODE_ENV=production
EXPOSE 3010

CMD ["sh", "-c", "npx dotenv npx node-pg-migrate up && node server.js"]
