import { Injectable, NotFoundException } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { Repository } from 'typeorm';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  
  constructor(
    // @InjectRepository(User)
    private readonly jwtService: JwtService,
    private readonly userService: UsersService
  ) {}
  
  async login(payload: AuthDto) {
    const { username, password } = payload;
    const authResult = await this.userService.authByUsername(username, password);

    if(authResult instanceof NotFoundException){ 
      throw authResult;
    }
    
    const body = { id: authResult.id, username: authResult.username, email: authResult.email }

    return {
      access_token: await this.jwtService.sign(body)
    }
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
