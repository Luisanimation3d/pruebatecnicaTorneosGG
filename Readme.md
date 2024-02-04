# Prueba tecnica para vacante fullstack

**Por** Luis Angel Correa Ramírez

luisangelcorreadev@gmail.com

Este es un proyecto que consta de un frontend hecho con React y un backend hecho con Node.js y Express.

## Frontend (React y Typescript)

### Instalación

1. Clona este repositorio en tu máquina local.
2. Abre una terminal en el directorio del proyecto `frontend-react`.
3. Ejecuta el siguiente comando para instalar las dependencias:

```bash
npm install
```

### Configuración

No se requiere configuración adicional para el frontend.

### Ejecución

Para ejecutar el frontend en modo de desarrollo, utiliza el siguiente comando:

```bash
npm run dev
```

Esto iniciará el servidor de desarrollo de Vite y podrás acceder al frontend en `http://localhost:5173`.



## Backend (Node.js y Express)

### Instalación

1. Abre una terminal en el directorio del proyecto `backend`.
2. Ejecuta el siguiente comando para instalar las dependencias:

```bash
npm install
```

### Ejecución

Para ejecutar el backend en modo de desarrollo, utiliza el siguiente comando:

```bash
npm run dev
```

Esto iniciará el servidor Express utilizando `ts-node-dev` para la recarga automática en cada cambio en el código fuente.

Para construir y ejecutar el backend en un entorno de producción, primero compila el código TypeScript utilizando:

```bash
npm run build
```

Y luego ejecuta el servidor con:

```bash
npm start
```

## Arquitectura Cliente-Servidor con API RESTful

Este proyecto sigue una arquitectura cliente-servidor basada en el modelo Cliente-Servidor, donde el cliente (frontend) y el servidor (backend) son componentes independientes que se comunican entre sí a través de una API RESTful (Representational State Transfer).

## Descripción

En esta arquitectura:

- **Cliente (Frontend)**: Es la interfaz de usuario de la aplicación, que generalmente se ejecuta en un navegador web o en una aplicación móvil. El cliente envía solicitudes al servidor para acceder a los recursos y servicios proporcionados por la aplicación.

- **Servidor (Backend)**: Es el componente que proporciona los recursos y servicios solicitados por el cliente. En este proyecto, el backend está construido con Node.js y Express, y proporciona una API RESTful para interactuar con los datos y la lógica de la aplicación.

- **API RESTful**: Es una interfaz de programación de aplicaciones que sigue los principios del estilo arquitectónico REST (Representational State Transfer). Utiliza métodos estándar HTTP (GET, POST, PUT, DELETE) para realizar operaciones CRUD (Crear, Leer, Actualizar, Eliminar) en los recursos de la aplicación. La API RESTful define endpoints (URLs) para cada recurso y utiliza los códigos de estado HTTP para indicar el resultado de las operaciones.

## Beneficios

- **Desacoplamiento**: La arquitectura cliente-servidor permite que el cliente y el servidor sean desarrollados y escalados de forma independiente. Esto facilita la gestión y el mantenimiento de la aplicación.

- **Interoperabilidad**: La API RESTful proporciona una interfaz estándar que permite que diferentes clientes (por ejemplo, aplicaciones web, aplicaciones móviles) interactúen con el servidor de manera uniforme, independientemente de la plataforma o tecnología utilizada.

- **Escalabilidad**: La arquitectura cliente-servidor permite escalar horizontalmente tanto el cliente como el servidor para manejar un mayor volumen de tráfico y usuarios concurrentes.

## Uso

Para comenzar a utilizar la aplicación:

1. Clona este repositorio en tu máquina local.
2. Sigue las instrucciones proporcionadas en los directorios `frontend` y `backend` para instalar las dependencias y ejecutar los respectivos servidores.



![](C:\Users\LUIS%20ANGEL\AppData\Roaming\marktext\images\2024-02-04-15-41-07-image.png)

![](C:\Users\LUIS%20ANGEL\AppData\Roaming\marktext\images\2024-02-04-15-47-55-image.png)

![](C:\Users\LUIS%20ANGEL\AppData\Roaming\marktext\images\2024-02-04-15-48-12-image.png)

![](C:\Users\LUIS%20ANGEL\AppData\Roaming\marktext\images\2024-02-04-15-48-31-image.png)

![](C:\Users\LUIS%20ANGEL\AppData\Roaming\marktext\images\2024-02-04-15-41-28-image.png)

![](C:\Users\LUIS%20ANGEL\AppData\Roaming\marktext\images\2024-02-04-15-41-42-image.png)

![](C:\Users\LUIS%20ANGEL\AppData\Roaming\marktext\images\2024-02-04-15-45-51-image.png)

![](C:\Users\LUIS%20ANGEL\AppData\Roaming\marktext\images\2024-02-04-15-47-17-image.png)

![](C:\Users\LUIS%20ANGEL\AppData\Roaming\marktext\images\2024-02-04-15-47-30-image.png)

![](C:\Users\LUIS%20ANGEL\AppData\Roaming\marktext\images\2024-02-04-15-49-08-image.png)

![](C:\Users\LUIS%20ANGEL\AppData\Roaming\marktext\images\2024-02-04-15-49-22-image.png)

![](C:\Users\LUIS%20ANGEL\AppData\Roaming\marktext\images\2024-02-04-15-55-35-image.png)

![](C:\Users\LUIS%20ANGEL\AppData\Roaming\marktext\images\2024-02-04-15-50-01-image.png)

![](C:\Users\LUIS%20ANGEL\AppData\Roaming\marktext\images\2024-02-04-15-52-19-image.png)

![](C:\Users\LUIS%20ANGEL\AppData\Roaming\marktext\images\2024-02-04-15-52-56-image.png)

![](C:\Users\LUIS%20ANGEL\AppData\Roaming\marktext\images\2024-02-04-15-54-25-image.png)
