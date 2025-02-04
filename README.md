# Backend y Frontend para ANEUPI

Este repositorio contiene el código fuente del backend y el frontend para ANEUPI.

## Configuración del Entorno

Antes de ejecutar el proyecto, asegúrate de tener Node.js y npm instalados en tu sistema. Puedes instalar las dependencias del proyecto ejecutando el siguiente comando en la raíz de cada directorio (backend y frontend):

npm install

## Backend

El backend está desarrollado en Node.js utilizando Sequelize como ORM para interactuar con la base de datos.

### Pasos para Configurar el Backend

#### Eliminar Base de Datos Existente (Opcional):

1. Ejecuta el siguiente comando para eliminar la base de datos existente (si la hay). Ten en cuenta que esto borrará todos los datos de la base de datos:

```
npm run drop
```

#### Crear y Migrar Nueva Base de Datos:

2. Ejecuta el siguiente comando para crear y migrar una nueva base de datos utilizando la configuración especificada en config/config.js:

```
npm run initialize
```

#### Iniciar el Servidor Backend:

3. Ejecuta el siguiente comando para iniciar el servidor backend en localhost:5000:

```
npm run start
```

## Frontend

El frontend está desarrollado en React y utiliza Vite como herramienta de construcción.

### Configuración del Entorno para el Frontend

Crea un archivo .env en la raíz del directorio frontend y añade la siguiente configuración para especificar la URL del backend:

```
VITE_API_URL=http://localhost:5000
```

### Pasos para Configurar el Frontend

#### Instalar Dependencias:

1. Ejecuta el siguiente comando para instalar todas las dependencias necesarias para el frontend:

```
npm install
```

#### Iniciar el Servidor de Desarrollo:

2. Ejecuta el siguiente comando para iniciar el servidor de desarrollo del frontend en localhost:5173:

```
npm run dev
```
