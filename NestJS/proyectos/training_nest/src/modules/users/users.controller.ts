import { Body, Controller, Get, HttpStatus, Param, ParseIntPipe, Patch, Post, Put} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  getAll() {
    return this.usersService.findAll();
  }

  @Get('/:id')
  getUserById(@Param('id', ParseIntPipe) id: number ){
    try {
      console.log('User: ' + id)
      return this.usersService.findOne(id);
    } catch (error) {
      console.error(`Error: ${error}`)
    }
  }

  @Post()
  async create(@Body() payload: CreateUserDTO) {
    try {
      const newUser = await this.usersService.create(payload);

      if (newUser instanceof Error) {
        return {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: `No se pudo crear el usuario: ${newUser.stack}`
        };
      }

      return {
        status: HttpStatus.CREATED,
        newUser
      };
    } catch (error) {
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: error instanceof Error ? error.message : 'Error desconocido en el servidor'
      };
    }
  }

  @Put()
  update(@Body() payload: CreateUserDTO) {
    
    if(!payload.id){
      throw new TypeError("Falta el parametro id");
    }

    const newUser = this.usersService.update(payload, payload.id);

    return {
      status: HttpStatus.CREATED,
      newUser
    };
  }

  @Patch('/:id')
  async updatePartial(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateUserDto,
    ) {
    return await this.usersService.updatePartial(payload, id);
  }

  // @Delete()
  // delete(@Query('id', ParseUUIDPipe) id: number) {
    
  //   const deletedUser = this.usersService.delete(id);

  //   return {
  //     status: HttpStatus.NO_CONTENT,
  //     deletedUser
  //   };
  // }

}
