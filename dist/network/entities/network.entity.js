"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Network = void 0;
const typeorm_1 = require("typeorm");
const store_entity_1 = require("../../store/entities/store.entity");
const swagger_1 = require("@nestjs/swagger");
const category_entity_1 = require("../../category/entities/category.entity");
let Network = class Network {
    id;
    name;
    status;
    stores;
    createdAt;
    updatedAt;
    category;
    categoryId;
};
exports.Network = Network;
__decorate([
    (0, swagger_1.ApiProperty)({ example: '123e4567-e89b-12d3-a456-426614174000', description: 'Unique ID for the network' }),
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Network.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Retail Network', description: 'Name of the network' }),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Network.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'active', enum: ['active', 'inactive'], description: 'Status of the network' }),
    (0, typeorm_1.Column)({ type: 'enum', enum: ['active', 'inactive'], default: 'active' }),
    __metadata("design:type", String)
], Network.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => [store_entity_1.Store], description: 'Stores under this network' }),
    (0, typeorm_1.OneToMany)(() => store_entity_1.Store, (store) => store.networkEntity),
    __metadata("design:type", Array)
], Network.prototype, "stores", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Date when network was created', example: '2023-01-01T00:00:00Z' }),
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Network.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Date when network was last updated', example: '2023-01-02T00:00:00Z' }),
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Network.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => category_entity_1.Category, category => category.networks),
    (0, typeorm_1.JoinColumn)({ name: 'categoryId' }),
    __metadata("design:type", category_entity_1.Category)
], Network.prototype, "category", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Network.prototype, "categoryId", void 0);
exports.Network = Network = __decorate([
    (0, typeorm_1.Entity)()
], Network);
//# sourceMappingURL=network.entity.js.map