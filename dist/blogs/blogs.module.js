"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const blogs_controller_1 = require("./blogs.controller");
const blogs_service_1 = require("./blogs.service");
const blog_entity_1 = require("./entities/blog.entity");
const category_entity_1 = require("../category/entities/category.entity");
const user_entity_1 = require("../user/entities/user.entity");
let BlogModule = class BlogModule {
};
exports.BlogModule = BlogModule;
exports.BlogModule = BlogModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([blog_entity_1.Blog, category_entity_1.Category, user_entity_1.User])],
        controllers: [blogs_controller_1.BlogController],
        providers: [blogs_service_1.BlogsService],
        exports: [blogs_service_1.BlogsService],
    })
], BlogModule);
//# sourceMappingURL=blogs.module.js.map