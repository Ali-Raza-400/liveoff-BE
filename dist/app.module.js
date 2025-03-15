"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const user_module_1 = require("./user/user.module");
const database_module_1 = require("./database/database.module");
const config_1 = require("@nestjs/config");
const store_module_1 = require("./store/store.module");
const product_module_1 = require("./product/product.module");
const coupon_module_1 = require("./coupon/coupon.module");
const network_module_1 = require("./network/network.module");
const category_module_1 = require("./category/category.module");
const blogs_module_1 = require("./blogs/blogs.module");
const events_module_1 = require("./events/events.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [user_module_1.UserModule, database_module_1.DatabaseModule, config_1.ConfigModule.forRoot({ isGlobal: true }), store_module_1.StoreModule, product_module_1.ProductModule, coupon_module_1.CouponModule, network_module_1.NetworkModule, category_module_1.CategoryModule, blogs_module_1.BlogModule, events_module_1.EventsModule,],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map