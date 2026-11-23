FROM node:20-alpine3.21

WORKDIR /app

COPY package*.json ./
RUN npm ci --omit=dev

COPY src/ ./src/

USER node

EXPOSE 3000

CMD ["node", "src/server.js"]