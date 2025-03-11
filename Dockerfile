# Step 1: Nginx 컨테이너에서 정적 파일 서빙
FROM nginx:latest
# COPY nginx.conf /etc/nginx/nginx.conf
COPY ./build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
