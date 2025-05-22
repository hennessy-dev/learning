import { Component, Injectable, OnInit } from '@angular/core';
import { initFlowbite } from 'flowbite';
import { UserService } from './services/user.service';
import { DataService } from './services/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})

export class AppComponent {

  users: any[] = [];
  title = 'angular-modular-app';

  constructor(private userService: UserService, private dataService: DataService) {}

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getUsers().subscribe({
      next: users => {
        this.users = users;
        console.table(this.users);
      },
      error: error => {
        console.error('Error al listar los usuarios:' + error)
      }
    });
  }

  getPostById(id: number): void {
    this.dataService.getDataPostById(id).subscribe( post => {
      console.log(post);
    });
  }

  deleteUser(index: number) {
    this.users.splice(index, 1);
  }


}
