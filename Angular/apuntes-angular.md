### [Certificado Angular](https://ed.team/u/juandavidcontrerashernandez/curso/angular)
---

# Apuntes Relevantes: Angular

## Angular CLI:

Angular brinda una interfaz de linea de comandos para facilitar y automatizar algunas funcionalidades importantes como:

* la generacion automatica de componentes
* compilación
* persistencia de cache
* configuracion de los valores del **angular.json**
* deploys
* correr herramientas de linting
* construir y servir la aplicacion
* actualizar el workspace y sus dependencias

---

## Data Bindings

### One-Way Data Binding:

los datos fluyen desde el componente TypeScript hacia el HTML, pero no al revés.

1. **Interpolación** {{ variable }}: Permite mostrar valores de propiedades del componente en el HTML.
2. **Property Binding** [attribute]: Enlaza propiedades o atributos de los elementos HTML a las propiedades del componente.
3. **Event Binding** (event): Responde a eventos del usuario y los enlaza con funciones o propiedades del componente.

### Two-Way Data Binding:

los datos fluyen desde el componente TypeScript hacia el HTML y viceversa, se escribe con la sintaxis conocida como "caja de bananas", combinando el Property Binding y el Event Binding, de esta forma **"[(ngModel)]="component.property"**

---

## Comunicación entre Componentes

Angular permite la comunicación entre componentes de padre a hijo y de hijo a padre de esta manera:

- la sintaxis de **[PropertyBinding]="value"** para *enviarle* un valor desde un componente padre hacia un componente hijo.
- la sintaxis **(EventBinding)="function($event)"** para recibir un valor desde un componente hijo hacia el padre.

---

## LazyLoading o Carga Diferida

Es un patron de diseño que retarda la carga o inicializacion de recursos en una aplicacion hasta el momento en que son realmente necesarios, en Angular esto siginifica que los modulos o componentes no se cargan al iniciar la aplicacion, sino que se cargan asincronicamente a medida que el usuario navega por la aplicacion, esto se logra usando el sistema de rutas de Angular.

---

## Formularios Reactivos

Es una herramienta o estructura de control que posee Angular para manejar de forma dinamica y reactiva los Formularios, A diferencia de los formularios basados en plantillas, los formularios reactivos construyen el modelo del formulario en la clase del componente, lo que facilita las pruebas unitarias, la validación compleja y la manipulación dinámica.

### Validaciones:

**Funcionamiento breve:**

1. **Definición del modelo:** Se construye el formulario en el componente usando`FormGroup` (para agrupar controles) y`FormControl` (para controles individuales), o`FormArray` (para colecciones de controles).
2. **Vinculación en la plantilla:** Se enlaza el modelo reactivo con los elementos del formulario en la plantilla HTML usando`[formGroup]` o`[formControlName]`.
3. **Observación de cambios:** Los formularios reactivos se basan en observables. Puedes suscribirte a los cambios de valor (`valueChanges`) o de estado (`statusChanges`) de cualquier control o grupo de controles para reaccionar a las interacciones del usuario.
4. **Formularios anidados:** Los formularios anidados tienen la capacidad de asociarse a un modelo de formBuilder anidado dentro de un formulario padre, funcionaria de la siguiente manera:

Ejemplo:

```typescript
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-contacto',
  template: `
    <form class="max-w-sm mx-auto max-h-screen my-10" [formGroup]="formGroup">

  <div class="flex flex-col gap-5 border-2 border-gray-300 rounded-lg p-5">
      <form [formGroup]="beneficiaryInfoFormGroup">
        <div class="mb-5">
          <label
            for="name"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >Nombre del beneficiario</label
          >
          <input
            formControlName="beneficiaryName"
            type="text"
            id="name"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="name@flowbite.com"
            required
          />
        </div>
        <div class="mb-5">
          <label
            for="number"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >Numero de cuenta</label
          >
          <input
            formControlName="beneficiaryAccountNumber"
            type="number"
            id="number"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          />
        </div>
      </form>
      <div class="mb-5">
        <label

          for="transferAmount"
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >Monto a transferir</label
        >
        <input
          formControlName="amount"
          type="number"
          id="transferAmount"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          required
        />
        <div class="flex items-start mb-5">
          <div class="flex items-center h-5">
            <input
              id="remember"
              type="checkbox"
              value=""
              class="w-4 h-4 border border-gray-300 rounded-sm bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
              required
            />
          </div>
          <label
            for="remember"
            class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >Remember me</label
          >
        </div>
    </div>

    <button
      (click)="onSubmit()"
      type="submit"
      class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
    >
      Submit
    </button>
  </div>

  <div class="flex flex-col gap-5 border-2 border-gray-300 rounded-lg p-5 mt-10">
    <h2>
      Datos del formulario
    </h2>

    <pre class="bg-gray-100 rounded-lg p-5 overflow-auto">
      <code>{{ formGroup.value | json }}</code>
    </pre>

  </div>

</form>
  `
})
export class ContactoComponent {
  formularioContacto = new FormGroup({
    nombre: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email])
  });

  constructor() {
    this.formularioContacto.get('nombre')?.valueChanges.subscribe(nombre => {
      console.log('El nombre ha cambiado a:', nombre);
    });
  }

  enviarFormulario() {
    if (this.formularioContacto.valid) {
      console.log('Formulario enviado:', this.formularioContacto.value);
    }
  }
}
```

## Formularios Reactivos

Los Formularios Reactivos en Angular son un enfoque de construcción de formularios que se basa en la reactividad y la inmutabilidad, utilizando Observables para gestionar los estados del formulario. Proporcionan una forma robusta y escalable de crear formularios complejos, ofreciendo mayor control y facilidad para realizar pruebas unitarias.

### Características clave:

- Inmutabilidad: El estado del formulario se actualiza en cada cambio, creando un nuevo estado en lugar de modificar el existente.
- Control programático: Permiten construir el modelo del formulario directamente en la clase del componente (usando FormGroup, FormControl, FormArray).
- Validación asíncrona y síncrona: Integración sencilla de validadores personalizados y asíncronos.
- Facilidad de prueba: Al estar desacoplados del DOM, son más fáciles de testear.

  ---

## Directivas

Las Directivas son clases en Angular que añaden comportamiento adicional a los elementos en el DOM o modifican su apariencia y estructura. Son una parte fundamental de Angular que permite la reutilización de código y la manipulación declarativa del DOM.

### Tipos de Directivas:

- Directivas de Componente (@**Component**): Son las directivas más comunes. Incluyen una plantilla y un selector, y definen una vista.
  Directivas de Atributo (@**Directive**): Modifican el comportamiento o la apariencia de un elemento del DOM al que se aplican. Ejemplos integrados: NgClass, NgStyle.
  Directivas Estructurales (@**Directive**): Añaden, eliminan o manipulan elementos en el DOM cambiando su estructura. Ejemplos integrados: NgIf, NgFor, NgSwitch.

### Directivas Personalizadas

Las Directivas Personalizadas son directivas de atributo o estructurales que creamos nosotros para encapsular lógica o comportamiento específico que queremos reutilizar en múltiples partes de nuestra aplicación. Permiten extender el HTML con nuevas funcionalidades.

1. Creación: Se definen como clases con el decorador @**Directive** y se les asigna un selector que se utilizará en el HTML.
2. Funcionalidad: Pueden interactuar con el elemento del host (donde se aplican) a través de ElementRef y Renderer2, escuchar eventos del DOM con @**HostListener**, y reaccionar a cambios en las propiedades de entrada con @**Input **y @**HostBinding**.
3. Uso: Una vez declaradas en un módulo, se pueden aplicar a cualquier elemento HTML utilizando su selector, al igual que las directivas integradas de Angular.


--- 

## Pipes

Son una característica que permite transformar y formatear datos directamente en las plantillas HTML de manera declarativa. Son ideales para tareas de presentación de datos, como formatear fechas, monedas, porcentajes o realizar operaciones de mayúsculas/minúsculas, sin necesidad de añadir lógica compleja en el componente.

### Pipes Personalizados 


Para crear y personalizar un Pipe en Angular, sigue estos pasos:


Para crear y personalizar un Pipe en Angular, sigue estos pasos:

1. Generar el Pipe
Usa Angular CLI:

```bash
  ng generate pipe nombre-del-pipe
```

2. Implementar PipeTransform
El archivo nombre-del-pipe.pipe.ts contendrá:

```typescript
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nombreDelPipe' // Nombre para usar en HTML
})
export class NombreDelPipe implements PipeTransform {
  transform(value: any, ...args: any[]): any {
    // Tu lógica de transformación aquí
    return value;
  }
}
```

3. Personalizar la Lógica
Modifica transform().

Ejemplo: Convertir a mayúsculas y añadir prefijo.

```typescript
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'mayusculasPrefijo' })
export class MayusculasPrefijoPipe implements PipeTransform {
  transform(value: string, prefijo: string = ''): string {
    return value ? prefijo + value.toUpperCase() : '';
  }
}
```

4. Usar en HTML

```HTML
<p>{{ 'hola' | mayusculasPrefijo }}</p>
<p>{{ 'mundo' | mayusculasPrefijo:'TEXTO: ' }}</p>
```

---
## Ciclos de Vida de Componentes

Los ciclos de vida de los componentes son un conjunto de hooks que se ejecutan en las diferentes etapas del ciclo de renderización de un componente. Estos ciclos en Angular son:

- ngOnChanges(): Se ejecuta cuando Angular detecta cambios en las propiedades de entrada (@Input) de un componente. Recibe un objeto SimpleChanges que contiene los valores actuales y previos de las propiedades que cambiaron.
  
- ngOnInit(): Se ejecuta una sola vez después de que Angular inicializa las propiedades de datos vinculadas por primera vez. Es ideal para la lógica de inicialización que no depende de los @Input del componente o cuando ya se han establecido.

- ngDoCheck(): Se ejecuta inmediatamente después de ngOnChanges() y ngOnInit() en la primera detección de cambios, y luego en cada ciclo de detección de cambios posterior. Se utiliza para implementar tu propia lógica de detección de cambios personalizada o para reaccionar a cambios que Angular no detecta por sí mismo (como cambios dentro de objetos o arrays).

- ngAfterContentInit(): Se ejecuta una sola vez después de que Angular ha inicializado el contenido proyectado (<ng-content>) en el componente. Es útil para interactuar con elementos que se insertan en el componente desde fuera.

- ngAfterContentChecked(): Se ejecuta después de ngAfterContentInit() y después de cada ngDoCheck(). Se utiliza para responder a cualquier cambio en el contenido proyectado que Angular ha comprobado.
  
- ngAfterViewInit(): Se ejecuta una sola vez después de que Angular ha inicializado las vistas del componente y las vistas de sus componentes hijos. Es el lugar ideal para interactuar con elementos del DOM del componente o de sus hijos, por ejemplo, para acceder a un ViewChild.

- ngAfterViewChecked(): Se ejecuta después de ngAfterViewInit() y después de cada ngAfterContentChecked(). Se utiliza para responder a cualquier cambio en las vistas del componente o de sus hijos que Angular ha comprobado.

- ngOnDestroy(): Se ejecuta justo antes de que Angular destruya el componente. Es el lugar para realizar la limpieza, como anular suscripciones (unsubscribe), detener temporizadores, o desvincular event listeners para evitar fugas de memoria.

---

## Servicios (Services)

Los Servicios en Angular son clases que encapsulan lógica de negocio, datos o funcionalidades que pueden ser compartidas entre diferentes componentes. Son un pilar fundamental para la reutilización de código y la separación de responsabilidades.

- Decorador: @Injectable() los marca como disponibles para el sistema de inyección de dependencias de Angular.
- Uso: Se inyectan en componentes u otros servicios usando el constructor.
- Propósito: Proporcionar una fuente única de verdad para datos o funcionalidades transversales, como la gestión de autenticación o el acceso a APIs.

--- 
## Observables

Los Observables son una técnica para manejar flujos asíncronos de datos en Angular, proporcionados por la librería RxJS. Son una alternativa poderosa a las Promesas para eventos que pueden ocurrir múltiples veces a lo largo del tiempo.

- Concepto: Representan una colección de valores futuros o eventos.
- Suscripción: Para consumir los datos emitidos por un Observable, debes suscribirte (.subscribe()) a él.
- Desuscripción: Es crucial desuscribirse cuando el componente se destruye (ngOnDestroy) para evitar fugas de memoria.
- Operadores RxJS: Ofrecen una rica colección de operadores (map, filter, debounceTime, switchMap, etc.) para transformar, combinar y manipular los flujos de datos.
---
## HttpClient

El HttpClient es el módulo integrado de Angular para realizar peticiones HTTP (GET, POST, PUT, DELETE, etc.) a servidores remotos. Facilita la comunicación con APIs RESTful.

- Módulo: Debes importarlo desde @angular/common/http en tu AppModule (o módulo relevante).
- Retorno: Todos sus métodos (.get(), .post(), etc.) retornan Observables.
- Manejo de Errores: Permite interceptar y manejar errores de red o del servidor.

--- 
## Interceptores (HTTP Interceptors)

Los Interceptores son una característica de Angular que permite interceptar y modificar las peticiones HTTP salientes y las respuestas HTTP entrantes. Son ideales para aplicar lógica global a todas (o un subconjunto de) las peticiones.

- Uso: Comunes para añadir encabezados de autorización (tokens), mostrar spinners de carga, registrar errores, o manejar autenticación/refresco de tokens.
- Implementación: Se crean como un servicio que implementa la interfaz HttpInterceptor y se registran en el providers de tu módulo usando HTTP_INTERCEPTORS.
- Cadena de Responsabilidad: Múltiples interceptores pueden formar una cadena, procesando la petición secuencialmente.
---
# Nuevas Funcionalidades de Angular


## Standalone Components

Los Standalone Components (Componentes Independientes) son componentes que no necesitan ser declarados en un NgModule. Pueden ser importados y utilizados directamente en otros componentes, directivas o pipes standalone, o en módulos tradicionales.

- Diferencia con Componentes Modulares:
  - Modular: Requiere declarar el componente en la propiedad declarations de un @NgModule. Las dependencias (imports) también se gestionan a nivel de módulo.
  - Standalone: El componente es autosuficiente. Las dependencias (imports, providers) se declaran directamente en el decorador @Component del propio componente.

- Ventajas: Reduce el boilerplate de los módulos, simplifica la estructura del proyecto, mejora el tree-shaking (tamaño del bundle) y facilita la creación de aplicaciones más ligeras y modulares.
---
## Control Flow Syntax (@if, @for, @switch)

La Control Flow Syntax es una nueva sintaxis de plantilla para manejar condicionales (@if), bucles (@for) y estructuras de switch (@switch) directamente en el HTML de Angular, reemplazando las directivas estructurales *ngIf, *ngFor, y *ngSwitch.

- Sintaxis Declarativa: Más legible y cercana a JavaScript/TypeScript.
- Rendimiento: Generalmente ofrece un mejor rendimiento y tree-shaking comparado con las directivas tradicionales.
- @if: Para renderizado condicional. Incluye @else y @else if.
- @for: Para iterar sobre colecciones. Incluye @empty (para colecciones vacías) y track (obligatorio para la optimización).
- @switch: Para múltiples condiciones. Incluye @case y @default.
- Compatibilidad: Coexiste con las directivas existentes, pero es la forma recomendada para nuevo código.
---
## Signals (Señales)

Las Signals son un nuevo modelo de reactividad en Angular para la detección de cambios granular. Son valores que notifican a los consumidores (componentes, pipes, etc.) cuando cambian, permitiendo a Angular actualizar solo las partes del DOM que necesitan ser actualizadas.

- Concepto: Un Signal envuelve un valor y te permite leerlo (.value) y escribirlo (.set(), .update(), .mutate()).
- Reactividad: Cuando una señal cambia, cualquier computed (valor derivado) o efecto (como la actualización del DOM) que la "lee" se actualizará automáticamente.
- Alternativa a RxJS (para estado): Son ideales para manejar el estado reactivo local del componente o global, complementando o, en algunos casos, reemplazando el uso de BehaviorSubject o ReplaySubject para el estado.
- Integración con Detección de Cambios: Fundamental para el futuro de las aplicaciones "zoneless".
- computed(): Para crear valores derivados que dependen de otras señales y se actualizan automáticamente.
- effect(): Para crear efectos secundarios (ej. actualizar el DOM, sincronizar con localStorage) que se ejecutan cuando las señales que leen cambian.
