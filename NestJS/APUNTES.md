# Apuntes Relevantes de NestJS

Es un framework backend que usa JS/TS para su desarrollo, tiene una estructura bien definida y cuenta con todas las herramientas necesarias para un Backend escalable y optimizado, lo cual permite un desarrollo solido y consistente debido a que es un framework muy completo, sin embargo tiene un core agnostico, es decir que puede utilizar ExpressJS, Fastify o cualquier otra libreria para ejecutar codigo de servidor.

NestJS implementa un patrón de diseño fuertemente inspirado en Arquitectura Modular y Patrón Inyector de Dependencias (Dependency Injection - DI), con componentes específicos para servicios, controladores y módulos.
---

## Módulos:

Son las unidades organizativas fundamentales en NestJS. Agrupan un conjunto de funcionalidades relacionadas, encapsulando controladores, servicios, proveedores y otros módulos. Un módulo define el alcance de sus componentes y cómo se relacionan entre sí. Se podría ver como un Contexto Delimitado (Bounded Context) en un diseño de microservicios o como un módulo cohesivo en una aplicación monolítica.

- Patrón: Se alinea con el principio de Cohesión Fuerte y Acoplamiento Débil.

---

## Controladores:

Son los encargados de manejar las solicitudes entrantes (HTTP en la mayoría de los casos) y devolver las respuestas correspondientes. Contienen la lógica de enrutamiento y delegan la lógica de negocio a los servicios. Son el punto de entrada de la aplicación desde el exterior.

- Patrón: Actúan como la capa de Presentación o Interfaz de Usuario (UI), siguiendo el patrón Controlador (Controller) de un MVC o similar.

---

## Servicios:

Contienen la lógica de negocio principal de la aplicación. Son clases que encapsulan operaciones específicas y son "inyectadas" en los controladores (o en otros servicios) donde se necesitan. Su objetivo es desacoplar la lógica de negocio de la capa de presentación.

- Patrón: Representan la capa de Lógica de Negocio (Business Logic) o Servicio (Service Layer). Se benefician enormemente de la Inversión de Control (Inversion of Control - IoC) a través de la inyección de dependencias, lo que facilita la prueba y el mantenimiento del código.

---

## Pipes:

Los Pipes tienes dos usos tipicos, son transformadores de datos y validadores, se llaman dentro de la ruta de un Controlador y su proposito es recibir el dato de la peticion, parsearlo al tipo de dato especificado y validarlo, en caso de no ser posible el parseo arroja un error, estos son los pipes built-in que maneja NestJS:

- ValidationPipe
- ParseIntPipe
- ParseFloatPipe
- ParseBoolPipe
- ParseArrayPipe
- ParseUUIDPipe
- ParseEnumPipe
- DefaultValuePipe
- ParseFilePipe
- ParseDatePipe

---

## Exception Filters

Los Exception Filters en NestJS son una capa de manejo de errores que permite interceptar excepciones no controladas en toda la aplicación.

NestJS provee una capa de manejo de excepciones HTTP robusta y fácil de usar, construida sobre la clase base **HttpException**. Esta clase permite lanzar errores con un código de estado HTTP específico y un cuerpo de respuesta personalizado. Para facilitar el manejo de los errores HTTP más comunes, NestJS ofrece una serie de excepciones predefinidas que heredan de HttpException, encapsulando los códigos de estado HTTP correspondientes.


### Fundamentos e Importancia:

- **Normalización de Errores**: Permiten estandarizar la estructura de las respuestas de error (ej., códigos de estado HTTP, mensajes, detalles).
- **Separación de Preocupaciones**: Desacoplan la lógica de negocio del manejo de errores.
- **Flexibilidad**: Se pueden aplicar globalmente, a nivel de controlador o a nivel de método, y se pueden crear filtros personalizados para tipos específicos de excepciones.

---

## TypeORM

TypeORM es un ORM (Object-Relational Mapper) de TypeScript/JavaScript que permite trabajar con bases de datos relacionales y no relacionales utilizando objetos, eliminando la necesidad de escribir SQL directamente en la mayoría de los casos. Se integra de forma nativa y robusta con NestJS a través del módulo @nestjs/typeorm.

### Fundamentos:

- Mapeo Objeto-Relacional: Permite definir entidades (clases) que se mapean directamente a tablas en la base de datos, y propiedades de las entidades a columnas.
- Soporte Multi-Base de Datos: Compatible con PostgreSQL, MySQL, MariaDB, SQLite, Microsoft SQL Server, Oracle, SAP Hana, CockroachDB y MongoDB.
- Patrones de Diseño: Soporta los patrones Repository y ActiveRecord.
- Transacciones y Migraciones: Facilita la gestión de transacciones y el versionado del esquema de la base de datos a través de migraciones.
- Productividad: Reduce drásticamente el tiempo de desarrollo al abstraer las complejidades de las consultas SQL.
--- 

## Implementación de JWT, Guards y Autorizaciones: 

JWT (JSON Web Tokens): Son un estándar abierto para la creación de tokens que permiten la transmisión segura de información entre partes como un objeto JSON. En NestJS, se usan comúnmente para la autenticación sin estado, donde el token contiene la información del usuario una vez autenticado.

Autorizaciones: Es el proceso de determinar si un usuario autenticado tiene permiso para realizar una acción o acceder a un recurso específico. En NestJS, se implementa a menudo con Guards y Decoradores personalizados.

Guards: Son clases que implementan la interfaz CanActivate y deciden si una ruta puede ser activada basándose en ciertas condiciones (ej., si el usuario tiene un rol específico).

### Importancia: 

 - Control de Acceso (Autorización): Garantiza que solo los usuarios autorizados puedan acceder a funcionalidades o datos sensibles.
 - Estrategias de Passport.js: NestJS se integra a menudo con Passport.js para la autenticación JWT, facilitando la creación de estrategias para la validación del token.
 - Autenticación sin Estado (JWT): Los servidores no necesitan mantener una sesión para cada usuario, escalando mejor aplicaciones distribuidas.
---

## WebSockets

Los WebSockets son un protocolo de comunicación bidireccional (full-duplex) persistente sobre una única conexión TCP. A diferencia de HTTP, que es unidireccional y de corta duración, los WebSockets permiten una comunicación en tiempo real y eficiente entre el cliente y el servidor.

### Fundamentos/Importancia: 
  - Comunicación en Tiempo Real: Ideal para aplicaciones que requieren actualizaciones instantáneas (chats, juegos multijugador, notificaciones, tableros en vivo).
  - Baja Latencia: Reduce la sobrecarga de la creación y cierre de conexiones, lo que resulta en una comunicación más rápida.
  - Bidireccionalidad: Tanto el cliente como el servidor pueden iniciar el envío de mensajes en cualquier momento.
  - Eficiencia: Una vez establecida la conexión, los encabezados se envían una sola vez, reduciendo el tráfico de red en comparación con el polling HTTP.
  - Integración en NestJS: NestJS proporciona soporte para WebSockets a través de @nestjs/platform-socket.io o @nestjs/platform-ws, facilitando la creación de servidores WebSocket.

### Gateways (para WebSockets)

En el contexto de WebSockets en NestJS, los Gateways son clases anotadas con @WebSocketGateway() que actúan como "manejadores" de eventos WebSocket. Son el equivalente a los controladores para HTTP, pero diseñados específicamente para la comunicación en tiempo real.

### Fundamentos/Importancia:
  - Manejo de Eventos WebSocket: Permiten definir métodos que se ejecutan cuando se recibe un evento específico del cliente WebSocket (ej., @SubscribeMessage('chatMessage')).
  - Inyección de Dependencias: Los Gateways son clases regulares de NestJS y pueden inyectar servicios, repositorios u otros proveedores para manejar la lógica de negocio.
  - Control de Conexiones: Permiten controlar eventos de conexión (@WebSocketServer(), @OnGatewayConnection()) y desconexión (@OnGatewayDisconnect()).
  - Comunicación Cliente-Servidor-Cliente: Facilitan la emisión de eventos a clientes específicos o a todos los clientes conectados desde el servidor.
  - Organización del Código: Proporcionan una estructura clara y modular para el manejo de la lógica de WebSockets en la aplicación.