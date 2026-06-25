# Champion Games

Champion Games es una aplicación web interactiva que permite al usuario elegir entre pares de videojuegos, registrar sus preferencias y generar un ranking personalizado según sus elecciones .

## Descripción

La web presenta dos videojuegos en pantalla y solicita al usuario que elija cuál prefiere.  
A medida que avanza la interacción, el sistema adapta las siguientes comparaciones y, al finalizar, muestra un ranking final con los juegos más valorados por el usuario .

## Objetivo del proyecto

El objetivo principal es ayudar al usuario a identificar qué videojuegos encajan mejor con sus gustos, a partir de un proceso de selección visual, dinámico y sencillo .

## Funcionalidades

- Comparación entre dos videojuegos en cada ronda .
- Selección guiada por el usuario para registrar preferencias .
- Obtención de juegos desde una base de datos MongoDB .
- Selección aleatoria de juegos para cada nueva comparación .
- Generación de un ranking personalizado al finalizar las elecciones .
- Interfaz moderna con estilo visual tipo gaming y animaciones .

## Tecnologías utilizadas

### Frontend
- React
- Vite 
- JavaScript
- CSS 

### Backend
- Node.js 
- Express 
- MongoDB 
- Mongoose 

### Herramientas de trabajo
- Visual Studio Code 
- Git 
- Discord 
- Jira 

## Estructura del proyecto

```bash
project/
├── backend/
│   ├── controllers/
│   ├── dao/
│   ├── models/
│   ├── routes/
│   └── index.js
└── frontend/
    ├── public/
    ├── src/
    │   ├── assets/
    │   ├── components/
    │   ├── mock/
    │   ├── pages/
    │   ├── App.jsx
    │   ├── App.css
    │   ├── index.css
    │   └── main.jsx
    └── vite.config.js
```

## Páginas principales

- `Home.jsx`: página de inicio .
- `GameChooser.jsx`: pantalla donde se comparan los videojuegos .
- `Ranking.jsx`: vista final con el ranking personalizado .

## Flujo de funcionamiento

1. El frontend solicita los videojuegos al backend .
2. El backend obtiene los datos desde MongoDB .
3. Los juegos se barajan aleatoriamente para evitar sesgos .
4. El usuario va eligiendo entre dos opciones en cada ronda .
5. El sistema registra los votos y actualiza el juego campeón .
6. Al llegar al número máximo de elecciones, se genera el ranking final .

## Backend

El backend se encarga de la conexión con la base de datos, la creación de modelos y la gestión de operaciones CRUD.

### Componentes del backend
- `index.js`: punto de entrada y pruebas de conexión/API .
- `models/`: definición de esquemas con Mongoose .
- `dao/`: operaciones de crear, leer, actualizar y borrar .
- `controllers/`: lógica intermedia entre rutas y datos.
- `routes/`: endpoints disponibles para el frontend .

## Frontend

El frontend está desarrollado con React y organizado en carpetas para componentes reutilizables, páginas y recursos estáticos .

### Elementos importantes
- `components/`: componentes visuales reutilizables .
- `mock/`: datos de prueba para simular el backend .
- `pages/`: pantallas principales de la aplicación.

## Diseño visual

La interfaz apuesta por un estilo limpio, moderno y visualmente atractivo, con elementos como fondos animados, bordes neón, tipografías estilizadas y tarjetas flotantes .

## Instalación

```bash
# Clonar el repositorio
git clone <URL_DEL_REPOSITORIO>

# Instalar dependencias del frontend
cd frontend
npm install

# Instalar dependencias del backend
cd ../backend
npm install
```

## Ejecución

```bash
# Iniciar backend
cd backend
npm run dev

# Iniciar frontend
cd frontend
npm run dev
```

## API

La aplicación expone endpoints REST para obtener juegos, guardar datos y gestionar el ranking final .

## Resultado final

El sistema permite seleccionar videojuegos de forma intuitiva, mantener un campeón persistente durante las comparaciones y mostrar un ranking final ordenado, visual y centrado en las preferencias del usuario .

## Autoría

Proyecto desarrollado como una aplicación web de selección de videojuegos y ranking personalizado .
