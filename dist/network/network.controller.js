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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NetworkController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const network_service_1 = require("./network.service");
const create_network_dto_1 = require("./dto/create-network.dto");
const update_network_dto_1 = require("./dto/update-network.dto");
const network_response_dto_1 = require("./dto/network-response.dto");
let NetworkController = class NetworkController {
    networkService;
    constructor(networkService) {
        this.networkService = networkService;
    }
    async create(dto) {
        return this.networkService.create(dto);
    }
    async findAll() {
        return this.networkService.findAll();
    }
    async findOne(id) {
        return this.networkService.findOne(id);
    }
    async update(id, dto) {
        return this.networkService.update(id, dto);
    }
    async remove(id) {
        return this.networkService.remove(id);
    }
};
exports.NetworkController = NetworkController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create new network' }),
    (0, swagger_1.ApiResponse)({ type: network_response_dto_1.NetworkResponseDto }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_network_dto_1.CreateNetworkDto]),
    __metadata("design:returntype", Promise)
], NetworkController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all networks' }),
    (0, swagger_1.ApiResponse)({ type: [network_response_dto_1.NetworkResponseDto] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], NetworkController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get a single network' }),
    (0, swagger_1.ApiResponse)({ type: network_response_dto_1.NetworkResponseDto }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], NetworkController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update network' }),
    (0, swagger_1.ApiResponse)({ type: network_response_dto_1.NetworkResponseDto }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_network_dto_1.UpdateNetworkDto]),
    __metadata("design:returntype", Promise)
], NetworkController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete network' }),
    (0, swagger_1.ApiResponse)({ description: 'Network deleted successfully' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], NetworkController.prototype, "remove", null);
exports.NetworkController = NetworkController = __decorate([
    (0, swagger_1.ApiTags)('Networks'),
    (0, common_1.Controller)('networks'),
    __metadata("design:paramtypes", [network_service_1.NetworkService])
], NetworkController);
//# sourceMappingURL=network.controller.js.map