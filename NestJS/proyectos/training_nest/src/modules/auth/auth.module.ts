import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './secrets/jwt.secret';

@Module({
  imports: [
    UsersModule, 
    JwtModule.register({
      global: true, 
      secret: jwtConstants.SECRET,
      signOptions: { expiresIn: '60s' }
    })
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
