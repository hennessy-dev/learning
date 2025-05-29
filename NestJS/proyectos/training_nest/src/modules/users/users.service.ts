import { Injectable, NotFoundException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { CreateUserDTO } from './dto/create-user.dto';
import { v4 as uuidV4 } from 'uuid';
import {
  FakeStoreGetResponse,
  FakeStorePostResponse,
} from './interfaces/fake-store-api-response.interface';
import { firstValueFrom } from 'rxjs';
import { AxiosResponse } from 'axios';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { Profile } from './entities/profile.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { ExceptionHandler } from 'winston';
import { compare, hash } from 'bcryptjs';

@Injectable()
export class UsersService {
  private apiUrl = 'https://fakestoreapi.com';

  constructor(
    private readonly httpService: HttpService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>, //* el patron repository se agrega en el ctor de los servicios.
    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>, //* NestJS implementa patron repository, se agrega en los servicios.
  ) {}

  findAll() {
    return this.userRepository.find({});
  }

  async authByUsername(username: string, password: string) {
    const user = await this.userRepository.findOne({ 
    where: {username}, 
    select: ['id', 'username', 'password', 'email']
    });

    if(!user){
      throw new NotFoundException(`El usuario con el nombre de usuario: ${username} no se encontro.`)
    }

    const isAuth = await this.passwordCompare(password, user.password);

    if (!isAuth)
    {
      return new NotFoundException('Contraseña incorrecta');
    }

     return user;
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOne({
      where: { id },
      select: ['id', 'username', 'email', 'password'],
      relations: ['profile'],
    });

    if (!user) {
      throw new NotFoundException(`Usuario con id ${id} no encontrado`);
    }

    return user;
  }

  async passwordHash(password: string): Promise<string> {
    return hash(password, 10);
  }

  async passwordCompare (passwordPayload: string, passwordDatabase: string) {
    return await compare(passwordPayload, passwordDatabase);
  }

  async create(payload: CreateUserDTO): Promise<User | undefined | Error> {
    try {
      const newProfile = new Profile();
      newProfile.name = payload.name;
      newProfile.lastName = payload.lastName;
      newProfile.age = payload.age;

      const newUser = new User();
      newUser.email = payload.email;
      newUser.password = await this.passwordHash(payload.password);
      newUser.username = payload.username;
      newUser.profile = newProfile;

      // * NestJS Implementa el patrón repository para las transacciones
      // * con la base de datos, y a traves de los metodos del Repository<T> interactua con ella.
      const userCreated: User | undefined = await this.userRepository.save(newUser);

      return userCreated;
    } catch (error) {
      console.error(`Error en el servicio de creacion de usuario: ${error}`);
      return new Error(`Error en el servicio de creacion de usuario: ${error.message}`);
    }
  }

  async getById(id: number): Promise<FakeStoreGetResponse> {
    try {
      const response = await firstValueFrom(
        this.httpService.get<FakeStoreGetResponse>(`${this.apiUrl}/users/${id}`),
      );
      return response.data;
    } catch (error) {
      console.error('Error al llamar a la API externa:', error);
      throw new Error(`No se pudo obtener datos de la API externa: ${error}`);
    }
  }

  async getAll(): Promise<FakeStoreGetResponse[]> {
    try {
      const response = await firstValueFrom(
        this.httpService.get<FakeStoreGetResponse[]>(`${this.apiUrl}/users`),
      );
      return response.data;
    } catch (error) {
      console.error('Error al llamar a la API externa:', error);
      throw new Error(`No se pudo obtener datos de la API externa: ${error}`);
    }
  }

  // async create(user: CreateUserDTO): Promise<FakeStorePostResponse> {
  //   try {
  //     const response = await firstValueFrom(
  //       this.httpService.post<FakeStorePostResponse>(`${this.apiUrl}/users`, user)
  //     );
  //     console.log(response.data);
  //     return response.data;
  //   } catch (error) {
  //     console.error('Error al llamar a la API externa:', error);
  //     throw new Error(`No se pudo obtener datos de la API externa: ${error}`)
  //   }
  // }

  async update(user: CreateUserDTO, id: number): Promise<FakeStorePostResponse> {
    try {
      const response = await firstValueFrom(
        this.httpService.put<FakeStorePostResponse>(`${this.apiUrl}/users/${id}`, user),
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error('Error al llamar a la API externa:', error);
      throw new Error(`No se pudo obtener datos de la API externa: ${error}`);
    }
  }

  async delete(id: number) {
    const userToDelete = await this.userRepository.findOne({ 
      where: { id },
      relations: ['profile']
    });

    console.log(userToDelete);

    if (!userToDelete || userToDelete == null) {
      throw new NotFoundException(`Usuario con id ${id} no se encuentra y por eso no se puede eliminar.`);
    }
    
    await this.userRepository.delete(userToDelete.id);
    await this.profileRepository.delete(userToDelete.profile.id);

    return userToDelete;
  }

  async updatePartial(user: UpdateUserDto, id: number): Promise<User | Error> {
    try {
      const userToUpdate = await this.userRepository
        .findOne({
          where: { id },
        })
        .then((u) => {
          if (u == null || u == undefined) throw new NotFoundException(`No se encontro el usuario con el id: ${id}`);

          u.password = user.password;
          return this.userRepository.save(u);
        })
        .catch((error) => {
          console.error(error);
          throw new Error(`Error: ${error}`);
        });

      return userToUpdate;
    } catch (error) {
      console.error('Error al intentar actualizar la entidad :', error);
      throw new Error(`Error: ${error}`);
    }
  }
}
