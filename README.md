🍕 Restaurante Italiano Favio
Bienvenido al frontend del proyecto de Restaurante Italiano Favio, donde los usuarios pueden personalizar y ordenar pizzas. Este frontend está desarrollado con React, TypeScript y TailwindCSS, interactuando con una API RESTful para gestionar usuarios, pedidos y más.

🌟 Características Principales
Autenticación de usuarios: Registro, inicio de sesión y cierre de sesión.

Personalización de pizzas: Los usuarios pueden elegir ingredientes, tamaño, masa y salsa para crear una pizza única.

Carrito de compras: Los usuarios pueden agregar pizzas al carrito y gestionar la cantidad.

Realización de pedidos: Los usuarios pueden realizar pedidos, enviando la información al backend para su procesamiento.

🛠 Tecnologías Usadas
React: Librería para construir interfaces de usuario interactivas.

TypeScript: Lenguaje que extiende JavaScript con tipado estático.

Vite: Herramienta de construcción rápida para proyectos modernos de JavaScript/TypeScript.

TailwindCSS: Framework de CSS para crear diseños responsivos y personalizados.

Axios: Cliente HTTP para realizar peticiones a la API del backend.

React Router: Para la navegación entre las diferentes vistas de la aplicación.

JWT: Para la autenticación y la gestión de sesiones de los usuarios.

🚀 Instalación
1. Clonar el repositorio
Primero, clona el repositorio en tu máquina local:

bash
Copiar código
git clone <URL_DEL_REPOSITORIO>
cd restaurante-italiano-favio-s
2. Instalar las dependencias
Instala las dependencias necesarias para el proyecto:

bash
Copiar código
npm install
3. Ejecutar el proyecto en modo desarrollo
Inicia el servidor de desarrollo con el siguiente comando:

bash
Copiar código
npm run dev
La aplicación estará disponible en http://localhost:3000.

📝 Scripts Disponibles
Aquí tienes los scripts más útiles para el proyecto:

npm run dev: Inicia el servidor de desarrollo.

npm run build: Compila el proyecto para producción.

npm run preview: Muestra una vista previa de la aplicación construida.

npm run lint: Ejecuta el linter para asegurarse de que el código esté limpio.

📂 Estructura del Proyecto
Este es un vistazo a la estructura de carpetas de la aplicación:

bash
Copiar código
src/
│
├── components/          # Componentes reutilizables (Header, Pizzas, etc.)
├── context/             # Contexto para gestionar el estado global (autenticación)
├── pages/               # Páginas principales (Home, CrearPizza, BackOffice, etc.)
├── reducers/            # Reducers para gestionar el estado de la app
├── service/             # Servicios para interactuar con la API (login, pedidos, etc.)
├── types/               # Tipos de TypeScript para las entidades principales (Pizza, User)
└── utils/               # Funciones de utilidad (calcular precios, etc.)
🤝 Contribuciones
¡Las contribuciones son bienvenidas! Si deseas contribuir a este proyecto, por favor sigue estos pasos:

Haz un fork del repositorio.

Crea una nueva rama para tu funcionalidad (git checkout -b feature/nueva-funcionalidad).

Realiza los cambios y haz commit (git commit -m 'Añadir nueva funcionalidad').

Haz push a tu rama (git push origin feature/nueva-funcionalidad).

Abre un Pull Request detallando los cambios realizados.

📝 Licencia
Este proyecto está bajo la Licencia MIT. Puedes ver los detalles de la licencia en el archivo LICENSE.

