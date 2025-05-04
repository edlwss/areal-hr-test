FROM node:20

WORKDIR /app

COPY app/package*.json ./
RUN npm install

COPY app .

ENV NODE_ENV=production

EXPOSE 5173

CMD ["npm", "run", "dev", "--", "--host"]
