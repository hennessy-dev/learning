import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { In, NoNeedToReleaseEntityManagerError, Repository } from 'typeorm';

@Injectable()
export class CategoriesService {
  
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>
  ) {}
  
  async create(createCategoryDto: CreateCategoryDto) {
    const { name } = createCategoryDto;

    const newCategory = new Category();
    newCategory.name = name;

    return await this.categoryRepository.save(newCategory);
  }

  async findAll() {
    return await this.categoryRepository.find({});
  }

  findOne(id: number) {
    return `This action returns a #${id} category`;
  }

  async findByIds(ids: string[], requireAll: boolean = true): Promise<Category[]> {
    if (!ids || ids.length === 0) {
      if (requireAll) {
        throw new NotFoundException('Se requieren IDs para buscar entidades.');
      }

      return [];
    }

    const foundEntities = await this.categoryRepository.findBy({
      id: In(ids), // <<-- ¡Aquí está la clave! Usa el operador 'In'
    });

    if (requireAll && foundEntities.length !== ids.length) {
      // Opcional: Puedes identificar cuáles IDs específicos no se encontraron
      const foundIds = new Set(foundEntities.map(entity => entity.id));
      const missingIds = ids.filter(id => !foundIds.has(id));
      throw new NotFoundException(
        `No se encontraron todas las entidades. IDs faltantes: ${missingIds.join(', ')}`,
      );
    }

    return foundEntities;
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    const { name, commentsIds } = updateCategoryDto;
    const categoryToUpdate = await this.categoryRepository.findOne({ where: { id }});

    if (categoryToUpdate == null) return new NotFoundException(`la categoria con id: ${id} no existe. `); 

    if (name) categoryToUpdate.name = name;

    return await this.categoryRepository.save(categoryToUpdate);
  }

  async remove(id: string) {
    return await this.categoryRepository.delete(id);
  }
}
