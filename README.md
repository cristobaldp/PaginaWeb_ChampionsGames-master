# Champion Games

Champion Games es una aplicación web interactiva que permite al usuario elegir entre pares de videojuegos, registrar sus preferencias y generar un ranking personalizado según sus elecciones [file:1].

## Descripción

La web presenta dos videojuegos en pantalla y solicita al usuario que elija cuál prefiere.  
A medida que avanza la interacción, el sistema adapta las siguientes comparaciones y, al finalizar, muestra un ranking final con los juegos más valorados por el usuario [file:1].

## Objetivo del proyecto

El objetivo principal es ayudar al usuario a identificar qué videojuegos encajan mejor con sus gustos, a partir de un proceso de selección visual, dinámico y sencillo [file:1].

## Funcionalidades

- Comparación entre dos videojuegos en cada ronda [file:1].
- Selección guiada por el usuario para registrar preferencias [file:1].
- Obtención de juegos desde una base de datos MongoDB [file:1].
- Selección aleatoria de juegos para cada nueva comparación [file:1].
- Generación de un ranking personalizado al finalizar las elecciones [file:1].
- Interfaz moderna con estilo visual tipo gaming y animaciones [file:1].

## Tecnologías utilizadas

### Frontend
- React [file:1]
- Vite [file:1]
- JavaScript [file:1]
- CSS [file:1]

### Backend
- Node.js [file:1]
- Express [file:1]
- MongoDB [file:1]
- Mongoose [file:1]

### Herramientas de trabajo
- Visual Studio Code [file:1]
- Git [file:1]
- Discord [file:1]
- Jira [file:1]

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

- `Home.jsx`: página de inicio [file:1].
- `GameChooser.jsx`: pantalla donde se comparan los videojuegos [file:1].
- `Ranking.jsx`: vista final con el ranking personalizado [file:1].

## Flujo de funcionamiento

1. El frontend solicita los videojuegos al backend [file:1].
2. El backend obtiene los datos desde MongoDB [file:1].
3. Los juegos se barajan aleatoriamente para evitar sesgos [file:1].
4. El usuario va eligiendo entre dos opciones en cada ronda [file:1].
5. El sistema registra los votos y actualiza el juego campeón [file:1].
6. Al llegar al número máximo de elecciones, se genera el ranking final [file:1].

## Backend

El backend se encarga de la conexión con la base de datos, la creación de modelos y la gestión de operaciones CRUD [file:1].

### Componentes del backend
- `index.js`: punto de entrada y pruebas de conexión/API [file:1].
- `models/`: definición de esquemas con Mongoose [file:1].
- `dao/`: operaciones de crear, leer, actualizar y borrar [file:1].
- `controllers/`: lógica intermedia entre rutas y datos [file:1].
- `routes/`: endpoints disponibles para el frontend [file:1].

## Frontend

El frontend está desarrollado con React y organizado en carpetas para componentes reutilizables, páginas y recursos estáticos [file:1].

### Elementos importantes
- `components/`: componentes visuales reutilizables [file:1].
- `mock/`: datos de prueba para simular el backend [file:1].
- `pages/`: pantallas principales de la aplicación [file:1].

## Diseño visual

La interfaz apuesta por un estilo limpio, moderno y visualmente atractivo, con elementos como fondos animados, bordes neón, tipografías estilizadas y tarjetas flotantes [file:1].

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

La aplicación expone endpoints REST para obtener juegos, guardar datos y gestionar el ranking final [file:1].

## Resultado final

El sistema permite seleccionar videojuegos de forma intuitiva, mantener un campeón persistente durante las comparaciones y mostrar un ranking final ordenado, visual y centrado en las preferencias del usuario [file:1].

## Autoría

Proyecto desarrollado como una aplicación web de selección de videojuegos y ranking personalizado [file:1].
