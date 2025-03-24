# backend-koa
# NodePizzeriaBackend

Backend RESTful API para una pizzería, desarrollado con **Koa.js** y **MongoDB**. Implementa autenticación JWT, manejo de archivos con Cloudinary, y permite la gestión de usuarios, pedidos, ingredientes y pizzas.

## Características Principales

- CRUD de usuarios, pizzas, ingredientes y pedidos.
- Autenticación mediante JWT con Passport.
- Manejo de imágenes con Cloudinary.
- Middleware para protección de rutas y roles de usuario.
- Seeds para inicializar la base de datos.

## Requisitos Previos

- **Node.js** (v14 o superior)
- **MongoDB Atlas** o una instancia local de MongoDB

## Instalación

1. Clona el repositorio:
   ```bash
   git clone <URL_DEL_REPOSITORIO>
   cd backend-koa
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

3. Configura las variables de entorno en un archivo **.env** con el siguiente formato:
   ```env
   PORT=3000
   DATABASE_URL=mongodb+srv://<usuario>:<password>@cluster.mongodb.net/pizzeria
   JWT_SECRET_KEY=your_secret_key
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   ```

4. Inicia el servidor en modo de desarrollo:
   ```bash
   npm run dev
   ```

El servidor estará disponible en `http://localhost:3000`.

## Uso

### Endpoints Disponibles

#### 🔑 Autenticación
- `POST /users-dos/register` → Registro de usuarios.
- `POST /users-dos/login-jwt` → Inicio de sesión con JWT.
- `POST /users-dos/logout-jwt` → Cerrar sesión con token blacklist.

#### 🍕 Gestión de Pizzas
- `GET /pizzas` → Obtener todas las pizzas.
- `POST /pizzas` → Crear una nueva pizza.
- `PUT /pizzas/:id` → Editar una pizza.
- `DELETE /pizzas/:id` → Eliminar una pizza.

#### 🛒 Pedidos
- `POST /orders` → Crear un pedido.
- `GET /orders` → Obtener todos los pedidos.
- `GET /orders/:id` → Obtener un pedido por ID.

## Estructura del Proyecto

```bash
backend-koa/
│
├── config/          # Configuración del entorno y base de datos
├── controllers/     # Controladores de cada entidad
├── middlewares/     # Middlewares de autenticación y validación
├── models/          # Modelos de MongoDB con Mongoose
├── routes/          # Definición de rutas Koa
├── utils/           # Utilidades como manejo de JWT y subida de imágenes
├── index.js         # Punto de entrada del servidor
├── .env             # Variables de entorno (no subir a GitHub)
├── package.json     # Dependencias del proyecto
├── README.md        # Documentación del proyecto
```

## Scripts Disponibles

- `npm start` → Inicia el servidor en modo producción.
- `npm run dev` → Inicia el servidor en modo desarrollo con nodemon.

## Tecnologías Usadas

- **Node.js**
- **Koa.js**
- **MongoDB + Mongoose**
- **JSON Web Tokens (JWT)**
- **Cloudinary** (para almacenamiento de imágenes)
- **Bcrypt.js** (para hash de contraseñas)

## Contribuciones

¡Las contribuciones son bienvenidas! Para contribuir:

1. Haz un fork del repositorio.
2. Crea una nueva rama (`git checkout -b feature/nueva-funcionalidad`).
3. Realiza los cambios y haz commit (`git commit -m 'Añadir nueva funcionalidad'`).
4. Haz push a la rama (`git push origin feature/nueva-funcionalidad`).
5. Abre un Pull Request.

## Licencia

Este proyecto es solo para consulta y todos los derechos están reservados. No se permite su uso, modificación ni distribución sin el consentimiento del autor.

