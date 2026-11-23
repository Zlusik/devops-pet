# DevOps Pet Project

Учебный проект для отработки практических навыков в DevOps: от написания кода до автоматического деплоя.

## 🚀 Ссылки на проект
*   **Живое приложение (Production):** [https://devops-pet-latest.onrender.com/](https://devops-pet-latest.onrender.com/)
*   **Сервис на Render (Dashboard):** [https://dashboard.render.com/](https://dashboard.render.com/) *(замените на прямую ссылку на ваш сервис, если она есть)*
*   **Docker-образ:** `ghcr.io/zlusik/devops-pet:latest`

## 📋 Ручки (Endpoints) API
На данный момент в приложении реализованы следующие маршруты:

*   `GET /health` 
    *   **Описание:** Проверка статуса (healthcheck).
    *   **Ответ:** `200 OK`, тело: `{"status": "ok"}`
*   `GET /hello`
    *   **Описание:** Приветственное сообщение.
    *   **Ответ:** `200 OK`, тело: `{"message": "Hello from DevOps pipeline!"}`
*   `GET /check`
    *   **Описание:** Тестовая ручка для проверки обновлений пайплайна.
    *   **Ответ:** `200 OK`, тело: `{"message": "check new endpoint. Hellow new best world"}`

## ✅ Что уже сделано (Путь 1: CI/CD)

### Непрерывная интеграция (CI)
*   Настроен минимальный проект на **Node.js** (Express).
*   Добавлен линтер (**ESLint**) и тесты (**Jest**).
*   Настроен пайплайн в **GitHub Actions** (`.github/workflows/ci.yml`), который при каждом пуше в `main` выполняет:
    *   Проверку кода (`lint`).
    *   Прогон тестов (`test`).
    *   Сборку мультиархитектурного Docker-образа (`linux/amd64`, `linux/arm64`) с использованием QEMU и Buildx.
    *   Пуш готового образа в **GitHub Container Registry (GHCR)**.

### Непрерывный деплой (CD)
*   Настроен автоматический деплой на платформу **Render**.
*   Связь между GitHub Actions и Render реализована через **Deploy Hook** (секретная ссылка спрятана в GitHub Secrets).
*   После успешной сборки образа GitHub Actions отправляет сигнал на Render, и тот автоматически подтягивает свежий образ `latest` из GHCR и перезапускает приложение.
*   Добавлен таймаут `--max-time 10` для команды `curl` в пайплайне, чтобы шаг деплоя не висел в ожидании ответа от сервера.

## ⏭️ Что дальше (Планы)
*   **Путь 2: DevSecOps.** Добавление сканирования уязвимостей (Trivy), проверки зависимостей (`npm audit`) и поиска утечек секретов.