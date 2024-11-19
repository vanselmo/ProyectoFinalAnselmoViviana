# Proyecto Final - Adoptme 

Este proyecto es una aplicación desarrollada en JavaScript que utiliza una base de datos MongoDB para su funcionamiento. A continuación, encontrarás las instrucciones detalladas para configurar, ejecutar y utilizar este proyecto utilizando Docker.

## Requisitos previos

Antes de comenzar, asegúrate de tener instalados los siguientes componentes en tu sistema:

- [Docker Desktop](https://www.docker.com/get-started)
- Una instancia de MongoDB accesible y la URI correspondiente para la conexión.

## Despliegue utilizando Docker

### 1. Descargar la imagen de Docker

La imagen Docker del proyecto está disponible en Docker Hub. Puedes descargarla ejecutando:

`
docker pull vanselmo/pf-claudia-anselmo:latest
`

### 2. Configurar la variable de entorno MONGODB_STRING

La aplicación requiere la variable de entorno **MONGODB_STRING** para conectarse a la base de datos MongoDB. Esta variable debe contener la URI de conexión a tu base de datos.

Por ejemplo:

`MONGODB_STRING="mongodb+srv://<usuario>:<password>@<cluster>.mongodb.net/<nombreDB>?retryWrites=true&w=majority"`

Asegúrate de reemplazar `<usuario>`, `<password>`, `<cluster>` y `<nombreDB>` con los valores correctos para tu configuración.

### 3. Ejecutar la imagen Docker

Una vez que hayas configurado la URI de MongoDB, puedes ejecutar el contenedor con el siguiente comando:

`
docker run -d \
  -p 8081:8080 \
  -e MONGODB_STRING="mongodb+srv://<usuario>:<password>@<cluster>.mongodb.net/<nombreDB>?retryWrites=true&w=majority" \
  vanselmo/pf-claudia-anselmo:latest
`

Este comando hará lo siguiente:

- Ejecutará el contenedor en segundo plano (-d).
- Expondrá la aplicación en el puerto 8081 del host.
- Configurará la variable de entorno MONGODB_STRING en el contenedor.

### 4. Acceso a la aplicación

Una vez que el contenedor esté en ejecución, la aplicación estará disponible en:

`
http://localhost:8081
`

### 5. Verificar el estado del contenedor

Para verificar que el contenedor esté corriendo correctamente, puedes usar:

`
docker ps
`

### 6. Detener el contenedor

Si necesitas detener el contenedor, puedes hacerlo ejecutando:

`docker stop <container_id>`

Reemplaza `<container_id>` con el ID del contenedor que aparece en la lista de docker ps.

¡Gracias por usar este proyecto!