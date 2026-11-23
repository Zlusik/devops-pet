FROM node:20-alpine3.21

WORKDIR /app

COPY package*.json ./
RUN npm ci --omit=dev

# Удаляем npm, чтобы Trivy не находил уязвимости во встроенных зависимостях npm
RUN rm -rf /usr/local/lib/node_modules/npm /usr/local/bin/npm /usr/local/bin/npx

COPY src/ ./src/

EXPOSE 3000

CMD ["node", "src/server.js"]