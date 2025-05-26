import { Injectable, Delete } from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  private users = [
    {
      id: 1,
      name: 'John Doe',
      number: 9999,
    },
    {
      id: 1,
      name: 'John Doe',
      number: 9999,
    },
  ];

  getUsers() {
    return this.users; 
  }

  createUser(user: CreateUserDTO): {} {
    return {
      ...user,
      id: this.users.length 
    };
  }
}
