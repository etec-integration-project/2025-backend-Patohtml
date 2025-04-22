# Etapa 1: construir el frontend con Node.js
FROM node:18 AS builder

WORKDIR /app

# Copiar primero los archivos de dependencias para aprovechar la caché
COPY package*.json ./
RUN npm install

# Copiar el resto del código fuente
COPY . .

# Construir la aplicación
RUN npm run build
RUN ls -la build/

# Etapa 2: usar nginx para servir los archivos estáticos
FROM nginx:alpine

# Crear un usuario no root para nginx
RUN adduser -D -g '' nginxuser

# Copiar el build de React a la carpeta pública de nginx
COPY --from=builder /app/build /usr/share/nginx/html

# Verificar el contenido copiado
RUN ls -la /usr/share/nginx/html/

# Copiar la configuración personalizada de nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Cambiar los permisos de los archivos
RUN chown -R nginxuser:nginxuser /usr/share/nginx/html && \
    chmod -R 755 /usr/share/nginx/html && \
    chown -R nginxuser:nginxuser /var/cache/nginx && \
    chown -R nginxuser:nginxuser /var/log/nginx && \
    chown -R nginxuser:nginxuser /etc/nginx/conf.d && \
    touch /var/run/nginx.pid && \
    chown -R nginxuser:nginxuser /var/run/nginx.pid

# Cambiar al usuario no root
USER nginxuser

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
