import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { Category } from './entities/category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoryService {
    constructor(
        @InjectRepository(Category)
        private readonly categoryRepository: Repository<Category>
    ) { }

    create(createCategoryDto: CreateCategoryDto): Promise<Category> {
        const category = this.categoryRepository.create(createCategoryDto);
        return this.categoryRepository.save(category);
    }
    findAll(): Promise<Category[]> {
        return this.categoryRepository.find();
    }
    

    async findAllWithSearch(page: number = 1, limit: number = 10, search?: string) {
        const whereCondition = search
            ? { categoryName: ILike(`%${search}%`) } // Case-insensitive search on category name
            : {}; // If no search, return all categories

        const [categories, totalRecords] = await this.categoryRepository.findAndCount({
            where: whereCondition,
            skip: (page - 1) * limit,
            take: limit,
        });

        const totalPages = Math.ceil(totalRecords / limit);

        return {
            statusCode: 200,
            message: categories.length ? 'Categories retrieved successfully' : 'No categories found',
            data: categories,
            metadata: {
                totalRecords,
                itemsPerPage: limit,
                currentPage: page,
                nextPage: page < totalPages ? page + 1 : null,
                prevPage: page > 1 ? page - 1 : null,
                totalPages,
            },
        };
    }


    async findOne(id: string): Promise<Category> {
        const category = await this.categoryRepository.findOne({ where: { id } });
        if (!category) {
            throw new NotFoundException(`Category with ID ${id} not found`);
        }
        return category;
    }

    async update(id: string, updateCategoryDto: UpdateCategoryDto): Promise<Category> {
        await this.categoryRepository.update(id, updateCategoryDto);
        return this.findOne(id);
    }

    async remove(id: string): Promise<void> {
        const result = await this.categoryRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException(`Category with ID ${id} not found`);
        }
    }
}
