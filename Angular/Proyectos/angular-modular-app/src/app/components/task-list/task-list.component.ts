import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-task-list',
  standalone: false,
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css'
})

export class TaskListComponent {

  tasks: string[] = [];
  loading: boolean = true;
  previousTaskCount: number = 0;
  newTask: string = '';

  @ViewChild('buttonRef') buttonRef?: ElementRef;

  constructor() { }

  ngOnInit() {
    console.log('ngOnInit: El componente task-list ha sido inicializado');
    setTimeout(() => {
      this.tasks = ['Task 1', 'Task 2', 'Task 3'];
      this.loading = false;
    }, 2000);
  }

  ngAfterViewInit(): void {
    console.log('ngAfterViewInit: La vista del componente se ha inicializado');
    this.buttonRef != null ? this.buttonRef.nativeElement.style.backgroundColor = 'blue' : '';
  }



  /**
   * Agrega una tarea al arreglo de tareas.
   *
   * @param {string} task
   * @returns {(string | void)}
   */
  addTask(task: string): string | void {
    task != null && task.length > 0 ? this.tasks.push(task) : alert('Tarea Vacia');
    this.newTask = '';
  }

}
