# OneGroup-BackEnd

Este es un proyecto en Node.js que utiliza Express como framework para el desarrollo de API RESTful. El proyecto se ejecuta desde el archivo `Server.js` y proporciona tres rutas para interactuar con la base de datos.

## Ejecución del Proyecto

Para ejecutar el proyecto, asegúrate de tener Node.js instalado en tu sistema. Luego, puedes iniciar el servidor ejecutando el siguiente comando en tu terminal:

```bash
node Server.js
```
Esto iniciará el servidor y estará escuchando en el puerto especificado.

## Rutas Disponibles
```/api/videos```
Esta ruta trae todos los videos guardados en la base de datos.

```/api/videoID```
Esta ruta trae un video en particular por su ID.

```/api/uploadChunks```
Esta ruta carga a la base de datos un video por chunks.

### Conexión a la Base de Datos
El proyecto está conectado a una base de datos en MongoDB Atlas, una base de datos en la nube proporcionada por MongoDB. La conexión a la base de datos se encuentra en la capa de "Infrastructure".

Para establecer la conexión con MongoDB Atlas, asegúrate de tener las credenciales de acceso y el URI de conexión adecuados en el archivo de configuración o en la capa de infraestructura de tu proyecto.

Este README.md proporciona una visión general de alto nivel de tu proyecto, incluyendo cómo ejecutarlo, las rutas disponibles y cómo está conectado a MongoDB Atlas en la nube.
