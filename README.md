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
*   Настроено кэширование зависимостей (`node_modules`) в GitHub Actions для ускорения пайплайна (используется `actions/cache`).
*   Настроено версионирование образов: помимо тега `latest`, каждый образ получает уникальный тег на основе хэша коммита (`${{ github.sha }}`) для прозрачного контроля версий и возможности быстрого отката.

### 🚀 CD (Continuous Deployment)
*   Настроен автоматический деплой на платформу **Render**.
*   Связь между GitHub Actions и Render реализована через **Deploy Hook** (секретная ссылка в GitHub Secrets).
*   После успешной сборки образа GitHub Actions отправляет сигнал на Render, и тот автоматически подтягивает свежий образ из GHCR.

### 🛡️ DevSecOps (Безопасность)
*   Добавлен **`npm audit`** для проверки зависимостей на известные уязвимости перед сборкой.
*   Интегрирован сканер уязвимостей **Trivy**. Он сканирует Docker-образ на наличие CVE в ОС и библиотеках.
*   Настроен файл **`.trivyignore`** для игнорирования уязвимостей, которые не относятся к runtime-коду.
*   В `Dockerfile` добавлено обновление системных пакетов Alpine (`apk upgrade`) и удаление `npm` из финального production-образа для уменьшения поверхности атаки.
*   Пайплайн блокирует деплой, если Trivy находит критические уязвимости.
*   Интегрирован **Gitleaks** (`.github/workflows/gitleaks.yml`) для автоматического поиска случайно закоммиченных секретов (паролей, токенов) во всей истории коммитов.

## ⏭️ Планы на будущее (To-Do)
*   **[ ] Продвинутое версионирование:** Перейти на генерацию семантических версий (SemVer) с помощью `docker/metadata-action` при создании git-тегов.
*   **[ ] Dependabot / Renovate:** Настроить ботов для автоматического создания PR с обновлениями зависимостей и базовых Docker-образов.
*   **[ ] Интеграция тестов в Docker:** Перенести прогон тестов на этап сборки Docker-образа (multi-stage build).