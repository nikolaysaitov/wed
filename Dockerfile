# Отдельный этап для Nginx
FROM nginx:alpine

# Копируем собранные файлы React-приложения из предыдущего этапа
COPY /dist /usr/share/nginx/html

# Копируем кастомный nginx.conf в контейнер
COPY nginx.conf /etc/nginx/nginx.conf

# Открываем порт 80 для внешних запросов
EXPOSE 80

# Команда для запуска Nginx в фоновом режиме при старте контейнера
CMD ["nginx", "-g", "daemon off;"]