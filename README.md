# 2025-Backend Project

![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)
![Backend: Express](https://img.shields.io/badge/Backend-Express-green)
![Frontend: React](https://img.shields.io/badge/Frontend-React-blue)
![Database: MySQL](https://img.shields.io/badge/Database-MySQL-orange)

## 📝 Descripción

Este proyecto es una aplicación web full-stack con una arquitectura de microservicios containerizada usando Docker. Incluye un backend en Node.js/Express, un frontend en React, y una base de datos MySQL.

### Backend
- Node.js
- Express
- Sequelize ORM
- JWT para autenticación
- MySQL como base de datos

### Frontend
- React
- React Router
- Axios para peticiones HTTP
- SweetAlert2 para notificaciones
- React Icons

### Infraestructura
- Docker y Docker Compose
- Nginx como servidor web para el frontend
- Contenedores separados para cada servicio

## 🚀 Instalación y Ejecución

### Requisitos Previos
- Docker y Docker Compose
- Git

### Pasos para Iniciar el Proyecto

1. Clonar el repositorio:
   ```bash
   git clone https://github.com/tuusuario/2025-backend-Patohtml.git
   cd 2025-backend-Patohtml
   ```

2. Iniciar los servicios con Docker Compose:
   ```bash
   docker-compose up -d
   ```

3. Acceder a la aplicación:
   - Frontend: http://localhost:8080
   - Backend API: http://localhost:3001

## 📚 Estructura del Proyecto

```
2025-backend-Patohtml/
├── backend/         # Servidor Node.js con Express
├── frontend/        # Aplicación React
├── db/              # Datos persistentes de MySQL
└── docker-compose.yml
```

## 👨‍💻 Desarrollo

### Backend
```bash
cd backend
npm install
npm run dev
```

### Frontend
```bash
cd frontend
npm install
npm start
```

## 📜 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo LICENSE para más detalles.

## 📞 Contacto

Para cualquier consulta, no dudes en contactarnos a través de [tu-email@example.com].
