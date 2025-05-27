import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { Comment } from './entities/comment.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriesService } from 'src/modules/categories/categories.service';
import { UsersModule } from 'src/modules/users/users.module';
import { CategoriesModule } from 'src/modules/categories/categories.module';
import { User } from 'src/modules/users/entities/user.entity';
import { Category } from 'src/modules/categories/entities/category.entity';


@Module({
  imports: [
    TypeOrmModule.forFeature([Comment, User, Category]),
    UsersModule,
    CategoriesModule
  ],
  controllers: [CommentsController],
  providers: [CommentsService, CategoriesService],
})
export class CommentsModule {}
