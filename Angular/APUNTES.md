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

## Pipes

Son una característica que permite transformar y formatear datos directamente en las plantillas HTML de manera declarativa. Son ideales para tareas de presentación de datos, como formatear fechas, monedas, porcentajes o realizar operaciones de mayúsculas/minúsculas, sin necesidad de añadir lógica compleja en el componente.
