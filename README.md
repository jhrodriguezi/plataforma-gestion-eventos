# Descripción
API RESTful para una plataforma de gestión de eventos, desarrollada en Node.js utilizando Express.

# Información Importante

El link del video explicando este proyecto se puede encontrar a continuación:
- https://youtu.be/KTXnDkKHEKg

Los scripts SQL (DDL & DML) se encuentran en la carpeta src/infrastructure/database. Se usaron algunas utilidades para cargar tanto las definiciones de la base de datos, como las sentencias de manipulación. Dichas utilidades se pueden encontrar en src/utils.

En la carpeta **docs** se encuentran los diagramas relativos al modelo de datos y al flujo de CI/CD.

# Instalación
Instrucciones para instalar el proyecto en un entorno local.

Este proyecto hace uso de la herramienta DevBox para aislar el entorno de desarrollo. Si cuenta con ella, haga
```bash
devbox shell
```
esto deberia descargar las depedencias necesarias para la ejecución del poryecto. En el caso contrario, tiene que asegurarse de tener las dependencias instaladas en su maquinas para ejecutar el proyecto. Por el momento, solo se incluye nodejs en su versión 22.8.0 como unica dependencia.

Pasos para la Instalación: Pasos para clonar el repositorio y configurar el entorno.
```bash
# Clonar el repositorio
git clone https://github.com/jhrodriguezi/plataforma-gestion-eventos.git

# Navegar al directorio del proyecto
cd plataforma-gestion-eventos

# Opcional, si tiene devbox
devbox shell

# Instalar dependencias
npm install
```

# Configuración
La unica configuración que debe establecerse es la de asignar los valores a las variables de entorno. Puede encontrar una plantilla de como deben lucir esas variables de entorno en el archivo .env.example

# Ejecución
Este proyecto se encuentra contenerizado lo que quiere decir que si tiene docker compose, solo le basta con ejecutar el siguiente comando para probar en ejecución la api:

```bash
docker compose up -d
```
el balanceador de carga puede ser accedido en el puerto 80.

## Descripciones de las capas

### Config
Contiene archivos de configuración y constantes utilizadas en toda la aplicación.

### Dominio
El núcleo de la aplicación, que contiene la lógica y las reglas de negocio.

- Entidades: Definen los objetos principales de la aplicación (Evento, Localización, LugarCercano, Usuario).
- Interfaces: Definen los contratos para los repositorios, garantizando un acoplamiento flexible entre las capas de dominio e infraestructura.

### Infraestructura
Gestiona los problemas externos e implementa las interfaces definidas en la capa de dominio.

- Base de datos: Contiene implementaciones específicas de la base de datos.
- Repositorios: Implementa las interfaces de repositorio definidas en la capa de dominio.
- DIContenedor: Gestiona la inyección de dependencias para la aplicación.

### Presentación
Gestiona el mecanismo de entrega de la aplicación.

- Controladores: Gestionan las peticiones entrantes y devuelven las respuestas adecuadas.

- Middleware: Contiene funciones de middleware para el procesamiento de peticiones.

- Rutas: Define las rutas API de la aplicación.

### Casos de Uso
Contiene las reglas de negocio específicas de la aplicación. Cada caso de uso representa una acción o flujo específico en la aplicación.
Utilidades
Funciones de utilidad y ayudantes utilizados en toda la aplicación.

## Principios de arquitectura

- Separación de responsabilidades: Cada capa tiene una responsabilidad específica.
- Regla de dependencia: las capas internas no dependen de las externas. Las dependencias apuntan hacia dentro.
- Abstracción: Uso de interfaces para definir contratos entre capas.