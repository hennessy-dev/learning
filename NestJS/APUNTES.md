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
- ParseFilePipe ??
- ParseDatePipe