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
