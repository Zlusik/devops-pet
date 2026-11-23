FROM node:20-alpine3.21

WORKDIR /app

COPY package*.json ./
# Устанавливаем зависимости
RUN npm ci --omit=dev

# ПРИНУДИТЕЛЬНО обновляем уязвимый tar до безопасной версии
RUN npm install tar@7.5.21 --no-save

COPY src/ ./src/

EXPOSE 3000

CMD ["node", "src/server.js"]