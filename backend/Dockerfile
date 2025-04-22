# Usar una imagen base de Node.js
FROM node:18

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar solo package.json y package-lock.json
COPY package*.json ./

# Instalar todas las dependencias, incluido bcrypt
RUN npm install

# Instalar nodemon globalmente
RUN npm install -g nodemon

# Copiar el resto del código fuente
COPY . .

# Exponer el puerto 3001
EXPOSE 3001

# Iniciar la aplicación
CMD ["npm", "run", "dev"]
