# DevOps Pet Project

Учебный проект для отработки практических навыков в DevOps: от написания кода до автоматического деплоя с проверкой безопасности.

## 🚀 Ссылки на проект
*   **Живое приложение (Production):** [https://devops-pet-latest.onrender.com/](https://devops-pet-latest.onrender.com/)
*   **Сервис на Render (Dashboard):** [https://dashboard.render.com/](https://dashboard.render.com/)
*   **Docker-образ:** `ghcr.io/zlusik/devops-pet:latest`

## 📋 Ручки (Endpoints) API
*   `GET /health` — Проверка статуса (healthcheck). Ответ: `{"status": "ok"}`
*   `GET /hello` — Приветственное сообщение. Ответ: `{"message": "Hello from DevOps pipeline!"}`
*   `GET /check` — Тестовая ручка. Ответ: `{"message": "check new endpoint. Hellow new best world"}`

## ✅ Что уже сделано

### 🛠️ CI (Continuous Integration)
*   Настроен минимальный проект на **Node.js** (Express).
*   Добавлен линтер (**ESLint**) и тесты (**Jest**).
*   Настроен пайплайн в **GitHub Actions** (`.github/workflows/ci.yml`), который при каждом пуше в `main` выполняет:
    *   Проверку кода (`lint`).
    *   Прогон тестов (`test`).
    *   Сборку мультиархитектурного Docker-образа (`linux/amd64`, `linux/arm64`).
    *   Пуш готового образа в **GitHub Container Registry (GHCR)**.

### 🚀 CD (Continuous Deployment)
*   Настроен автоматический деплой на платформу **Render**.
*   Связь между GitHub Actions и Render реализована через **Deploy Hook** (секретная ссылка в GitHub Secrets).
*   После успешной сборки образа GitHub Actions отправляет сигнал на Render, и тот автоматически подтягивает свежий образ `latest` из GHCR.

### 🛡️ DevSecOps (Безопасность)
*   Добавлен **`npm audit`** для проверки зависимостей на известные уязвимости перед сборкой.
*   Интегрирован сканер уязвимостей **Trivy**. Он сканирует Docker-образ на наличие CVE в ОС и библиотеках.
*   Настроен файл **`.trivyignore`** для игнорирования уязвимостей, которые не относятся к runtime-коду (например, встроенные в npm пакеты).
*   В `Dockerfile` добавлено обновление системных пакетов Alpine (`apk upgrade`) и удаление `npm` из финального production-образа для уменьшения поверхности атаки.
*   Пайплайн блокирует деплой, если Trivy находит критические уязвимости.