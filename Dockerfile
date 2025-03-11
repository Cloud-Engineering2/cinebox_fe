# Step 1: Nginx 컨테이너에서 정적 파일 서빙
FROM nginx:latest
COPY nginx.conf /etc/nginx/nginx.conf # Nginx 설정 복사 (optional)
COPY ./build /usr/share/nginx/html # React/Vue 빌드 결과물 배포
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
