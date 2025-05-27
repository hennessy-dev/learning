import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Comment } from './entities/comment.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/modules/users/entities/user.entity';
import { CategoriesService } from 'src/modules/categories/categories.service';

@Injectable()
export class CommentsService {

  constructor(
    @InjectRepository(Comment)
    private commentRepository: Repository<Comment>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private categoriesService: CategoriesService
  ) {}

  async create(createCommentDto: CreateCommentDto) {
    const { userId, comment, categoriesIds } = createCommentDto;

    const user: User | null = await this.userRepository.findOne({ where: { id: userId } });
    
    if(user == null) return new NotFoundException(`Error en la creacion del comentario, usuario no existente.`);
    
    const newComment: Comment = new Comment();
    newComment.comment = comment;
    newComment.user = user;
    
    if(categoriesIds){
      newComment.categories = await this.categoriesService.findByIds(categoriesIds) 
    }

    return await this.commentRepository.save(newComment);
  }

  async findAll() {
    return await this.commentRepository.find({});
  }

  async findOne(id: string) {
    return await this.commentRepository.findOne({ 
      where: { id },
      relations: ['categories']
    });
  }

  async update(id: string, updateCommentDto: UpdateCommentDto): Promise<Comment | NotFoundException> {

    const { comment, categoriesIds } = updateCommentDto; 

    const commentToUpdate = await this.commentRepository.findOne({where: { id }});

    if (!commentToUpdate) return new NotFoundException(`No se encontro el comentario con id: ${id} que se intenta actualizar.`);
    if (comment) commentToUpdate.comment = comment;
    if (categoriesIds) commentToUpdate.categories = await this.categoriesService.findByIds(categoriesIds);
       

    return await this.commentRepository.save(commentToUpdate);
  }

  async remove(id: string) {
    const commentToDelete = await this.commentRepository.findOne({ where: { id }});

    if (!commentToDelete) return new NotFoundException(`No se encontro el comentario con id: ${id} que se intenta eliminar.`);

    return await this.commentRepository.delete(id);
  }
}
