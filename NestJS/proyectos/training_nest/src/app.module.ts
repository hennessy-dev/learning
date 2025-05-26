import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { ProjectsModule } from './projects/projects.module';
import { UsersModule } from './users/users.module';
import { HelloController } from './hello/hello.controller';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [TasksModule, ProjectsModule, UsersModule, AuthModule],
  controllers: [HelloController, AuthController],
  providers: [],
})
export class AppModule {}
