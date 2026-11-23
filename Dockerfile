FROM node:20-alpine

# Переключаемся на root, чтобы обновить npm
USER root
RUN npm install -g npm@latest
# Возвращаем пользователя node для безопасности (как было в оригинальном образе)
USER node

WORKDIR /app

COPY package*.json ./
RUN npm ci --omit=dev

COPY src/ ./src/

USER node

EXPOSE 3000

CMD ["node", "src/server.js"]