import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCodeDto } from './dto/create-code.dto';
import { UpdateCodeDto } from './dto/update-code.dto';
import { Code } from './entities/code.entity';
import { Store } from 'src/store/entities/store.entity';
import { Coupon } from 'src/coupon/entities/coupon.entity';
import { Product } from 'src/product/entities/product.entity';

@Injectable()
export class CodeService {
    constructor(
        @InjectRepository(Code)
        private readonly codeRepository: Repository<Code>,
      
        @InjectRepository(Store)
        private readonly storeRepository: Repository<Store>,

        @InjectRepository(Coupon)
        private readonly couponRepository: Repository<Coupon>,

        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>,
    ) {}

    async findByType(type: string): Promise<Code[]> {
      return this.codeRepository.find({
          where: { type },
          relations: ['coupon', 'store', 'product'],
      });
  }

  async create(createCodeDto: CreateCodeDto): Promise<Code> {
    const { code, description, type, storeId, couponId, productId } = createCodeDto;

    const codeEntity = new Code();
    codeEntity.code = code;
    codeEntity.description = description;
    codeEntity.type = type;

    if (storeId) {
        const store = await this.storeRepository.findOne({ where: { id: storeId } });
        if (!store) throw new NotFoundException("Store not found");
        codeEntity.store = store;
    }

    if (couponId) {
        const coupon = await this.couponRepository.findOne({ where: { id: couponId } });
        if (!coupon) throw new NotFoundException("Coupon not found");
        codeEntity.coupon = coupon;
    }

    if (productId) {
        const product = await this.productRepository.findOne({ where: { id: productId } });
        if (!product) throw new NotFoundException("Product not found");
        codeEntity.product = product;
    }

    return this.codeRepository.save(codeEntity);
}


    async findAll(): Promise<Code[]> {
      const codes = await this.codeRepository.find({ relations: ['coupon', 'store', 'product'] });
      console.log("Fetched Codes:", JSON.stringify(codes, null, 2));
      return codes;
    }

    async findOne(id: string): Promise<Code> {
        const code = await this.codeRepository.findOne({ where: { id }, relations: ['coupon', 'store', 'product'] });
        if (!code) throw new NotFoundException(`Code with ID ${id} not found`);
        return code;
    }

    async update(id: any, updateCodeDto: UpdateCodeDto): Promise<Code> {
        const code = await this.findOne(id);
        Object.assign(code, updateCodeDto);
        return await this.codeRepository.save(code);
    }

    async remove(id: string): Promise<void> { // ✅ Change id type to string
      const code = await this.findOne(id);
      await this.codeRepository.remove(code);
  }
}
