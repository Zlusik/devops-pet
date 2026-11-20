# DevOps Pet Project

## Что уже сделано:
- Настроен минимальный Node.js проект (Express).
- Добавлены линтер (ESLint) и тесты (Jest).
- Настроен Dockerfile (сборка под node:20-alpine).
- Настроен CI/CD пайплайн в GitHub Actions (.github/workflows/ci.yml).
- Пайплайн делает: lint -> test -> сборка мультиарх-образа (amd64, arm64) -> пуш в GHCR.
- Образ доступен по адресу: ghcr.io/zlusik/devops-pet:latest.

## Что дальше:
- Путь 1: Настроить CD (автоматический деплой на VPS/Render).
- Путь 2: DevSecOps (добавить Trivy, npm audit, поиск секретов).